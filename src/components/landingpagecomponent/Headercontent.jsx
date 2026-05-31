import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../../assets/focusly logo.png";
import "./Headercontent.css";

export default function HeaderContent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="public-header">
      <Link to="/" className="public-header__brand">
        <img src={Logo} alt="Focusly Logo" className="public-header__logo" />
      </Link>

      <nav className="public-header__nav public-header__nav--desktop">
        <Link to="/" className="public-header__link">
          Home
        </Link>

        <Link to="/login" className="public-header__link">
          Login
        </Link>

        <Link to="/register" className="public-header__cta">
          Register
        </Link>
      </nav>

      <button
        type="button"
        className="public-header__toggle"
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
        aria-controls="public-mobile-menu"
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? (
          <X className="public-header__icon" />
        ) : (
          <Menu className="public-header__icon" />
        )}
      </button>

      <div
        id="public-mobile-menu"
        className={`public-header__mobile ${isOpen ? "is-open" : ""}`}
      >
        <Link
          to="/"
          className="public-header__mobile-link"
          onClick={() => setIsOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/login"
          className="public-header__mobile-link"
          onClick={() => setIsOpen(false)}
        >
          Login
        </Link>
        <Link
          to="/register"
          className="public-header__mobile-cta"
          onClick={() => setIsOpen(false)}
        >
          Register
        </Link>
      </div>
    </header>
  );
}
