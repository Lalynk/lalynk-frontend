import { useState } from "react";
import type { SecretSummaryDTO } from "../../entities/SecretSummaryDTO";
import { formatExpiresAt, FormatRelativeTime } from "../../utils/dateUtils";
import { getSecretStatus } from "../../utils/secretUtils";
import { getSecretById } from "../../services/secretService";
import { FiEye } from "react-icons/fi";

type HistoryItemProps = {
  secret: SecretSummaryDTO;
  onRevoked: (id: string) => void;
};

function HistoryItem({ secret, onRevoked }: HistoryItemProps) {
  const secretUrl = `${window.location.origin}/s/${secret.publicToken}`;
  const status = getSecretStatus(secret);
  const [copied, setCopied] = useState("Copy");
  const [viewSecret, setViewSecret] = useState<string | null>(null);
  const [isViewing, setIsViewing] = useState(false);

  async function handleView(id: string) {
    const secret = await getSecretById(id);
    setViewSecret(secret.content);
    setIsViewing(true);
  }

  return (
    <div className="history-item">
      <div className="history-item-info">
        <h3>Secret</h3>
        <div className="history-item-meta">
          <p>Created {FormatRelativeTime(secret?.createdAt)}</p>
          <p>{formatExpiresAt(secret?.expiresAt)}</p>
        </div>
      </div>

      <div className="history-item-right">
        <div className="history-status">{status}</div>

        <div className="history-actions">
          {status === "Active" && (
            <>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(secretUrl);
                  setCopied("Copied");
                }}
              >
                {copied}
              </button>
              <button onClick={() => onRevoked(secret.id)}>Revoke</button>
            </>
          )}
          <button onClick={() => handleView(secret.id)}>View</button>
        </div>
        {isViewing && (
          <div className="secret-modal-overlay">
            <div className="secret-modal">
              <div className="pub-secret-icon">
                <FiEye></FiEye>
              </div>
              <h2>SECRET</h2>
              <div>
                <div className="modal-content">{viewSecret}</div>
              </div>
              <button onClick={() => setIsViewing(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HistoryItem;
