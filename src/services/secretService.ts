import type { SecretDTO } from "../entities/SecretDTO";
import type { SecretSummaryDTO } from "../entities/SecretSummaryDTO";
import { getCsrfToken } from "./authService";
import { baseUrl } from "../config";

export async function createSecret(content: string, expiresAt: string | null): Promise<SecretDTO> {
    const token = getCsrfToken();

    if(token== null) {
        throw new Error("CSRF token is missing");
    }

    const response = await fetch(baseUrl + "/secrets", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": token
        },
        body: JSON.stringify({
            expiresAt,
            content
        })

    });

    if(!response.ok) {
        throw new Error("Could not create secret");
    }

    return await response.json();

}

export async function revokeSecret(id: string) {
    const token = getCsrfToken();

    if(token== null) {
        throw new Error("CSRF token is missing");
    }

    const response = await fetch(baseUrl + `/secrets/${id}/revoke`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "X-XSRF-TOKEN": token
            }

        }
    );

    if(!response.ok) {
        throw new Error("Could not revoke secret");
    }


}

export async function getSecrets(): Promise<SecretSummaryDTO[]> {
    const response = await fetch(baseUrl + "/secrets", {
        credentials: "include"
    });

    if(!response.ok) {
        throw new Error("Could not fetch secrets");
    }

    
    return await response.json();

}


export async function getSecretById(secretId: string): Promise<SecretDTO>  {
    const response = await fetch(baseUrl+ `/secrets/${secretId}`,{
        credentials: "include"
    });

    if(!response.ok) {
        throw new Error("could not fetch secret");
    }

    return await response.json();
}



export async function getPublicSecret(publicToken: string) {
    const response = await fetch(`${baseUrl}/secrets/public/${publicToken}`)

    if(!response.ok) {
        throw new Error("Could not retrieve secret");
    }

    return await response.json();
}