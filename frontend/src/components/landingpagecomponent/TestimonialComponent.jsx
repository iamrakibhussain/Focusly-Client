import "./TestimonialComponent.css";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Focusly helped me organize my entire study routine. I never miss a deadline anymore.",
    name: "Student A",
    role: "University Student",
  },
  {
    quote:
      "The analytics and focus sessions changed how I prepare for exams. Highly recommend!",
    name: "Student B",
    role: "Self-Learner",
  },
  {
    quote:
      "Everything I need is now in one place. It's the only app I use for studying.",
    name: "Student C",
    role: "Online Learner",
  },
];

export default function TestimonialComponent() {
  function RenderTestimonial() {
    return testimonials.map(({ quote, name, role }) => (
      <article key={name} className="testimonial-card">
        <Quote className="testimonial-card__quote-icon" aria-hidden="true" />
        <p className="testimonial-card__quote">“{quote}”</p>
        <div className="testimonial-card__meta">
          <div className="testimonial-card__avatar" aria-hidden="true">
            {name.slice(-1)}
          </div>
          <div>
            <h3 className="testimonial-card__name">{name}</h3>
            <p className="testimonial-card__role">{role}</p>
          </div>
        </div>
      </article>
    ));
  }

  return (
    <section
      className="testimonial-section"
      aria-labelledby="testimonial-heading"
    >
      <div className="testimonial-section__inner">
        <header className="testimonial-section__header">
          <p className="testimonial-section__eyebrow">Testimonials</p>
          <h2 id="testimonial-heading" className="testimonial-section__heading">
            Loved By Students Everywhere
          </h2>
          <p className="testimonial-section__subtext">
            Real feedback from learners who use Focusly to stay organized,
            focused, and consistent.
          </p>
        </header>

        <div className="testimonial-grid">{RenderTestimonial()}</div>
      </div>
    </section>
  );
}
