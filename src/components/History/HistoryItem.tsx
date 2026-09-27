import type { SecretSummaryDTO } from "../../entities/SecretSummaryDTO";
import { formatExpiresAt, FormatRelativeTime } from "../../utils/dateUtils";

type HistoryItemProps = {
  secret: SecretSummaryDTO;
};

function HistoryItem({ secret }: HistoryItemProps) {
  return (
    <div className="history-item">
      <div className="history-item-info">
        <h3>{secret?.id}</h3>
        <p>Created {FormatRelativeTime(secret?.createdAt)}</p>
        <p>{formatExpiresAt(secret?.expiresAt)}</p>
      </div>
      <div className="history-status">Active</div>
    </div>
  );
}

export default HistoryItem;
