import { useAuth0 } from "@auth0/auth0-react"
import { Link } from "react-router-dom"


function Home() {

    const {isAuthenticated, user, logout} = useAuth0()

    return<>
    <h1>Lalynk</h1>
    {isAuthenticated && (
    <>
        <p>{user?.email}</p>
        <button onClick={() => logout()}>Log out</button> 
    </>
    )}

    {!isAuthenticated && (
        <Link to="/login">Login</Link>
    )}
    </>
}

export default Home