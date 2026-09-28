import { useState } from "react";
import type { SecretSummaryDTO } from "../../entities/SecretSummaryDTO";
import { formatExpiresAt, FormatRelativeTime } from "../../utils/dateUtils";
import { getSecretStatus } from "../../utils/secretUtils";

type HistoryItemProps = {
  secret: SecretSummaryDTO;
  onRevoked: (id: string) => void;
};

function HistoryItem({ secret, onRevoked }: HistoryItemProps) {
  const secretUrl = `${window.location.origin}/s/${secret.publicToken}`;
  const status = getSecretStatus(secret);

  const [copied, setCopied] = useState("Copy");

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
            <button
              onClick={() => {
                navigator.clipboard.writeText(secretUrl);
                setCopied("Copied");
              }}
            >
              {copied}
            </button>
          )}

          {status === "Active" && (
            <button onClick={() => onRevoked(secret.id)}>Revoke</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default HistoryItem;
