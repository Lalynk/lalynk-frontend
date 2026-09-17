import { Link } from "react-router-dom";
import CreateSecret from "../components/CreateSecret";
import MySecrets from "../components/MySecrets";
import { logout } from "../services/authService";
import "./Dashboard.css";

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
      <nav className="dashboard-nav">
        <Link className="dashboard-logo" to="/">
          Lalynk
        </Link>

        <div className="dashboard-nav-links">
          <button onClick={handleLogout}>Log out</button>
        </div>
      </nav>

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
