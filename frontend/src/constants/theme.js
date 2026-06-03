export const brand = Object.freeze({
  name: "Focusly",
  personality: ["Focused", "Calm", "Modern", "Premium", "Productive"],
  style: "Modern SaaS, Minimal, Clean, Professional, Dashboard-First",
});

export const colors = Object.freeze({
  primary: "#4F46E5",
  accent: "#06B6D4",
  background: "#0F172A",
  surface: "#111827",
  foreground: "#F8FAFC",
  mutedForeground: "#94A3B8",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",

  text: "#F8FAFC",
  textSecondary: "#94A3B8",
});

export const typography = Object.freeze({
  fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
});

export const radii = Object.freeze({
  sm: "0.5rem",
  md: "0.75rem",
  lg: "1rem",
  xl: "1.25rem",
});

export const shadows = Object.freeze({
  soft: "0 20px 45px rgba(15, 23, 42, 0.35)",
  glow: "0 0 0 1px rgba(79, 70, 229, 0.14), 0 18px 40px rgba(15, 23, 42, 0.35)",
});

export const motion = Object.freeze({
  fast: "150ms",
  normal: "220ms",
  slow: "320ms",
  easing: "cubic-bezier(0.16, 1, 0.3, 1)",
});

export const designSystem = Object.freeze({
  brand,
  colors,
  typography,
  radii,
  shadows,
  motion,
});
