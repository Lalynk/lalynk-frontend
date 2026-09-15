import "./About.css"


function About() {
    return (
        <section className="about">
            <h2>About Lalynk</h2>

            <p>
                Lalynk is a simple way to share sensitive information
                through secure, one-time links.
            </p>

            <h3>How it works</h3>

            <p>
                Create a secret and Lalynk generates a unique link for it.
                Share the link with the recipient, who can open the secret
                without creating an account.
            </p>

            <p>
                Once the secret has been viewed, it can no longer be opened.
            </p>

            <h3>Security modes</h3>

            <h4>Normal mode</h4>

            <p>
                Secrets are protected by a randomly generated link.
                The link contains enough randomness to make guessing a
                secret impractical.
            </p>

            <h4>Ultra Safe mode</h4>

            <p>
                TBA
            </p>
        </section>
    );
}

export default About