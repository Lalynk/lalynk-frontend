import type { SecretDTO } from "../entities/SecretDTO";
import { getCsrfToken } from "./authService";

const baseUrl = "http://localhost:8080";


export async function createSecret(content: string): Promise<SecretDTO> {

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
        body: JSON.stringify({content})

    });

    if(!response.ok) {
        throw new Error("Could not create secret");
    }

    return await response.json();

}


export async function getSecrets() {
    const response = await fetch(baseUrl + "/secrets", {
        credentials: "include"
    });
    
    return await response.json();

}


export async function getPublicSecret(publicToken: string) {
    const response = await fetch(`${baseUrl}/secrets/public/${publicToken}`)

    if(!response.ok) {
        throw new Error("Could not retrieve secret");
    }

    return await response.json();
}