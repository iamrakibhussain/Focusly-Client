/*
File Purpose:
Public password recovery page.

Connected With:
- future auth recovery flow
*/
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-73px)] w-full max-w-6xl items-center px-4 py-12 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-md rounded-panel border border-white/10 bg-surface/80 p-6 shadow-soft">
        <div className="mb-6">
          <p className="text-sm text-text-secondary">Password recovery</p>
          <h1 className="mt-1 text-2xl font-semibold">Forgot Password</h1>
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
          <button
            type="submit"
            className="rounded-control bg-primary px-4 py-3 font-medium text-white shadow-glow transition hover:opacity-95"
          >
            Send reset link
          </button>
        </form>

        <div className="mt-4 text-sm text-text-secondary">
          Back to{" "}
          <Link to="/login" className="text-accent hover:text-white">
            Login
          </Link>
        </div>
      </section>
    </main>
  );
}
