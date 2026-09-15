
import { Link } from "react-router-dom"
import "./Home.css"
import { useEffect, useState } from "react"
import { getUser } from "../services/authService";
import About from "./About";

function Home() {

    const [isAuthenticated, setAuthenticated] = useState(false);
    const [email, setEmail] = useState("");
    


    useEffect(() => {getUser().then(user => {
        setAuthenticated(user.authenticated);
        setEmail(user.email);
    }
    );
    
    }, [])

    return (
        <div className="home">
        <main className="hero">
            <h1>Welcome to Lalynk</h1>

            <p className="subtitle">A safer way to share secrets.

            </p>
        
        {isAuthenticated && (
        <div className= "logged-in">
            <p>Hello {email}</p>

            <Link className="primary-button "to="/dashboard">Go to dashboard</Link>
            <Link className="primary-button "to="/about">About</Link>
            <button className="secondary-button">logga ut</button>

            
     </div>
        )}

        {!isAuthenticated &&
            <button className="primary-button" onClick={() => {window.location.href = "http://localhost:8080/auth/login"}}>Logga in</button>
        }
        </main>
    </div>
   )
        
}

export default Home