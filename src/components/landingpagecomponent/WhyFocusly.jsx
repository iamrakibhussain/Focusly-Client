import "./WhyFocusly.css";
import { BarChart3, CheckCircle2, Repeat2, ShieldCheck } from "lucide-react";

const benefits = [
  {
    title: "Stay Organized",
    description:
      "One workspace to keep tasks, goals, and study plans all in one place.",
    icon: CheckCircle2,
  },
  {
    title: "Build Better Habits",
    description:
      "Develop routines and build consistency through regular focus sessions.",
    icon: Repeat2,
  },
  {
    title: "Measure Growth",
    description:
      "Analytics reveal how you learn best and where your progress is strongest.",
    icon: BarChart3,
  },
  {
    title: "Reduce Stress",
    description:
      "Know exactly what to study and when, so there is no guessing.",
    icon: ShieldCheck,
  },
];

export default function WhyFocusly() {

    function HandleBenefitsCards(){
        return benefits.map(({ title, description, icon: Icon }) => (
            <article key={title} className="why-focusly__card">
              <div className="why-focusly__icon-wrap" aria-hidden="true">
                <Icon className="why-focusly__icon" />
              </div>
              <h3 className="why-focusly__card-title">{title}</h3>
              <p className="why-focusly__card-text">{description}</p>
            </article>
          ))
    }

  return (
    <section className="why-focusly" aria-labelledby="why-focusly-heading">
      <div className="why-focusly__inner">
        <header className="why-focusly__header">
          <p className="why-focusly__eyebrow">Why Focusly</p>
          <h2 id="why-focusly-heading" className="why-focusly__heading">
            Why Students Choose Focusly
          </h2>
          <p className="why-focusly__subtext">
            Built specifically for learners who want clarity, consistency, and
            measurable progress.
          </p>
        </header>

        <div className="why-focusly__grid">
          {HandleBenefitsCards()}
        </div>
      </div>
    </section>
  );
}
