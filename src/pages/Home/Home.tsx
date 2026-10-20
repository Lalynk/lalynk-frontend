import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { baseUrl, frontendUrl } from "../../config";
import { getCurrentUser } from "../../services/authService";
import "./Home.css";

function Home() {
  const user = getCurrentUser();
  const isAuthenticated = user?.authenticated ?? false;

  return (
    <div className="home-page">
      <Navbar></Navbar>
      <main className="home">
        <div className="home-container">
          <section>
            <h1>PRIVATE SHARING</h1>
            <div className="hero">
              <h2>Welcome to Lalynk</h2>
              <p>Share your secrets.</p>
              <div className="slogan">
                <p>Fast.</p>
                <p>Securely.</p>
              </div>
              <div className="hero-description">
                <p>Create a secret. Share the link. It's that simple.</p>
              </div>

              {isAuthenticated ? (
                <button
                  onClick={() => {
                    window.location.href = `${frontendUrl}/dashboard`;
                  }}
                >
                  Create a secret
                </button>
              ) : (
                <button
                  onClick={() => {
                    window.location.href = `${baseUrl}/auth/login`;
                  }}
                >
                  Create a secret
                </button>
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer></Footer>
    </div>
  );
}

export default Home;
