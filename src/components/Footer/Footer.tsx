import { Link } from "react-router-dom";
import "./Footer.css";
import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <p>© 2026 Lalynk</p>

        <div className="creater-container">
          <p>
            Created by <span>sucramdev</span>
          </p>
          <a href="https://github.com/sucramdev/">
            <FaGithub></FaGithub>
          </a>
        </div>
      </div>
      <div className="footer-right">
        <Link to="/about">About</Link>
      </div>
    </footer>
  );
}

export default Footer;
