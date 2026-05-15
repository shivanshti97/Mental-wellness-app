import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Star, Clock, MessageCircle, Award, MapPin, Search } from 'lucide-react';

const counselors = [
  { id: 1, name: 'Dr. Sarah Mitchell', specialty: 'Anxiety & Depression', rating: 4.9, reviews: 128, experience: '12 years', location: 'New York, USA', available: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', tags: ['CBT', 'Mindfulness', 'Trauma'] },
  { id: 2, name: 'Dr. James Okafor', specialty: 'Stress & Burnout', rating: 4.8, reviews: 95, experience: '8 years', location: 'London, UK', available: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James', tags: ['Work-Life', 'Resilience', 'ACT'] },
  { id: 3, name: 'Dr. Priya Sharma', specialty: 'Relationship & Family', rating: 4.9, reviews: 214, experience: '15 years', location: 'Mumbai, India', available: false, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya', tags: ['Family', 'Couples', 'Communication'] },
  { id: 4, name: 'Dr. Carlos Rivera', specialty: 'Addiction & Recovery', rating: 4.7, reviews: 76, experience: '10 years', location: 'Madrid, Spain', available: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos', tags: ['Recovery', 'Motivation', 'DBT'] },
  { id: 5, name: 'Dr. Aiko Tanaka', specialty: 'Youth & Adolescents', rating: 4.8, reviews: 103, experience: '9 years', location: 'Tokyo, Japan', available: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aiko', tags: ['Youth', 'School', 'ADHD'] },
  { id: 6, name: 'Dr. Emma Williams', specialty: 'Grief & Loss', rating: 4.9, reviews: 167, experience: '13 years', location: 'Sydney, Australia', available: false, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma', tags: ['Grief', 'Trauma', 'EMDR'] },
];

const CounselorsPage: React.FC = () => {
  const [search, setSearch] = useState('');

  const filtered = counselors.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.specialty.toLowerCase().includes(search.toLowerCase()) ||
    c.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        className="glass-card p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
          <Users className="w-9 h-9 text-blue-400" /> Find Your Counselor
        </h1>
        <p className="text-gray-300 mb-6">Connect with licensed mental health professionals who care about your journey.</p>

        {/* Premium Search Bar */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-teal-500/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-300 z-10" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, specialty, or expertise..."
              className="w-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl pl-14 pr-5 py-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-400/60 focus:bg-white/15 hover:bg-white/12 transition-all duration-300 shadow-lg shadow-black/10 selection:bg-blue-400/30 selection:text-gray-800"
              style={{
                color: '#1f2937',
                WebkitTextFillColor: '#1f2937',
                caretColor: '#3b82f6'
              }}
              autoComplete="off"
            />
            {search && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((c, i) => (
          <motion.div
            key={c.id}
            className="glass-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
          >
            {/* Avatar + availability */}
            <div className="flex items-start justify-between mb-4">
              <div className="relative">
                <img src={c.avatar} alt={c.name} className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600" />
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-900 ${c.available ? 'bg-green-400' : 'bg-gray-500'}`} />
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${c.available ? 'bg-green-500 bg-opacity-20 text-green-400' : 'bg-gray-500 bg-opacity-20 text-gray-400'}`}>
                {c.available ? '● Available' : '● Busy'}
              </span>
            </div>

            <h3 className="text-white font-bold text-lg">{c.name}</h3>
            <p className="text-teal-400 text-sm font-medium mb-3">{c.specialty}</p>

            <div className="space-y-1.5 mb-4 text-xs text-gray-400">
              <div className="flex items-center gap-2"><Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />{c.rating} ({c.reviews} reviews)</div>
              <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" />{c.experience} experience</div>
              <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" />{c.location}</div>
            </div>

            <div className="flex flex-wrap gap-1 mb-4">
              {c.tags.map(tag => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-white bg-opacity-10 text-gray-300">{tag}</span>
              ))}
            </div>

            <div className="flex gap-2">
              <motion.button
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-gradient-to-r from-teal-600 to-purple-600 text-white text-sm font-medium disabled:opacity-50"
                disabled={!c.available}
                whileHover={{ scale: c.available ? 1.03 : 1 }}
                whileTap={{ scale: 0.97 }}
              >
                <MessageCircle className="w-3.5 h-3.5" /> Book Session
              </motion.button>
              <motion.button
                className="p-2 rounded-lg glass-card-hover text-gray-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Award className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <motion.div 
          className="text-center py-16 glass-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Users className="w-12 h-12 text-gray-500 mx-auto mb-3" />
          <p className="text-gray-400">No counselors found for "{search}"</p>
          <button 
            onClick={() => setSearch('')}
            className="mt-4 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
          >
            Clear search
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default CounselorsPage;
