import { useEffect, useState } from "react";
import "./History.css";
import HistoryItem from "./HistoryItem";
import { getSecrets, revokeSecret } from "../../services/secretService";
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

  async function handleRevoke(id: string) {
    const secretSummaryDTO = await revokeSecret(id);

    const updatedSecrets = secrets.map((secret) => {
      if (secret.id === id) {
        return secretSummaryDTO;
      }

      return secret;
    });

    setSecrets(updatedSecrets);
  }

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
            onRevoked={handleRevoke}
          ></HistoryItem>
        ))}
      </div>
    </section>
  );
}

export default History;
