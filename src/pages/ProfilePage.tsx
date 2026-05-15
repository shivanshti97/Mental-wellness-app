import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  User, Mail, Phone, MapPin, Edit3, Save, X, LogOut,
  Calendar, Flame, Target, BookOpen, TrendingUp, Camera,
  Shield, Bell, Moon, ChevronRight, Award, Activity
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProfilePage: React.FC = () => {
  const { user, logout, updateProfile, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'mood' | 'settings'>('overview');

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || '',
  });

  if (!isAuthenticated || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <motion.div
          className="glass-card p-12 text-center max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Not Signed In</h2>
          <p className="text-gray-400 mb-6">Please sign in to view your profile.</p>
          <div className="flex gap-3 justify-center">
            <motion.button
              onClick={() => navigate('/login')}
              className="px-6 py-3 bg-gradient-to-r from-teal-500 to-purple-600 text-white rounded-lg font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In
            </motion.button>
            <motion.button
              onClick={() => navigate('/signup')}
              className="px-6 py-3 glass-card-hover text-white rounded-lg font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  const handleSave = () => {
    updateProfile(form);
    setEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const joinDate = new Date(user.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const moodHistory = user.moodHistory || [];
  const lastMood = moodHistory[moodHistory.length - 1];

  const moodColors: Record<string, string> = {
    Joyful: '#fbbf24', Happy: '#34d399', Neutral: '#a78bfa', Sad: '#f97316', Distressed: '#ef4444'
  };

  const stats = [
    { label: 'Day Streak', value: user.streak || 0, icon: Flame, color: 'text-orange-400' },
    { label: 'Sessions', value: user.sessionsCompleted || 0, icon: Activity, color: 'text-blue-400' },
    { label: 'Goals Met', value: user.goalsAchieved || 0, icon: Target, color: 'text-green-400' },
    { label: 'Mood Checks', value: moodHistory.length, icon: TrendingUp, color: 'text-purple-400' },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'mood', label: 'Mood History', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Shield },
  ] as const;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Profile Header Card */}
      <motion.div
        className="glass-card p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Avatar */}
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-teal-400 border-opacity-50">
              <img
                src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                alt={user.name}
                className="w-full h-full object-cover bg-gradient-to-br from-teal-600 to-purple-600"
              />
            </div>
            <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center shadow-lg hover:bg-teal-400 transition-colors">
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                <p className="text-gray-400 flex items-center gap-1 mt-1">
                  <Mail className="w-4 h-4" /> {user.email}
                </p>
                {user.location && (
                  <p className="text-gray-400 flex items-center gap-1 mt-1">
                    <MapPin className="w-4 h-4" /> {user.location}
                  </p>
                )}
                <p className="text-gray-500 flex items-center gap-1 mt-1 text-sm">
                  <Calendar className="w-3.5 h-3.5" /> Member since {joinDate}
                </p>
              </div>
              <div className="flex gap-2">
                {!editing ? (
                  <motion.button
                    id="edit-profile-btn"
                    onClick={() => { setForm({ name: user.name, email: user.email, phone: user.phone, location: user.location, bio: user.bio }); setEditing(true); }}
                    className="flex items-center gap-2 px-4 py-2 glass-card-hover rounded-lg text-white text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Edit3 className="w-4 h-4" /> Edit Profile
                  </motion.button>
                ) : (
                  <div className="flex gap-2">
                    <motion.button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-4 py-2 bg-teal-500 rounded-lg text-white text-sm font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Save className="w-4 h-4" /> Save
                    </motion.button>
                    <motion.button
                      onClick={() => setEditing(false)}
                      className="flex items-center gap-2 px-4 py-2 glass-card-hover rounded-lg text-gray-300 text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  </div>
                )}
                <motion.button
                  id="logout-btn"
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 bg-opacity-20 border border-red-500 border-opacity-30 rounded-lg text-red-400 text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogOut className="w-4 h-4" /> Logout
                </motion.button>
              </div>
            </div>

            {/* Bio */}
            {!editing ? (
              <p className="text-gray-300 mt-3 text-sm">{user.bio || 'No bio added yet.'}</p>
            ) : null}

            {/* Last mood badge */}
            {lastMood && (
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
                style={{ background: `${moodColors[lastMood.mood]}22`, color: moodColors[lastMood.mood], border: `1px solid ${moodColors[lastMood.mood]}44` }}>
                Last mood: {lastMood.mood} • {new Date(lastMood.date).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="glass-card p-5 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -3 }}
          >
            <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-gray-400 text-xs">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 glass-card p-1.5">
        {tabs.map(tab => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                ? 'bg-gradient-to-r from-teal-600 to-purple-600 text-white'
                : 'text-gray-400 hover:text-white'
              }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatedTabContent activeTab={activeTab} editing={editing} form={form} setForm={setForm} user={user} moodHistory={moodHistory} moodColors={moodColors} />
    </div>
  );
};

interface TabProps {
  activeTab: 'overview' | 'mood' | 'settings';
  editing: boolean;
  form: { name: string; email: string; phone: string; location: string; bio: string };
  setForm: React.Dispatch<React.SetStateAction<{ name: string; email: string; phone: string; location: string; bio: string }>>;
  user: NonNullable<ReturnType<typeof useAuth>['user']>;
  moodHistory: { date: string; mood: string; score: number }[];
  moodColors: Record<string, string>;
}

const AnimatedTabContent: React.FC<TabProps> = ({ activeTab, editing, form, setForm, user, moodHistory, moodColors }) => {
  const inputClass = "input-dark w-full px-4 py-2.5 text-sm";
  const labelClass = "block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide";

  if (activeTab === 'overview') {
    return (
      <motion.div
        className="glass-card p-8 space-y-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <User className="w-5 h-5 text-teal-400" /> Personal Information
        </h2>

        {editing ? (
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Full Name</label>
              <input className={inputClass} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" />
            </div>
            <div>
              <label className={labelClass}>Email Address</label>
              <input className={inputClass} type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" />
            </div>
            <div>
              <label className={labelClass}>Phone Number</label>
              <input className={inputClass} type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+1 234 567 8900" />
            </div>
            <div>
              <label className={labelClass}>Location</label>
              <input className={inputClass} value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="City, Country" />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Bio</label>
              <textarea
                className={`${inputClass} resize-none`}
                rows={3}
                value={form.bio}
                onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { icon: User, label: 'Full Name', value: user.name },
              { icon: Mail, label: 'Email', value: user.email },
              { icon: Phone, label: 'Phone', value: user.phone || 'Not added' },
              { icon: MapPin, label: 'Location', value: user.location || 'Not added' },
            ].map(field => (
              <div key={field.label} className="flex items-start gap-3 p-4 bg-white bg-opacity-5 rounded-xl">
                <field.icon className="w-5 h-5 text-teal-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-gray-400 text-xs">{field.label}</p>
                  <p className="text-white font-medium text-sm mt-0.5">{field.value}</p>
                </div>
              </div>
            ))}
            <div className="md:col-span-2 flex items-start gap-3 p-4 bg-white bg-opacity-5 rounded-xl">
              <BookOpen className="w-5 h-5 text-teal-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-gray-400 text-xs">Bio</p>
                <p className="text-white text-sm mt-0.5">{user.bio || 'No bio added yet.'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Achievements */}
        <div className="border-t border-white border-opacity-10 pt-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-400" /> Achievements
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'First Check-in', earned: true, emoji: '🌱' },
              { label: '7-Day Streak', earned: (user.streak || 0) >= 7, emoji: '🔥' },
              { label: 'Mood Tracker', earned: moodHistory.length > 0, emoji: '📊' },
              { label: 'Community Member', earned: true, emoji: '🤝' },
              { label: '30-Day Streak', earned: (user.streak || 0) >= 30, emoji: '⭐' },
            ].map(badge => (
              <div
                key={badge.label}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${badge.earned
                    ? 'bg-teal-500 bg-opacity-20 text-teal-300 border border-teal-500 border-opacity-30'
                    : 'bg-white bg-opacity-5 text-gray-500 border border-white border-opacity-10'
                  }`}
              >
                <span>{badge.emoji}</span>
                <span className="font-medium">{badge.label}</span>
                {!badge.earned && <span className="text-xs">(locked)</span>}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  if (activeTab === 'mood') {
    return (
      <motion.div
        className="glass-card p-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-purple-400" /> Mood History
        </h2>
        {moodHistory.length === 0 ? (
          <div className="text-center py-12">
            <Activity className="w-12 h-12 text-gray-500 mx-auto mb-3" />
            <p className="text-gray-400">No mood checks yet.</p>
            <p className="text-gray-500 text-sm mt-1">Take the mood tracker to see your history here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {[...moodHistory].reverse().map((entry, i) => (
              <motion.div
                key={i}
                className="flex items-center justify-between p-4 bg-white bg-opacity-5 rounded-xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ background: moodColors[entry.mood] || '#a78bfa' }} />
                  <div>
                    <p className="text-white font-medium">{entry.mood}</p>
                    <p className="text-gray-400 text-xs">{new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold" style={{ color: moodColors[entry.mood] }}>
                    Score: {entry.score > 0 ? '+' : ''}{entry.score}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    );
  }

  // Settings tab
  const settingItems = [
    { icon: Bell, label: 'Push Notifications', desc: 'Daily mood check reminders', id: 'notif' },
    { icon: Moon, label: 'Dark Mode', desc: 'Always enabled for wellness', id: 'dark' },
    { icon: Shield, label: 'Privacy Mode', desc: 'Hide profile from community', id: 'privacy' },
  ];

  return (
    <motion.div
      className="glass-card p-8 space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-6">
        <Shield className="w-5 h-5 text-blue-400" /> Settings & Preferences
      </h2>
      {settingItems.map(item => (
        <div key={item.id} className="flex items-center justify-between p-4 bg-white bg-opacity-5 rounded-xl">
          <div className="flex items-center gap-3">
            <item.icon className="w-5 h-5 text-teal-400" />
            <div>
              <p className="text-white font-medium text-sm">{item.label}</p>
              <p className="text-gray-400 text-xs">{item.desc}</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-500" />
        </div>
      ))}

      <div className="border-t border-white border-opacity-10 pt-4">
        <p className="text-gray-400 text-xs text-center">Account ID: {user.id}</p>
        <p className="text-gray-500 text-xs text-center mt-1">MindSpace v1.0 • Your data is stored locally</p>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
