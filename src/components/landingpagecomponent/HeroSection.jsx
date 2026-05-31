import "./HeroSection.css";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="landing-shell">
      <div className="hero-copy">
        <span className="hero-badge">
          <Sparkles className="hero-badge__icon" />
          Built for Students & Self-Learners
        </span>

        <h1 className="hero-heading">
          Plan Better.
          <br />
          Study Smarter.
          <br />
          Stay Focused.
        </h1>

        <p className="hero-description">
          Focusly is an all-in-one productivity platform that helps students
          organize tasks, plan study sessions, track goals, and stay on top of
          deadlines without feeling overwhelmed.
        </p>

        <div className="hero-actions">
          <Link to="/register" className="hero-button hero-button--primary">
            Get Started Free
            <ArrowRight className="hero-button__icon" />
          </Link>

          <a
            href="#dashboard-preview"
            className="hero-button hero-button--secondary"
          >
            Explore Features
          </a>
        </div>
      </div>

      <div className="hero-preview-wrap">
        <article className="dashboard-preview" id="dashboard-preview">
          <div className="dashboard-preview__top">
            <div>
              <p className="dashboard-preview__eyebrow">Today&apos;s focus</p>
              <h2 className="dashboard-preview__title">Focusly Dashboard</h2>
            </div>
            <span className="dashboard-preview__chip">83% complete</span>
          </div>

          <div className="dashboard-preview__stats">
            <div className="dashboard-mini-card">
              <p>Tasks</p>
              <strong>12</strong>
            </div>
            <div className="dashboard-mini-card">
              <p>Study Blocks</p>
              <strong>5</strong>
            </div>
            <div className="dashboard-mini-card">
              <p>Goals</p>
              <strong>4</strong>
            </div>
          </div>

          <div className="dashboard-preview__section">
            <div className="dashboard-preview__section-head">
              <h3>Upcoming Session</h3>
              <span>2:00 PM</span>
            </div>
            <div className="dashboard-preview__session">
              <div className="dashboard-preview__session-dot" />
              <div>
                <strong>Math revision sprint</strong>
                <p>45 min Pomodoro session with a short break plan.</p>
              </div>
            </div>
          </div>

          <div className="dashboard-preview__section">
            <div className="dashboard-preview__section-head">
              <h3>Priority tasks</h3>
              <span>3 remaining</span>
            </div>

            <div className="dashboard-preview__task-list">
              <div className="dashboard-task">
                <CheckCircle2 className="dashboard-task__icon is-done" />
                <span>Finish chemistry notes</span>
              </div>
              <div className="dashboard-task">
                <CheckCircle2 className="dashboard-task__icon" />
                <span>Review JavaScript concepts</span>
              </div>
              <div className="dashboard-task">
                <CheckCircle2 className="dashboard-task__icon" />
                <span>Plan tomorrow&apos;s study blocks</span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
