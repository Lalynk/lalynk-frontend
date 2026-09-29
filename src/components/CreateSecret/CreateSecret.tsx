import { useState } from "react";
import "./CreateSecret.css";
import { createSecret } from "../../services/secretService";
import type { SecretDTO } from "../../entities/SecretDTO";
import { frontendUrl } from "../../config";
import type { SecretSummaryDTO } from "../../entities/SecretSummaryDTO";

type CreatedSecretProps = {
  onCreated: (secretSummary: SecretSummaryDTO) => void;
};

function CreateSecret({ onCreated }: CreatedSecretProps) {
  const [secret, setSecret] = useState("");
  const [secretLink, setSecretLink] = useState("");
  const [expiration, setExpiration] = useState("1");
  const [copied, setCopied] = useState("Copy link");

  async function handleCreate() {
    const expiresAt = new Date();

    expiresAt.setHours(expiresAt.getHours() + Number(expiration));

    const createdSecret: SecretDTO = await createSecret(
      secret,
      expiresAt.toISOString(),
    );

    setSecretLink(`${frontendUrl}/s/${createdSecret.publicToken}`);

    const createdSecretSummary: SecretSummaryDTO = createdSecret;
    onCreated(createdSecretSummary);
  }

  return (
    <section className="create-secret">
      <div className="create-secret-header">
        <h2>Create</h2>
      </div>
      <div className="create-secret-container">
        <div className="create-container">
          {/*<label htmlFor="secret">Secret</label>*/}
          <textarea
            id="secret"
            placeholder="write your secret..."
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
          ></textarea>
        </div>
        <div className="expiration-container">
          <label htmlFor="expiration">Expiration</label>
          <select
            id="expiration"
            value={expiration}
            onChange={(e) => setExpiration(e.target.value)}
          >
            <option value="1">1 hours</option>
            <option value="24">24 hours</option>
            <option value="168">7 days</option>
            <option value="720">30 days</option>
          </select>
          <button onClick={() => handleCreate()}>Create</button>
        </div>
      </div>

      {secretLink && (
        <div className="secret-result">
          <label>Secret link: </label>
          <input value={secretLink} readOnly></input>

          <div className="secret-result-actions">
            <button
              onClick={() => {
                navigator.clipboard.writeText(secretLink);
                setCopied("Copied");
              }}
            >
              {copied}
            </button>

            <button
              onClick={() => {
                setSecret("");
                setSecretLink("");
              }}
            >
              Create another secret
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default CreateSecret;
