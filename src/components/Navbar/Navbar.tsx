import { Link } from "react-router-dom";

import { baseUrl } from "../../config";
import "./Navbar.css";
import { getCurrentUser, logout } from "../../services/authService";

function Navbar() {
  const user = getCurrentUser();
  const isAuthenticated = user?.authenticated ?? false;

  async function handleLogout() {
    await logout();
    window.location.href = "/";
  }

  return (
    <nav className="navbar">
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
      </div>
    </nav>
  );
}

export default Navbar;
