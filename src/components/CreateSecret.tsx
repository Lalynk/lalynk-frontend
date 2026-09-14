import { useState } from "react"
import { createSecret } from "../services/secretService";

function CreateSecret() {

    const [content, setContent] = useState("");

    const [secretUrl, setSecretUrl] = useState<string|null>(null);


    async function handleCreateSecret() {
        try {
            const secret = await createSecret(content);

            const url = `${window.location.origin}/s/${secret.publicToken}`;
            setSecretUrl(url);
        } catch(error) {
            console.error("Could not create secret: ", error);
        }

    }


    return (
    <>
        <div>Skapa en secret</div>
    
        <input value={content} onChange={(event) => setContent(event.target.value)}></input>
        <button onClick={() => handleCreateSecret()}>Create secret</button>

        {secretUrl && (
                <div>
                    <p>Secret link:</p>

                    <input
                        value={secretUrl}
                        readOnly
                    />

                    <button
                        onClick={() => navigator.clipboard.writeText(secretUrl)}
                    >
                        Copy link
                    </button>
                </div>
            )}




    </>)
}
export default CreateSecret