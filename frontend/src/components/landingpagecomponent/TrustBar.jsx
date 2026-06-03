import "./TrustBar.css";

export default function TrustBar() {
  return (
    <section className="trust-bar" aria-labelledby="trust-bar-heading">
      <div className="trust-bar__inner">
        <h2 id="trust-bar-heading" className="trust-bar__heading">
          Designed to help students stay productive every day.
        </h2>

        <dl className="trust-bar__stats">
          <div className="trust-bar__stat">
            <dt className="trust-bar__value">10,000+</dt>
            <dd className="trust-bar__label">Study Sessions Tracked</dd>
          </div>

          <div className="trust-bar__stat">
            <dt className="trust-bar__value">50,000+</dt>
            <dd className="trust-bar__label">Tasks Completed</dd>
          </div>

          <div className="trust-bar__stat">
            <dt className="trust-bar__value">95%</dt>
            <dd className="trust-bar__label">User Satisfaction</dd>
          </div>

          <div className="trust-bar__stat">
            <dt className="trust-bar__value">24/7</dt>
            <dd className="trust-bar__label">Accessibility</dd>
          </div>
        </dl>
      </div>
    </section>
  );
} 
