import type { UserDTO } from "../entities/UserDTO";

import { baseUrl } from "../config";

let csrfToken: string | null = null;

export async function getUser(): Promise<UserDTO> {

    const response = await fetch(baseUrl + "/auth/me", {
        credentials: "include"
    });

    const data = await response.json();

    return data

}

export async function initializeAuth() {

    const user = await getUser();
    if(user.authenticated) {
        await refreshCsrfToken();
    }
}

export async function refreshCsrfToken() {

    const response = await fetch(baseUrl + "/auth/csrf", {
        credentials: "include"
    });

    if(!response.ok) {
        throw new Error("Could not fetch CSRF token");
    }

    const data = await response.json();
    csrfToken = data.token;
}

export function getCsrfToken() {
    return csrfToken;
}



export async function logout() {
    const token = getCsrfToken();

    if (!token) {
        throw new Error("CSRF token is missing");
    }

    const response = await fetch(baseUrl + "/logout", {
        method: "POST",
        credentials: "include",
        headers: {
            "X-XSRF-TOKEN": token
        }
    });

    if (!response.ok) {
        throw new Error("Logout failed");
    }
}