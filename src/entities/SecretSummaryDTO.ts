export interface SecretSummaryDTO{
    id: string,
    createdAt: string;
    expiresAt: string | null;
    consumedAt: string | null;
    revokedAt: string | null;
    publicToken: string;

}