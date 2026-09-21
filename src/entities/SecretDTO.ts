import type { SecretSummaryDTO } from "./SecretSummaryDTO";

export interface SecretDTO extends SecretSummaryDTO{
    content: string;
}