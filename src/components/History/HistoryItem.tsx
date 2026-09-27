import type { SecretSummaryDTO } from "../../entities/SecretSummaryDTO";

type HistoryItemProps = {
  secret: SecretSummaryDTO;
};

function HistoryItem({ secret }: HistoryItemProps) {
  return (
    <div className="history-item">
      <div className="history-item-info">
        <h3>{secret?.id}</h3>
        <p>Created 2 hours ago</p>
        <p>Expires in 5 days</p>
      </div>
      <div className="history-status">Active</div>
    </div>
  );
}

export default HistoryItem;
