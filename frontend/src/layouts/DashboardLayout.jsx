import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import {
  BarChart3,
  CalendarDays,
  CheckSquare,
  LayoutDashboard,
  Settings,
  Target,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/tasks", label: "Tasks", icon: CheckSquare },
  { to: "/planner", label: "Planner", icon: CalendarDays },
  { to: "/goals", label: "Goals", icon: Target },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout() {
  const [isSidebarOpen, setisSidebarOpen] = useState(false);

  const closeSidebar = () => setisSidebarOpen(false);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="mx-auto min-h-screen w-full max-w-7xl lg:grid lg:grid-cols-[260px_1fr]">
        <button
          type="button"
          aria-label="Close sidebar"
          className={`fixed inset-0 z-30 bg-black/50 transition-opacity duration-300 lg:hidden ${
            isSidebarOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
          onClick={closeSidebar}
        />

        <aside
          className={`fixed inset-y-0 left-0 z-40 w-[min(20rem,85vw)] border-r border-white/10 bg-surface/95 px-4 py-5 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-out lg:static lg:top-auto lg:z-auto lg:w-auto lg:translate-x-0 lg:bg-surface/70 lg:shadow-none ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mb-8 flex items-center justify-between gap-3 lg:justify-start">
            <span className="flex h-10 w-10 items-center justify-center rounded-panel bg-primary text-white shadow-glow">
              F
            </span>
            <div>
              <p className="font-semibold leading-tight">Focusly</p>
              <p className="text-sm text-text-secondary">Study Planner</p>
            </div>
          </div>

          <nav className="grid gap-1">
            {navItems.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 rounded-control px-3 py-2 text-sm transition",
                    isActive
                      ? "bg-primary text-white shadow-glow"
                      : "text-text-secondary hover:bg-white/5 hover:text-foreground",
                  ].join(" ")
                }
                onClick={closeSidebar}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        <div className="flex min-h-screen flex-col lg:min-h-screen">
          <header className="border-b border-white/10 bg-surface/40 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className={`inline-flex h-10 w-10 flex-none items-center justify-center rounded-control border border-white/10 text-foreground transition hover:bg-white/10 lg:hidden ${
                    isSidebarOpen
                      ? "fixed right-4 top-4 z-50 bg-blue-600 shadow-soft"
                      : "relative z-50 bg-white/5"
                  }`}
                  aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
                  aria-expanded={isSidebarOpen}
                  onClick={() => setisSidebarOpen((current) => !current)}
                >
                  {isSidebarOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </button>

                <div>
                  <p className="text-sm text-text-secondary">Welcome back</p>
                  <h1 className="text-lg font-semibold">Your workspace</h1>
                </div>
              </div>
              <div className="rounded-control border border-white/10 bg-white/5 px-3 py-2 text-sm text-text-secondary">
                Pro Workspace
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
