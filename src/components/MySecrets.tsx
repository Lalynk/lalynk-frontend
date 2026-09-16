import { useEffect, useState } from "react";
import {
  getSecrets,
  getSecretById,
  revokeSecret,
} from "../services/secretService";
import type { SecretDTO } from "../entities/SecretDTO";
import type { SecretSummaryDTO } from "../entities/SecretSummaryDTO";
import "./MySecrets.css";

function MySecrets() {
  const [secrets, setSecrets] = useState<SecretSummaryDTO[]>([]);
  const [expandedSecretId, setExpandedSecretId] = useState<string | null>(null);
  const [loadedSecret, setLoadedSecret] = useState<SecretDTO | null>(null);
  const [copiedSecretId, setCopiedSecretId] = useState<string | null>(null);

  useEffect(() => {
    getSecrets().then((data) => {
      setSecrets(data);
    });
  }, []);

  async function handleSecretClick(id: string) {
    if (expandedSecretId === id) {
      setExpandedSecretId(null);
      setLoadedSecret(null);
      return;
    }

    try {
      const secret = await getSecretById(id);

      setLoadedSecret(secret);
      setExpandedSecretId(id);
    } catch (error) {
      console.error("Could not fetch secret:", error);
    }
  }

  async function handleRevoke(id: string) {
    try {
      await revokeSecret(id);

      const data = await getSecrets();
      setSecrets(data);

      if (expandedSecretId === id) {
        setExpandedSecretId(null);
        setLoadedSecret(null);
      }
    } catch (error) {
      console.error("Could not revoke secret:", error);
    }
  }

  function getSecretStatus(secret: SecretSummaryDTO) {
    if (secret.revokedAt) {
      return "Revoked";
    }

    if (secret.consumedAt) {
      return "Consumed";
    }

    if (secret.expiresAt && new Date(secret.expiresAt) < new Date()) {
      return "Expired";
    }

    return "Active";
  }

  async function handleCopyLink(secret: SecretSummaryDTO) {
    const url = `${window.location.origin}/s/${secret.publicToken}`;

    await navigator.clipboard.writeText(url);

    setCopiedSecretId(secret.id);
  }

  return (
    <div className="my-secrets">
      <h2>My secrets</h2>

      {secrets.map((secret) => {
        const status = getSecretStatus(secret);
        const isExpanded = expandedSecretId === secret.id;

        return (
          <div className="secret-card" key={secret.id}>
            <div className="secret-header">
              <div
                className={`secret-expand-area ${
                  isExpanded ? "expanded" : ""
                }`}
                onClick={() => handleSecretClick(secret.id)}
              >
                <div className="secret-content-wrapper">
                  {isExpanded && loadedSecret && (
                    <div className="secret-content expanded">
                      {loadedSecret.content}
                    </div>
                  )}

                  <div className="expand-hint">
                    <span className="expand-icon">
                      {isExpanded ? "⌄" : "›"}
                    </span>

                    {isExpanded
                      ? "Click to collapse"
                      : "Click to view secret"}
                  </div>
                </div>
              </div>

              <div className={`secret-status ${status.toLowerCase()}`}>
                {status}
              </div>
            </div>

            <div className="secret-footer">
              <div className="secret-dates">
                <div className="secret-info">
                  Created: {new Date(secret.createdAt).toLocaleString()}
                </div>

                <div className="secret-info">
                  {secret.expiresAt
                    ? `Expires: ${new Date(secret.expiresAt).toLocaleString()}`
                    : "No expiration"}
                </div>
              </div>

              {status === "Active" && (
                <div className="secret-actions">
                  <button
                    className="copy-link-button"
                    onClick={() => handleCopyLink(secret)}
                  >
                    {copiedSecretId === secret.id ? "Copied!" : "Copy link"}
                  </button>

                  <button
                    className="revoke-button"
                    onClick={() => handleRevoke(secret.id)}
                  >
                    Revoke
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MySecrets;