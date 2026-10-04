/*
File Purpose:
Public registration page for new account creation.

Connected With:
- backend/src/routes/auth.routes.js
- frontend/src/services/authService.js later if shared
*/
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export default function RegisterPage() {

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
    console.log(formData)
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setIsError(false);
    setIsLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message)
        setIsError(true)
        return;
      }

      setMessage(result.message)
      setIsError(false)

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      // Redirect to login page after a short delay to show success message
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setMessage(err.message)
      setIsError(true)
    }
    finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="min-h-screen text-slate-200 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 bg-transparent flex items-center justify-center p-6 relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[100px] -z-10" />

      <main className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">Focusly</span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Create an account</h1>
          <p className="text-slate-400">Join Focusly and start studying smarter.</p>
        </div>

        <section className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl p-8">
          {message && !isError && (
            <div className="mb-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
              {message}
            </div>
          )}
          {message && isError && (
            <div className="mb-6 p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
              {message}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-slate-300">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                name="name"
                required
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                name="email"
                required
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                name="password"
                required
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:text-slate-500"
              />
              <div className="text-xs text-slate-400 mt-2 p-3 bg-slate-800/30 rounded-lg border border-slate-700/50">
                <p className="font-semibold mb-1 text-slate-300">Password must contain:</p>
                <ul className="list-inside space-y-1">
                  <li className={`flex items-center gap-2 ${formData.password.length >= 8 ? "text-emerald-400" : ""}`}>
                    <span className="text-[10px]">{formData.password.length >= 8 ? "✓" : "○"}</span> At least 8 characters
                  </li>
                  <li className={`flex items-center gap-2 ${/[A-Z]/.test(formData.password) ? "text-emerald-400" : ""}`}>
                    <span className="text-[10px]">{/[A-Z]/.test(formData.password) ? "✓" : "○"}</span> One uppercase letter
                  </li>
                  <li className={`flex items-center gap-2 ${/[0-9]/.test(formData.password) ? "text-emerald-400" : ""}`}>
                    <span className="text-[10px]">{/[0-9]/.test(formData.password) ? "✓" : "○"}</span> One number
                  </li>
                  <li className={`flex items-center gap-2 ${/[^A-Za-z0-9]/.test(formData.password) && formData.password.length > 0 ? "text-emerald-400" : ""}`}>
                    <span className="text-[10px]">{/[^A-Za-z0-9]/.test(formData.password) && formData.password.length > 0 ? "✓" : "○"}</span> One special character
                  </li>
                </ul>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-indigo-600 px-4 py-3.5 font-semibold text-white transition-all hover:bg-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
              Login
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}
