import { useState } from "react"
import { createSecret } from "../services/secretService";
import "./CreateSecret.css"

function CreateSecret() {

    const [content, setContent] = useState("");
    const [expiresAt, setExpiresAt] = useState("");

    const [secretUrl, setSecretUrl] = useState<string|null>(null);
    const [copied, setCopied] = useState(false);


    async function handleCreateSecret() {
        try {
            let expiration: string | null = null;

            if(expiresAt !== "") {
                expiration = new Date(expiresAt).toISOString();
            }

            const secret = await createSecret(content, expiration);

            const url = `${window.location.origin}/s/${secret.publicToken}`;
            setSecretUrl(url);
            setCopied(false);
        } catch(error) {
            console.error("Could not create secret: ", error);
        }

    }

    return (
    <div className="create-secret">
        <h2>Create a secret</h2>
    
        <label>
        Secret
        <textarea
            value= {content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Write your secret..."
        ></textarea>

        </label>

        <label>
            Expires at
            <input
                type= "datetime-local"
                value= {expiresAt}
                onChange={(event) => setExpiresAt(event.target.value)}
            ></input>

        </label>
    
        <button 
            className="create-button"
            onClick={() => handleCreateSecret()}>Create secret
        </button>

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
                </div>
            )}
    </div>
)
}
export default CreateSecret