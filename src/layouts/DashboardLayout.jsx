import { NavLink, Outlet } from "react-router-dom";
import {
  BarChart3,
  CalendarDays,
  CheckSquare,
  LayoutDashboard,
  Settings,
  Target,
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
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto grid min-h-screen w-full max-w-7xl lg:grid-cols-[260px_1fr]">
        <aside className="border-b border-white/10 bg-surface/70 px-4 py-5 backdrop-blur lg:border-b-0 lg:border-r lg:px-5">
          <div className="mb-8 flex items-center gap-3">
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
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        <div className="flex min-h-screen flex-col">
          <header className="border-b border-white/10 bg-surface/40 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-text-secondary">Welcome back</p>
                <h1 className="text-lg font-semibold">Your workspace</h1>
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
