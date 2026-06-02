import "./CallToAction.css";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <section className="cta-section" aria-labelledby="cta-heading">
      <div className="cta-section__inner">
        <div className="cta-section__panel">
          <div className="cta-section__accent" aria-hidden="true" />

          <header className="cta-section__header">
            <h2 id="cta-heading" className="cta-section__heading">
              Ready To Transform Your Study Routine?
            </h2>
            <p className="cta-section__text">
              Join thousands of students who use Focusly to stay organized,
              focused, and productive every day.
            </p>
          </header>

          <Link to="/register" className="cta-section__button">
            Get Started Free
            <ArrowRight className="cta-section__button-icon" />
          </Link>
        </div>
      </div>
    </section>
  );
}
