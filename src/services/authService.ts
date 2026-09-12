import type { UserDTO } from "../AuthDTO";

const baseUrl = "http://localhost:8080";


export async function getUser(): Promise<UserDTO> {

    const response = await fetch(baseUrl + "/auth/me", {
        credentials: "include"
    });

    const data = await response.json();

    return data

}