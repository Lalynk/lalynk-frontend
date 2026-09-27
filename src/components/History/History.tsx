import { useEffect, useState } from "react";
import "./History.css";
import HistoryItem from "./HistoryItem";
import { getSecrets } from "../../services/secretService";
import type { SecretSummaryDTO } from "../../entities/SecretSummaryDTO";

function History() {
  const [secrets, setSecrets] = useState<SecretSummaryDTO[]>([]);

  useEffect(() => {
    async function loadSecrets() {
      const data = await getSecrets();
      setSecrets(data);
    }

    loadSecrets();
  }, []);

  return (
    <section className="history">
      <div className="history-header">
        <h2>History</h2>
      </div>

      <div className="history-list">
        {secrets.map((secret) => (
          <HistoryItem key={secret.id} secret={secret}></HistoryItem>
        ))}
      </div>
    </section>
  );
}

export default History;
