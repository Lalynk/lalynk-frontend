import { Link } from "react-router-dom";
import CreateSecret from "../components/CreateSecret";
import MySecrets from "../components/MySecrets";
import { logout } from "../services/authService";
import "./Dashboard.css";
import Navbar from "../components/Navbar";
function Dashboard() {
  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="dashboard">
      <Navbar></Navbar>
      <main className="dashboard-content">
        <section className="dashboard-header">
          <p className="dashboard-label">Your workspace</p>

          <h1>Dashboard</h1>

          <p>Create and manage your secure one-time secrets.</p>
        </section>

        <CreateSecret />

        <MySecrets />
      </main>
    </div>
  );
}

export default Dashboard;
