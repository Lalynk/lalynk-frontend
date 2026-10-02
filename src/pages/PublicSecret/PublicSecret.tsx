import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import { getPublicSecret } from "../../services/secretService";
import { useParams } from "react-router-dom";
import "./PublicSecret.css";
import Navbar from "../../components/Navbar/Navbar";
import { FiEye } from "react-icons/fi";

function PublicSecret() {
  const { publicToken } = useParams();
  const [content, setContent] = useState("");
  const [copied, setCopied] = useState("Copy");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    async function handlePublicSecret() {
      try {
        if (publicToken != null) {
          const response = await getPublicSecret(publicToken);
          setContent(response.content);
          setIsActive(true);
        }
      } catch (error) {
        setContent(
          "Already consumed",
        );
        setIsActive(false);
      }
    }
    handlePublicSecret();
  }, []);

  return (
    <div className="pub-secret-page">
      <Navbar></Navbar>

      <main className="pub-secret">
        <div className="pub-secret-container">
          <h1>SECRET</h1>
          <section className="pub-secret-card">
            <div className="secret-card">
              <div className="pub-secret-icon">
                <FiEye></FiEye>
              </div>
              {isActive ? (
                <>
                  <div className="pub-secret-header">
                    <h2>SECRET</h2>
                  </div>
                  <div className="content">
                    <p>{content}</p>
                  </div>
                  <button
                    onClick={() => {
                      (navigator.clipboard.writeText(content),
                        setCopied("Copied"));
                    }}
                  >
                    {copied}
                  </button>
                </>
              ) : (
                <div className="secret-unavailable">
                  <h2>Secret unavailable</h2>
                  <p>This secret is no longer available.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer></Footer>
    </div>
  );
}

export default PublicSecret;
