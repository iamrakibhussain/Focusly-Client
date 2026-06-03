import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-73px)] w-full max-w-6xl items-center px-4 py-12 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-md rounded-panel border border-white/10 bg-surface/80 p-6 shadow-soft">
        <div className="mb-6">
          <p className="text-sm text-text-secondary">Create your account</p>
          <h1 className="mt-1 text-2xl font-semibold">Register</h1>
        </div>

        <form className="grid gap-4">
          <label className="grid gap-2 text-sm">
            <span className="text-text-secondary">Name</span>
            <input
              type="text"
              placeholder="Your name"
              className="rounded-control border border-white/10 bg-background px-4 py-3 outline-none transition placeholder:text-text-secondary focus:border-primary"
            />
          </label>

          <label className="grid gap-2 text-sm">
            <span className="text-text-secondary">Email</span>
            <input
              type="email"
              placeholder="you@example.com"
              className="rounded-control border border-white/10 bg-background px-4 py-3 outline-none transition placeholder:text-text-secondary focus:border-primary"
            />
          </label>

          <label className="grid gap-2 text-sm">
            <span className="text-text-secondary">Password</span>
            <input
              type="password"
              placeholder="Create a password"
              className="rounded-control border border-white/10 bg-background px-4 py-3 outline-none transition placeholder:text-text-secondary focus:border-primary"
            />
          </label>

          <button
            type="button"
            className="rounded-control bg-primary px-4 py-3 font-medium text-white shadow-glow transition hover:opacity-95"
          >
            Create account
          </button>
        </form>

        <div className="mt-4 text-sm text-text-secondary">
          Already have an account?{" "}
          <Link to="/login" className="text-accent hover:text-white">
            Login
          </Link>
        </div>
      </section>
    </main>
  );
}
