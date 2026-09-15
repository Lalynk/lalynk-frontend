import { useEffect, useState } from "react"
import { getSecrets, revokeSecret } from "../services/secretService";
import type { SecretDTO } from "../entities/SecretDTO";

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



    return (
        <div>
            <h2>My secrets</h2>
            {secrets.map((secret) => (
                <div key={secret.id}>
                    <div>{secret.content}
                        <div>{secret.expiresAt}</div>
                    <button onClick={() => handleRevoke(secret.id)}>Revoke</button>

                    </div>
                </div>
            ))}
        </div>
    );
}

export default MySecrets;