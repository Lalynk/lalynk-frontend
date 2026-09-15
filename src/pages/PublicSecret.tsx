import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPublicSecret } from "../services/secretService";
import "./PublicSecret.css";

function PublicSecret() {
    const { publicToken } = useParams();

    const [content, setContent] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        async function fetchSecret() {
            if (!publicToken) {
                setError("No secret token provided.");
                return;
            }

            try {
                const secret = await getPublicSecret(publicToken);
                setContent(secret.content);
            } catch (error) {
                setError("This secret is no longer available.");
            }
        }

        fetchSecret();
    }, [publicToken]);

    if (error) {
        return (
            <div className="public-secret">
                <main className="public-secret-card">
                    <div className="secret-label">Lalynk</div>

                    <h1>Secret unavailable</h1>

                    <p className="error-message">
                        {error}
                    </p>
                </main>
            </div>
        );
    }

    if (content === null) {
        return (
            <div className="public-secret">
                <main className="public-secret-card">
                    <div className="secret-label">Lalynk</div>
                    <p className="loading-message">Loading secret...</p>
                </main>
            </div>
        );
    }

    return (
        <div className="public-secret">
            <main className="public-secret-card">
                <div className="secret-label">
                    <span className="status-dot"></span>
                    Secure secret
                </div>

                <h1>Your secret</h1>

                <div className="secret-box">
                    <p>{content}</p>
                </div>

                <button
                    className="copy-button"
                    onClick={async () => {
                        try {
                            await navigator.clipboard.writeText(content);
                            setCopied(true);
                        } catch (error) {
                            console.error("Could not copy secret:", error);
                        }
                    }}
                >
                    {copied ? "Copied!" : "Copy secret"}
                </button>

                <p className="warning">
                    This secret can only be viewed once.
                </p>
            </main>
        </div>
    );
}

export default PublicSecret;