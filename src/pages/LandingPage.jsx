import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

const highlights = [
  "Focused daily planning",
  "Calm, premium UI",
  "Dashboard-first workflow",
];

export default function LandingPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-73px)] w-full max-w-6xl items-center px-4 py-12 sm:px-6 lg:px-8">
      <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-text-secondary">
            <Sparkles className="h-4 w-4 text-accent" />
            Smart study planning
          </span>
          <div className="space-y-4">
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Stay focused, plan better, and keep your study flow calm.
            </h1>
            <p className="max-w-xl text-base leading-7 text-text-secondary">
              Focusly helps you organize tasks, track progress, and move through your day with a
              clean dashboard-first experience.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-control bg-primary px-5 py-3 font-medium text-white shadow-glow transition hover:opacity-95"
            >
              Create account
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-control border border-white/10 bg-white/5 px-5 py-3 font-medium text-foreground transition hover:bg-white/10"
            >
              Login
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item}
                className="rounded-panel border border-white/10 bg-surface/70 p-4 text-sm text-text-secondary shadow-soft"
              >
                <CheckCircle2 className="mb-2 h-4 w-4 text-success" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-panel border border-white/10 bg-surface/80 p-6 shadow-soft">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-text-secondary">Today</p>
              <h2 className="text-2xl font-semibold">Study dashboard snapshot</h2>
            </div>

            <div className="grid gap-3">
              {[
                ["Focus time", "4h 20m"],
                ["Tasks done", "12/18"],
                ["Goal progress", "78%"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-control bg-white/5 px-4 py-3"
                >
                  <span className="text-sm text-text-secondary">{label}</span>
                  <span className="font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
