import "./Dashboard.css";
import Navbar from "../../components/Navbar/Navbar";
import { getCurrentUser } from "../../services/authService";
import SecretHistory from "../../components/History/History";
import CreateSecret from "../../components/CreateSecret/CreateSecret";
import Footer from "../../components/Footer/Footer";

function Dashboard() {
  const user = getCurrentUser();
  const email = user?.email ?? "";

  return (
    <div className="dashboard-page">
      <Navbar></Navbar>
      <main className="dashboard">
        <div className="dashboard-container">
          <h1>Welcome back, {email}</h1>
          <div className="dashboard-content">
            <CreateSecret></CreateSecret>
            <SecretHistory></SecretHistory>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default Dashboard;
