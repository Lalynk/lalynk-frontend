import { Link } from "react-router-dom"
import CreateSecret from "../components/CreateSecret"
import "./Dashboard.css"
function Dashboard() {

    return<>
    <div className="dash-styling">
        <nav className="nav-styling">
            <Link to="/">Home</Link>
            <button onClick={()=> window.location.href = "http://localhost:8080/logout"}>Logga ut</button>
        </nav>

        <h1>Dashboard</h1>
        <CreateSecret></CreateSecret>
    </div>
    </>
}

export default Dashboard