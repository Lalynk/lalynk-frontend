import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      <Navbar></Navbar>
      <main className="home">
        <div className="home-container">
          <div className="hero">
            <h1>Welcome to lalynk</h1>
            <p>Share your secrets.</p>
            <div className="slogan">
              <p>Fast.</p>
              <p>Securely.</p>
            </div>
            <div className="hero-description">
              <p>
                Create a one-time link for your secret. Share it with anyone -
                no account required to open the link.
              </p>
            </div>
            <button>Create a secret</button>
          </div>
        </div>
      </main>

      <Footer></Footer>
    </div>
  );
}

export default Home;
