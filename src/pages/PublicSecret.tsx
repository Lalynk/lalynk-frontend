import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPublicSecret } from "../services/secretService";

function PublicSecret() {

    const { publicToken } = useParams();

    const [content, setContent] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

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
                setError("Could not retrieve secret.");
            }
        }

        fetchSecret();

    }, [publicToken]);

    if (error) {
        return <p>{error}</p>;
    }

    if (content === null) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Your secret</h1>
            <p>{content}</p>
        </div>
    );
}

export default PublicSecret;