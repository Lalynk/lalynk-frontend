import type { SecretSummaryDTO } from "../entities/SecretSummaryDTO";



export function getSecretStatus(secret: SecretSummaryDTO) {

    if(secret.revokedAt) {
        return "Revoked";
    }

    if(secret.consumedAt) {
        return "Consumed";
    }

    if(secret.expiresAt && new Date(secret.expiresAt) <= new Date()) {
        return "Expired";
    }

    return "Active";

}