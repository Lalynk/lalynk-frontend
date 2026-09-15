import { useEffect, useState } from "react"
import { getSecrets, revokeSecret } from "../services/secretService";
import type { SecretDTO } from "../entities/SecretDTO";
import "./MySecrets.css"

function MySecrets() {
    const [secrets, setSecrets] = useState<SecretDTO[]>([]);
    useEffect(() => {
        getSecrets().then(data => {
            setSecrets(data);
        });
    }, []);


    async function handleRevoke(id: string) {

        try {
            const response = await revokeSecret(id);
            const data = await getSecrets();
            setSecrets(data);


        } catch (error) {
            console.error("Could not revoke secret:", error);
        }
        


    }

    function getSecretStatus(secret: SecretDTO) {
    if (secret.revokedAt) {
        return "Revoked";
    }

    if (secret.consumedAt) {
        return "Consumed";
    }

    if (secret.expiresAt && new Date(secret.expiresAt) < new Date()) {
        return "Expired";
    }

    return "Active";
}



    return (
        <div className="my-secrets">
            <h2>My secrets</h2>

            {secrets.map((secret) => (
                
                
                
                <div className="secret-card" key={secret.id}>
                    
                    
                    
                    <div className="secret-content">
                        {secret.content}
                    </div>

                    <div className="secret-info">
                        {secret.expiresAt
                            ? `Expires: ${new Date(secret.expiresAt).toLocaleString()}`
                            : "No expiration"
                        }
                    </div>

                    <div className="secret-status">
                        {getSecretStatus(secret)}
                    </div>


                    {secret.revokedAt ? (
                        <div className="secret-revoked">
                            Revoked
                        </div>

                    ) : (
                        <button
                            className="revoked-button"
                            onClick={()=> handleRevoke(secret.id)}
                        >
                            Revoke
                        </button>

                    )}
                    </div>
            ))}
        </div>
    );
}

export default MySecrets;