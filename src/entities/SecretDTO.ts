export interface SecretDTO {
    id: string,
    createdAt: string;
    expiresAt: string | null;
    consumedAt: string | null;
    revokedAt: string | null;
    content: string;
    publicToken: string;
}