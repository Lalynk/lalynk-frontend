import { useEffect, useState } from "react"
import { getSecrets } from "../services/secretService";

function MySecrets() {
    const [secrets, setSecrets] = useState<any[]>([]);
    useEffect(() => {
        getSecrets().then(data => {
            setSecrets(data);
        });
    }, []);




    return (
        <div>
            <h2>My secrets</h2>
            {secrets.map((secret: any) => (
                <div key={secret.id}>
                    {secret.content}
                </div>
            ))}
        </div>
    );
}

export default MySecrets;