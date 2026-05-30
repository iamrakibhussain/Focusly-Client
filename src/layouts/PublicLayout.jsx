import { Link, Outlet } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-white/10 bg-surface/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex items-center gap-2 font-semibold tracking-tight"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-panel bg-primary text-white shadow-glow">
              <BookOpen className="h-4 w-4" />
            </span>
            <span>Focusly</span>
          </Link>

          <nav className="flex items-center gap-2 text-sm">
            <Link
              to="/login"
              className="rounded-control px-3 py-2 text-text-secondary transition-colors hover:text-foreground"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-control bg-primary px-4 py-2 font-medium text-white transition hover:opacity-95"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
