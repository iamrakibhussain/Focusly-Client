import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-73px)] w-full max-w-6xl items-center px-4 py-12 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-md rounded-panel border border-white/10 bg-surface/80 p-6 shadow-soft">
        <div className="mb-6">
          <p className="text-sm text-text-secondary">Welcome back</p>
          <h1 className="mt-1 text-2xl font-semibold">Login</h1>
        </div>

        <form className="grid gap-4">


          <label
            htmlFor="email"
            className="text-text-secondary"
          >Email</label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            name="email"
            required
            autoComplete="email"
            className="rounded-control border border-white/10 bg-background px-4 py-3 outline-none transition placeholder:text-text-secondary focus:border-primary"
          />
          <label
            htmlFor="password"
            className="text-text-secondary"
          >Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            name="password"
            required
            autoComplete="current-password"
            className="rounded-control border border-white/10 bg-background px-4 py-3 outline-none transition placeholder:text-text-secondary focus:border-primary"
          />

          <button
            type="submit"
            className="rounded-control bg-primary px-4 py-3 font-medium text-white shadow-glow transition hover:opacity-95"
          >
            Login
          </button>
        </form>

        <div className="mt-4 flex items-center justify-between text-sm">
          <Link to="/forgot-password" className="text-text-secondary hover:text-foreground">
            Forgot password?
          </Link>
          <Link to="/register" className="text-accent hover:text-white">
            Create account
          </Link>
        </div>
      </section>
    </main>
  );
}
