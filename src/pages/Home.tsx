import { Link } from "react-router-dom";
import "./Home.css";
import { baseUrl } from "../config";
import { getCurrentUser } from "../services/authService";

function Home() {
  const user = getCurrentUser();
  const isAuthenticated = user?.authenticated ?? false;

  return (
    <div className="home">
      <nav className="home-nav">
        <Link className="logo" to="/">
          Lalynk
        </Link>

        <div className="nav-links">
          <Link to="/about">About</Link>

          {isAuthenticated ? (
            <Link className="nav-dashboard" to="/dashboard">
              Dashboard
            </Link>
          ) : (
            <button
              className="nav-login"
              onClick={() => {
                window.location.href = `${baseUrl}/auth/login`;
              }}
            >
              Log in
            </button>
          )}
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="security-label">
            <span className="status-dot"></span>
            Secure one-time sharing
          </div>

          <h1>
            Share sensitive information.
            <span> With confidence.</span>
          </h1>

          <p className="hero-description">
            Create a secret, share the link, and let Lalynk handle the rest.
            Secrets are available only once and can optionally expire
            automatically.
          </p>

          {!isAuthenticated && (
            <div className="hero-actions">
              <button
                className="primary-button"
                onClick={() => {
                  window.location.href = `${baseUrl}/auth/login`;
                }}
              >
                Get started
              </button>
            </div>
          )}
        </section>

        <section className="features">
          <div className="feature-card">
            <div className="feature-icon">01</div>

            <h2>One-time access</h2>

            <p>
              A secret can only be opened once. After it has been viewed, it is
              no longer available.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">02</div>

            <h2>No account required</h2>

            <p>
              Recipients can open a secret directly from the link without
              creating a Lalynk account.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">03</div>

            <h2>Automatic expiration</h2>

            <p>
              Set an expiration time and let Lalynk invalidate the secret
              automatically.
            </p>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <span>© 2026 Lalynk</span>

        <Link to="/about">About</Link>
      </footer>
    </div>
  );
}

export default Home;
