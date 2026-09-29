import "./Dashboard.css";
import Navbar from "../../components/Navbar/Navbar";
import { getCurrentUser } from "../../services/authService";
import SecretHistory from "../../components/History/History";
import CreateSecret from "../../components/CreateSecret/CreateSecret";
import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";
import type { SecretSummaryDTO } from "../../entities/SecretSummaryDTO";
import { getSecrets, revokeSecret } from "../../services/secretService";

function Dashboard() {
  const user = getCurrentUser();
  const email = user?.email ?? "";
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

  function handleCreated(createdSummary: SecretSummaryDTO) {
    setSecrets([createdSummary, ...secrets]);
  }

  return (
    <div className="dashboard-page">
      <Navbar></Navbar>
      <main className="dashboard">
        <div className="dashboard-container">
          <h1>Welcome back, {email}.</h1>
          <div className="dashboard-content">
            <CreateSecret
              onCreated={(createdSummary) => handleCreated(createdSummary)}
            ></CreateSecret>
            <SecretHistory
              secrets={secrets}
              onRevoked={(id) => handleRevoke(id)}
            ></SecretHistory>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default Dashboard;
