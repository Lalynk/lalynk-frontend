import { useState } from "react";
import { createSecret } from "../services/secretService";
import "./CreateSecret.css";

function CreateSecret() {
  const [content, setContent] = useState("");
  const [expiration, setExpiration] = useState("7d");

  const [secretUrl, setSecretUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleCreateSecret() {
    setError(null);
    setLoading(true);

    try {
      const expirationMap: Record<string, number> = {
        "1h": 60 * 60 * 1000,
        "24h": 24 * 60 * 60 * 1000,
        "7d": 7 * 24 * 60 * 60 * 1000,
        "30d": 30 * 24 * 60 * 60 * 1000,
      };

      const expirationTime = expirationMap[expiration];

      const expiresAt = new Date(
        Date.now() + expirationTime
      ).toISOString();

      const secret = await createSecret(content, expiresAt);

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
    setExpiration("7d");
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
        Expiration
        <select
          value={expiration}
          onChange={(event) => setExpiration(event.target.value)}
        >
          <option value="1h">1 hour</option>
          <option value="24h">24 hours</option>
          <option value="7d">7 days</option>
          <option value="30d">30 days</option>
        </select>
      </label>

      <button
        className="create-button"
        onClick={handleCreateSecret}
        disabled={!content.trim() || loading}
      >
        {loading ? "Creating..." : "Create secret"}
      </button>

      {error && <p className="create-error">{error}</p>}

      {secretUrl && (
        <div className="secret-link">
          <p>Secret link:</p>

          <input value={secretUrl} readOnly />

          <button
            onClick={async () => {
              await navigator.clipboard.writeText(secretUrl);
              setCopied(true);
            }}
          >
            {copied ? "Copied!" : "Copy link"}
          </button>

          <button onClick={handleCreateAnother}>
            Create another secret
          </button>
        </div>
      )}
    </div>
  );
}

export default CreateSecret;