
import { Link } from "react-router-dom"
import "./Home.css"
import { useEffect, useState } from "react"
import { getUser } from "../services/authService";

function Home() {

    const [isAuthenticated, setAuthenticated] = useState(false);


    useEffect(() => {getUser().then(user => 
        setAuthenticated(user.authenticated))}, [])

    return <>
        <div className="main-styling">
        
        <h2>Welcome to Lalynk</h2>
        <p>A safer way to share secrets.</p>
        
        {isAuthenticated && (
        <>
            <Link to="/dashboard">Till dashboard</Link>
            <button onClick={()=>setAuthenticated(false)}>logga ut</button>
        </>
        )}

        {!isAuthenticated &&
        <>
            <button onClick={() => {window.location.href = "http://localhost:8080/auth/login"}}>Logga in</button>
        </>
        }
    </div>
    </>
        
}

export default Home