import { Link } from "react-router-dom";
import { getCurrentUser, logout } from "../services/authService";
import { baseUrl } from "../config";

function Navbar() {
  const user = getCurrentUser();
  const isAuthenticated = user?.authenticated ?? false;

  async function handleLogout() {
    await logout();
    window.location.href = "/";
  }

  return (
    <nav>
      <div className="nav-container">
        {isAuthenticated ? (
          <Link to="/dashboard" className="logo">
            Lalynk
          </Link>
        ) : (
          <Link to="/" className="logo">
            Lalynk
          </Link>
        )}
      </div>
      <div className="nav-links">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={handleLogout}>Log out</button>
          </>
        ) : (
          <>
            <Link to="/About">About</Link>
            <button
              onClick={() => {
                window.location.href = `${baseUrl}/auth/login`;
              }}
            >
              Log in
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
