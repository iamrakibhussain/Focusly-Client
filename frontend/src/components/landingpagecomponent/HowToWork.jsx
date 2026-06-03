import "./HowToWork.css";
import { ArrowRight, BarChart3, CalendarDays, Target } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Create Your Goals",
    description:
      "Define clear milestones. Set what you want to achieve and by when.",
    icon: Target,
  },
  {
    number: "02",
    title: "Plan Your Study Sessions",
    description: "Schedule focused study blocks on your personal planner.",
    icon: CalendarDays,
  },
  {
    number: "03",
    title: "Track Your Progress",
    description:
      "Measure productivity, review analytics, and improve over time.",
    icon: BarChart3,
  },
];

export default function HowToWork() {
  function StepHandler() {
    return steps.map(({ number, title, description, icon: Icon }) => (
      <article key={number} className="how-to-work__step">
        <div className="how-to-work__step-top">
          <span className="how-to-work__step-number">{number}</span>
          <span className="how-to-work__step-icon-wrap" aria-hidden="true">
            <Icon className="how-to-work__step-icon" />
          </span>
        </div>

        <h3 className="how-to-work__step-title">{title}</h3>
        <p className="how-to-work__step-text">{description}</p>
      </article>
    ));
  }
  return (
    <section className="how-to-work">
      <div className="how-to-work__inner">
        <header className="how-to-work__header">
          <p className="how-to-work__eyebrow">
            <ArrowRight className="how-to-work__eyebrow-icon" />
            Simple Workflow
          </p>
          <h2 className="how-to-work__heading">How Focusly Works</h2>
          <p className="how-to-work__subtext">
            Start building better study habits in three simple steps.
          </p>
        </header>

        <div className="how-to-work__steps">{StepHandler()}</div>
      </div>
    </section>
  );
}
