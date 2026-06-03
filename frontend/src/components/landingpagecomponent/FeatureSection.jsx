import "./FeatureSection.css";
import {
  BarChart3,
  CheckSquare2,
  Focus,
  Target,
  TrendingUp,
  CalendarDays,
} from "lucide-react";

const features = [
  {
    title: "Task Management",
    description: "Organize assignments, deadlines, and daily tasks.",
    icon: CheckSquare2,
  },
  {
    title: "Study Planner",
    description: "Create structured study schedules.",
    icon: CalendarDays,
  },
  {
    title: "Focus Sessions",
    description: "Improve concentration and eliminate distractions.",
    icon: Focus,
  },
  {
    title: "Goal Tracking",
    description: "Monitor progress with visual indicators.",
    icon: Target,
  },
  {
    title: "Analytics Dashboard",
    description: "Gain insights through detailed reports.",
    icon: BarChart3,
  },
  {
    title: "Progress Tracking",
    description: "Maintain streaks and build consistency.",
    icon: TrendingUp,
  },
];

export default function FeatureSection() {
  function renderFeatureCards() {
    return (features.map(({ title, description, icon: Icon }) => (
      <article key={title} className="feature-card">
        <div className="feature-card__accent" />
        <div className="feature-card__icon-wrap" aria-hidden="true">
          <Icon className="feature-card__icon" />
        </div>
        <h3 className="feature-card__title">{title}</h3>
        <p className="feature-card__text">{description}</p>
      </article>
    )))
  }
  return (
    <section className="feature-section" aria-labelledby="features-heading">
      <div className="feature-section__inner">
        <header className="feature-section__header">
          <h2 id="features-heading" className="feature-section__heading">
            Everything You Need To Stay Productive
          </h2>
          <p className="feature-section__subtext">
            Powerful tools designed to help you plan, focus, and achieve your
            learning goals from a single dashboard.
          </p>
        </header>

        <div className="feature-grid">{renderFeatureCards()}</div>
      </div>
    </section>
  );
}
