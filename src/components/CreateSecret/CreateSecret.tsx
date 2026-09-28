import "./CreateSecret.css";

function CreateSecret() {
  return (
    <section className="create-secret">
      <div className="create-secret-header">
        <h2>Create</h2>
      </div>
      <div className="create-secret-container">
        <textarea placeholder="write your secret..."></textarea>
        <button>Create</button>
      </div>
    </section>
  );
}

export default CreateSecret;
