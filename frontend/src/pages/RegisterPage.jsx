import { useState } from "react";
import { Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export default function RegisterPage() {
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
        throw new Error(result?.message || "Registration failed");
      }

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="mx-auto flex min-h-[calc(100vh-73px)] w-full max-w-6xl items-center px-4 py-12 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-md rounded-panel border border-white/10 bg-surface/80 p-6 shadow-soft">
        <div className="mb-6">
          <p className="text-sm text-text-secondary">Create your account</p>
          <h1 className="mt-1 text-2xl font-semibold">Register</h1>
        </div>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <label htmlFor="name" className="text-text-secondary">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Your full name"
            name="name"
            required
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            className="rounded-control border border-white/10 bg-background px-4 py-3 outline-none transition placeholder:text-text-secondary focus:border-primary"
          />

          <label htmlFor="email" className="text-text-secondary">
            Email
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
            className="rounded-control border border-white/10 bg-background px-4 py-3 outline-none transition placeholder:text-text-secondary focus:border-primary"
          />
          <label htmlFor="password" className="text-text-secondary">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Create a password"
            name="password"
            required
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            className="rounded-control border border-white/10 bg-background px-4 py-3 outline-none transition placeholder:text-text-secondary focus:border-primary"
          />

          <button
            type="submit"
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
