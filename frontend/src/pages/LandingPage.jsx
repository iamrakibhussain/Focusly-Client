import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Target,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Clock,
  BookOpen,
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen text-slate-200 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 bg-transparent">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md z-50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">
              Focusly
            </span>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              to="/login"
              className="hidden sm:block text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="text-sm font-semibold bg-indigo-600 text-white px-6 py-2.5 rounded-full hover:bg-indigo-500 transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 pt-16 pb-24 lg:pt-32 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="max-w-2xl z-10"
            >
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-8">
                <Sparkles className="w-4 h-4" />
                <span>Built for Students & Self-Learners</span>
              </motion.div>
              
              <motion.h1 variants={fadeIn} className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.15] mb-6">
                Plan Better.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                  Study Smarter.
                </span><br />
                Stay Focused.
              </motion.h1>
              
              <motion.p variants={fadeIn} className="text-lg text-slate-400 mb-10 leading-relaxed max-w-xl">
                Focusly is an all-in-one productivity platform that helps you organize tasks, plan study sessions, track goals, and stay on top of deadlines without feeling overwhelmed.
              </motion.p>
              
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                  to="/register"
                  className="w-full sm:w-auto flex justify-center items-center gap-2 px-8 py-4 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-all shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:-translate-y-1"
                >
                  Start For Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="#features"
                  className="w-full sm:w-auto flex justify-center items-center gap-2 px-8 py-4 rounded-full bg-slate-800/50 text-white font-medium border border-slate-700 hover:bg-slate-700 transition-all backdrop-blur-sm"
                >
                  Explore Features
                </a>
              </motion.div>
            </motion.div>

            {/* Abstract UI Mockup */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              {/* Glow effect behind mockup */}
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-cyan-500/20 blur-3xl rounded-full transform -rotate-6 scale-110" />
              
              <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-800">
                  <div>
                    <p className="text-sm font-medium text-indigo-400 mb-1">Today's Focus</p>
                    <h3 className="text-2xl font-bold text-white">Dashboard</h3>
                  </div>
                  <div className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-semibold border border-cyan-500/20">
                    83% Complete
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { label: "Tasks", value: "12" },
                    { label: "Study Blocks", value: "5" },
                    { label: "Goals", value: "4" }
                  ].map((stat, i) => (
                    <div key={i} className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/50">
                      <p className="text-xs text-slate-400 font-medium mb-1">{stat.label}</p>
                      <p className="text-xl font-bold text-white">{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-700/50 bg-slate-800/40">
                    <div className="mt-1">
                      <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Math revision sprint</h4>
                      <p className="text-sm text-slate-400 mt-1">45 min Pomodoro session with a short break plan.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-700/50 bg-slate-800/20 opacity-60">
                    <div className="mt-1">
                      <div className="w-5 h-5 rounded-full border-2 border-slate-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Finish chemistry notes</h4>
                      <p className="text-sm text-slate-400 mt-1">Due tomorrow at 10:00 AM</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 relative">
          <div className="absolute inset-0 bg-slate-900/50 border-y border-slate-800 backdrop-blur-sm -z-10" />
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Everything you need to succeed</h2>
              <p className="text-lg text-slate-400">Focusly replaces the chaos of multiple planners, notebooks, and apps with one beautifully simple workspace.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  icon: <Target className="w-6 h-6 text-indigo-400" />,
                  title: "Goal Tracking",
                  desc: "Set ambitious goals and break them down into manageable daily tasks."
                },
                {
                  icon: <Calendar className="w-6 h-6 text-cyan-400" />,
                  title: "Smart Planning",
                  desc: "Schedule your study blocks visually and never miss a deadline again."
                },
                {
                  icon: <Clock className="w-6 h-6 text-indigo-400" />,
                  title: "Focus Sessions",
                  desc: "Built-in Pomodoro timers to keep you in the zone and prevent burnout."
                },
                {
                  icon: <TrendingUp className="w-6 h-6 text-cyan-400" />,
                  title: "Analytics",
                  desc: "Track your progress over time with detailed insights and study graphs."
                },
                {
                  icon: <CheckCircle2 className="w-6 h-6 text-indigo-400" />,
                  title: "Task Management",
                  desc: "Organize assignments by priority, subject, and upcoming due dates."
                },
                {
                  icon: <BookOpen className="w-6 h-6 text-cyan-400" />,
                  title: "Study Hub",
                  desc: "Keep all your notes, resources, and syllabi connected to your tasks."
                }
              ].map((feature, idx) => (
                <div key={idx} className="p-8 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-indigo-500/30 hover:bg-slate-800/80 transition-all group backdrop-blur-md">
                  <div className="w-14 h-14 bg-slate-900/80 rounded-xl border border-slate-700 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-500/10 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[100px] -z-10" />
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Ready to transform your study routine?</h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of students who are already using Focusly to achieve their academic goals with less stress.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-all shadow-[0_0_30px_rgba(79,70,229,0.3)] hover:shadow-[0_0_40px_rgba(79,70,229,0.5)] hover:-translate-y-1"
            >
              Create Your Free Account
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-12 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span className="text-lg font-bold text-white">Focusly</span>
          </div>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Focusly. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
