import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./About.css";
import { FiClock, FiLink, FiShield, FiZap } from "react-icons/fi";

function About() {
  return (
    <div className="about-page">
      <Navbar></Navbar>

      <main className="about">
        <div className="about-container">
          <section className="about-hero">
            <div className="about-header-section">
              <h1>ABOUT</h1>
            </div>
            <div className="about-description">
              <h2>Simple, temporary secret sharing.</h2>
              <p>
                • Temporary, one-time links for sharing sensitive information.
              </p>
              <p>
                • Create a secret and share the generated link with the
                recipient.
              </p>
              <p>
                • No account is required to access a secret. Simply open the
                link to view it.
              </p>

              <p>
                • Secrets expire automatically or can be revoked by the creator
                at any time.
              </p>
            </div>
          </section>

          <section className="about-section">
            <div className="why-container">
              <h2>WHY LALYNK?</h2>
              <div className="why-grid">
                <div className="about-card">
                  <div className="why-icon">
                    <FiZap></FiZap>
                  </div>
                  <div className="about-card-description">
                    <h3>Simple</h3>
                    <p>Create and share a secret in a few clicks.</p>
                  </div>
                </div>
                <div className="about-card">
                  <div className="why-icon">
                    <FiClock></FiClock>
                  </div>
                  <div className="about-card-description">
                    <h3>Temporary</h3>
                    <p>Secrets automatically expire.</p>
                  </div>
                </div>
                <div className="about-card">
                  <div className="why-icon">
                    <FiLink></FiLink>
                  </div>
                  <div className="about-card-description">
                    <h3>No account required</h3>
                    <p>Recipients can simply open the link.</p>
                  </div>
                </div>
                <div className="about-card">
                  <div className="why-icon">
                    <FiShield></FiShield>
                  </div>
                  <div className="about-card-description">
                    <h3>Control</h3>
                    <p>Creators can revoke active secrets at any time.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer></Footer>
    </div>
  );
}

export default About;
