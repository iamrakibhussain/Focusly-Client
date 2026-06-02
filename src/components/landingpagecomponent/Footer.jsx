import "./Footer.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/focusly logo.png";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Features", to: "#features-heading" },
  { label: "About", to: "#why-focusly-heading" },
  { label: "Contact", to: "#footer" },
];

const legalLinks = [
  { label: "Privacy Policy", to: "/" },
  { label: "Terms of Service", to: "/" },
  { label: "Cookie Policy", to: "/" },
];

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer__inner">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link to="/" className="footer__brand-link">
              <img src={Logo} alt="Focusly Logo" className="footer__logo" />
            </Link>
            <p className="footer__tagline">
              Plan better, study smarter, and stay focused every day.
            </p>
            <a href="mailto:support@focusly.app" className="footer__email">
              support@focusly.app
            </a>
          </div>

          <nav className="footer__column" aria-labelledby="footer-quick-links">
            <h2 id="footer-quick-links" className="footer__title">
              Quick Links
            </h2>
            <ul className="footer__list">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a className="footer__link" href={link.to}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer__column" aria-labelledby="footer-legal-links">
            <h2 id="footer-legal-links" className="footer__title">
              Legal
            </h2>
            <ul className="footer__list">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a className="footer__link" href={link.to}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="footer__bottom">
          {` © new ${new Date().getFullYear()} Focusly. All rights reserved.`}
        </div>
      </div>
    </footer>
  );
}
