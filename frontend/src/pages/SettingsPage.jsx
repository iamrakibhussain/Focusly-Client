/*
File Purpose:
Settings page composition. Organizes profile, notification, appearance, privacy, and account sections.

Connected With:
- frontend/src/components/settings/*

Current Role:
- Page structure only; settings interactions will be wired later.
*/
import { useEffect, useState } from "react";
import { User, Lock, Clock, Trash2, Save, Loader2, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState(null);
  
  // Forms State
  const [profileForm, setProfileForm] = useState({ name: "", email: "" });
  const [passwordForm, setPasswordForm] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [pomodoroForm, setPomodoroForm] = useState({ pomodoroTime: 25, shortBreakTime: 5, longBreakTime: 15, sessionsBeforeLong: 4 });
  const [dangerForm, setDangerForm] = useState({ password: "" });

  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/settings`, { credentials: "include" });
      const result = await res.json();
      if (result.success) {
        setSettings(result.data);
        setProfileForm({ name: result.data.profile.name, email: result.data.profile.email });
        setPomodoroForm(result.data.settings);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/settings/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name: profileForm.name })
      });
      const result = await res.json();
      if (result.success) showMessage("Profile updated successfully!");
      else showMessage(result.message, "error");
    } catch (err) {
      showMessage("Error updating profile", "error");
    }
    setSaving(false);
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      return showMessage("New passwords do not match!", "error");
    }
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/settings/password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ oldPassword: passwordForm.oldPassword, newPassword: passwordForm.newPassword })
      });
      const result = await res.json();
      if (result.success) {
        showMessage("Password updated successfully!");
        setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        showMessage(result.message, "error");
      }
    } catch (err) {
      showMessage("Error updating password", "error");
    }
    setSaving(false);
  };

  const handleUpdatePomodoro = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/settings/preferences`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          pomodoroTime: Number(pomodoroForm.pomodoroTime),
          shortBreakTime: Number(pomodoroForm.shortBreakTime),
          longBreakTime: Number(pomodoroForm.longBreakTime),
          sessionsBeforeLong: Number(pomodoroForm.sessionsBeforeLong)
        })
      });
      const result = await res.json();
      if (result.success) showMessage("Pomodoro settings saved!");
      else showMessage(result.message, "error");
    } catch (err) {
      showMessage("Error saving preferences", "error");
    }
    setSaving(false);
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm("Are you absolutely sure? This cannot be undone.");
    if (!confirmed) return;
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/settings/account`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password: dangerForm.password })
      });
      const result = await res.json();
      if (result.success) {
        window.location.href = "/";
      } else {
        showMessage(result.message, "error");
      }
    } catch (err) {
      showMessage("Error deleting account", "error");
    }
    setSaving(false);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "pomodoro", label: "Pomodoro", icon: Clock },
    { id: "danger", label: "Danger Zone", icon: Trash2 },
  ];

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-12">
      {/* Header */}
      <header className="rounded-3xl border border-white/10 bg-slate-900/40 p-8 backdrop-blur-xl shadow-xl flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Settings</h1>
          <p className="mt-2 text-slate-400">Manage your account, preferences, and security.</p>
        </div>
        <div className="p-4 bg-orange-500/10 text-orange-400 rounded-full">
          <User size={32} />
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav */}
        <aside className="md:w-64 flex-shrink-0">
          <nav className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-2 overflow-x-auto pb-2 md:pb-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm whitespace-nowrap ${
                    isActive 
                      ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25" 
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  } ${tab.id === 'danger' && isActive ? '!bg-red-500 shadow-red-500/25' : ''}`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0">
          <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-8 backdrop-blur-xl shadow-xl relative overflow-hidden">
            
            <AnimatePresence mode="wait">
              {message.text && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-sm font-medium shadow-lg z-10 ${
                    message.type === 'error' ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'
                  }`}
                >
                  {message.text}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {/* PROFILE TAB */}
              {activeTab === "profile" && (
                <motion.div key="profile" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-white">Profile Information</h2>
                    <p className="text-sm text-slate-400 mt-1">Update your personal details.</p>
                  </div>
                  <form onSubmit={handleUpdateProfile} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">Display Name</label>
                      <input 
                        type="text" 
                        value={profileForm.name}
                        onChange={e => setProfileForm({...profileForm, name: e.target.value})}
                        className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                      <input 
                        type="email" 
                        value={profileForm.email}
                        disabled
                        className="w-full bg-slate-800/20 border border-white/5 rounded-xl px-4 py-2.5 text-slate-500 cursor-not-allowed"
                      />
                      <p className="text-xs text-slate-500 mt-1">Email cannot be changed directly.</p>
                    </div>
                    <button type="submit" disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-all disabled:opacity-50 mt-4">
                      {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                      Save Profile
                    </button>
                  </form>
                </motion.div>
              )}

              {/* SECURITY TAB */}
              {activeTab === "security" && (
                <motion.div key="security" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-white">Change Password</h2>
                    <p className="text-sm text-slate-400 mt-1">Ensure your account is using a long, random password to stay secure.</p>
                  </div>
                  <form onSubmit={handleUpdatePassword} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">Current Password</label>
                      <input 
                        type="password" 
                        value={passwordForm.oldPassword}
                        onChange={e => setPasswordForm({...passwordForm, oldPassword: e.target.value})}
                        className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">New Password</label>
                      <input 
                        type="password" 
                        value={passwordForm.newPassword}
                        onChange={e => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                        className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required minLength={6}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">Confirm New Password</label>
                      <input 
                        type="password" 
                        value={passwordForm.confirmPassword}
                        onChange={e => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                        className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required minLength={6}
                      />
                    </div>
                    <button type="submit" disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-all disabled:opacity-50 mt-4">
                      {saving ? <Loader2 size={18} className="animate-spin" /> : <Lock size={18} />}
                      Update Password
                    </button>
                  </form>
                </motion.div>
              )}

              {/* POMODORO TAB */}
              {activeTab === "pomodoro" && (
                <motion.div key="pomodoro" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-white">Pomodoro Preferences</h2>
                    <p className="text-sm text-slate-400 mt-1">Customize your focus and break durations.</p>
                  </div>
                  <form onSubmit={handleUpdatePomodoro} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Focus Time (min)</label>
                        <input 
                          type="number" 
                          value={pomodoroForm.pomodoroTime}
                          onChange={e => setPomodoroForm({...pomodoroForm, pomodoroTime: e.target.value})}
                          className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                          required min={1} max={120}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Short Break (min)</label>
                        <input 
                          type="number" 
                          value={pomodoroForm.shortBreakTime}
                          onChange={e => setPomodoroForm({...pomodoroForm, shortBreakTime: e.target.value})}
                          className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                          required min={1} max={30}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Long Break (min)</label>
                        <input 
                          type="number" 
                          value={pomodoroForm.longBreakTime}
                          onChange={e => setPomodoroForm({...pomodoroForm, longBreakTime: e.target.value})}
                          className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                          required min={1} max={60}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Sessions until Long Break</label>
                        <input 
                          type="number" 
                          value={pomodoroForm.sessionsBeforeLong}
                          onChange={e => setPomodoroForm({...pomodoroForm, sessionsBeforeLong: e.target.value})}
                          className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                          required min={1} max={10}
                        />
                      </div>
                    </div>
                    <button type="submit" disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-all disabled:opacity-50 mt-4">
                      {saving ? <Loader2 size={18} className="animate-spin" /> : <Clock size={18} />}
                      Save Preferences
                    </button>
                  </form>
                </motion.div>
              )}

              {/* DANGER TAB */}
              {activeTab === "danger" && (
                <motion.div key="danger" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-red-400">Danger Zone</h2>
                    <p className="text-sm text-slate-400 mt-1">Permanently delete your account and all associated data.</p>
                  </div>
                  
                  <div className="p-5 border border-red-500/20 bg-red-500/10 rounded-2xl mb-6">
                    <p className="text-sm text-red-200">
                      <strong>Warning:</strong> Deleting your account will permanently erase all your tasks, goals, analytics, and settings. This action cannot be undone.
                    </p>
                  </div>

                  <form onSubmit={handleDeleteAccount} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-red-300 mb-1">Enter your password to confirm</label>
                      <input 
                        type="password" 
                        value={dangerForm.password}
                        onChange={e => setDangerForm({ password: e.target.value })}
                        className="w-full bg-slate-800/50 border border-red-500/30 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                      />
                    </div>
                    <button type="submit" disabled={saving || !dangerForm.password} className="flex items-center gap-2 px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-all disabled:opacity-50 mt-4 shadow-lg shadow-red-500/20">
                      {saving ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                      Delete Account
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
