import { Link } from "react-router-dom"
import CreateSecret from "../components/CreateSecret"
import "./Dashboard.css"
import MySecrets from "../components/MySecrets"
import { logout } from "../services/authService"
function Dashboard() {



const handleLogout = async () => {
    try {
        await logout();
        window.location.href = "/";
    } catch (error) {
        console.error("Logout failed:", error);
    }
};


    return<>
    <div className="dashboard">
        <nav className="dashboard-nav">
            <Link to="/">Home</Link>
            <button onClick={handleLogout}>Logga ut</button>
        </nav>

        <main className="dashboard-content">
            <h1>Dashboard</h1>
            <CreateSecret></CreateSecret>
            <MySecrets></MySecrets>

        </main>
    </div>
    </>
}

export default Dashboard