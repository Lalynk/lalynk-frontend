import { Link } from "react-router-dom";
import "./About.css";

function About() {
  return (
    <div className="about-page">
      <nav className="about-nav">
        <Link className="about-logo" to="/">
          Lalynk
        </Link>
      </nav>

      <main className="about-content">
        <section className="about-intro">
          <p className="about-label">About Lalynk</p>

          <h1>
            Simple sharing.
            <span> Temporary access.</span>
          </h1>

          <p className="about-lead">
            Lalynk is a simple way to share sensitive information through
            secure, one-time links.
          </p>
        </section>

        <section className="about-section">
          <div className="section-number">01</div>

          <div>
            <h2>How it works</h2>

            <p>
              Create a secret and Lalynk generates a unique link for it. Share
              the link with the recipient, who can open the secret without
              creating an account.
            </p>

            <p>Once the secret has been viewed, it can no longer be opened.</p>
          </div>
        </section>

        <section className="about-section">
          <div className="section-number">02</div>

          <div>
            <h2>Security</h2>

            <p>
              Lalynk uses randomly generated links to protect access to secrets.
              The links contain enough randomness to make guessing a secret
              impractical.
            </p>

            <div className="security-card">
              <div className="security-card-header">
                <span className="security-status"></span>

                <strong>Normal mode</strong>
              </div>

              <p>
                Secrets are protected by a unique, randomly generated link and
                can only be viewed once.
              </p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="section-number">03</div>

          <div>
            <h2>Ultra Safe mode</h2>

            <p>
              Ultra Safe mode is planned as a future security option for
              situations where additional protection is required.
            </p>

            <div className="planned-badge">Coming later</div>
          </div>
        </section>

        <section className="about-cta">
          <p>Ready to share something securely?</p>

          <Link to="/" className="about-button">
            Get started
          </Link>
        </section>
      </main>

      <footer className="about-footer">
        <span>© 2026 Lalynk</span>
      </footer>
    </div>
  );
}

export default About;
