import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { baseUrl } from "../../config";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      <Navbar></Navbar>
      <main className="home">
        <div className="home-container">
          <section>
            <h1>PRIVATE SHARING</h1>
            <div className="hero">
              <h2>Welcome to lalynk</h2>
              <p>Share your secrets.</p>
              <div className="slogan">
                <p>Fast.</p>
                <p>Securely.</p>
              </div>
              <div className="hero-description">
                <p>Create a one-time link for your secret.</p>
                <p>
                  Share it with anyone - no account required to open the link.
                </p>
              </div>
              <button
                onClick={() => {
                  window.location.href = `${baseUrl}/auth/login`;
                }}
              >
                Create a secret
              </button>
            </div>
          </section>
        </div>
      </main>

      <Footer></Footer>
    </div>
  );
}

export default Home;
