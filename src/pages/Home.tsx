
import { Link } from "react-router-dom"
import "./Home.css"
import { useEffect, useState } from "react"
import { getUser } from "../services/authService";
import About from "../components/About";

function Home() {

    const [isAuthenticated, setAuthenticated] = useState(false);
    const [email, setEmail] = useState("");
    


    useEffect(() => {getUser().then(user => {
        setAuthenticated(user.authenticated);
        setEmail(user.email);
    }
    );
    
    }, [])

    return <>
        <div className="main-styling">
        
        <h2>Welcome to Lalynk</h2>
        <p>A safer way to share secrets.</p>
        
        {isAuthenticated && (
        <>
            <Link to="/dashboard">Till dashboard</Link>
            <button>logga ut</button>
            <div>Hello {email}</div>
        </>
        )}

        {!isAuthenticated &&
        <>
            <button onClick={() => {window.location.href = "http://localhost:8080/auth/login"}}>Logga in</button>
        </>
        }
        <About></About>
    </div>
    </>
        
}

export default Home