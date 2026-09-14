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
    <div className="dash-styling">
        <nav className="nav-styling">
            <Link to="/">Home</Link>
            <button onClick={handleLogout}>Logga ut</button>
        </nav>

        <h1>Dashboard</h1>
        <CreateSecret></CreateSecret>
        <MySecrets></MySecrets>
    </div>
    </>
}

export default Dashboard