import { useState } from "react";
import { createSecret } from "../services/secretService";
import "./CreateSecret.css";

function CreateSecret() {
    const [content, setContent] = useState("");
    const [expiresAt, setExpiresAt] = useState("");

    const [secretUrl, setSecretUrl] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleCreateSecret() {
        setError(null);
        setLoading(true);

        try {
            let expiration: string | null = null;

            if (expiresAt !== "") {
                expiration = new Date(expiresAt).toISOString();
            }

            const secret = await createSecret(content, expiration);

            const url = `${window.location.origin}/s/${secret.publicToken}`;

            setSecretUrl(url);
            setCopied(false);
        } catch (error) {
            console.error("Could not create secret:", error);
            setError("Could not create secret.");
        } finally {
            setLoading(false);
        }
    }

    function handleCreateAnother() {
        setContent("");
        setExpiresAt("");
        setSecretUrl(null);
        setCopied(false);
        setError(null);
    }

    return (
        <div className="create-secret">
            <h2>Create a secret</h2>

            <label>
                Secret
                <textarea
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    placeholder="Write your secret..."
                />
            </label>

            <label>
                Expires at
                <input
                    type="datetime-local"
                    value={expiresAt}
                    onChange={(event) => setExpiresAt(event.target.value)}
                />
            </label>

            <button
                className="create-button"
                onClick={handleCreateSecret}
                disabled={!content.trim() || loading}
            >
                {loading ? "Creating..." : "Create secret"}
            </button>

            {error && (
                <p className="create-error">
                    {error}
                </p>
            )}

            {secretUrl && (
                <div className="secret-link">
                    <p>Secret link:</p>

                    <input
                        value={secretUrl}
                        readOnly
                    />

                    <button
                        onClick={async () => {
                            await navigator.clipboard.writeText(secretUrl);
                            setCopied(true);
                        }}
                    >
                        {copied ? "Copied!" : "Copy link"}
                    </button>

                    <button
                        onClick={handleCreateAnother}
                    >
                        Create another secret
                    </button>
                </div>
            )}
        </div>
    );
}

export default CreateSecret;