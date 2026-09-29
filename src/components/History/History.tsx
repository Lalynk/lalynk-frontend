import "./History.css";
import HistoryItem from "./HistoryItem";
import type { SecretSummaryDTO } from "../../entities/SecretSummaryDTO";

type NewSecretProps = {
  secrets: SecretSummaryDTO[];
  onRevoked: (id: string) => void;
};

function History({ secrets, onRevoked }: NewSecretProps) {
  return (
    <section className="history">
      <div className="history-header">
        <h2>History</h2>
      </div>

      <div className="history-list">
        {secrets.map((secret) => (
          <HistoryItem
            key={secret.id}
            secret={secret}
            onRevoked={(id) => onRevoked(id)}
          ></HistoryItem>
        ))}
      </div>
    </section>
  );
}

export default History;
