import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, Play, FileText, Headphones, Video, Star, Clock, Tag } from 'lucide-react';

const resources = [
  { id: 1, title: 'Understanding Anxiety', category: 'Anxiety', type: 'Article', duration: '5 min read', rating: 4.8, tags: ['anxiety', 'coping'], icon: FileText, color: 'text-blue-400' },
  { id: 2, title: 'Guided Breathing Meditation', category: 'Mindfulness', type: 'Audio', duration: '10 min', rating: 4.9, tags: ['meditation', 'breathing'], icon: Headphones, color: 'text-purple-400' },
  { id: 3, title: 'CBT Techniques for Depression', category: 'Depression', type: 'Article', duration: '8 min read', rating: 4.7, tags: ['depression', 'CBT'], icon: FileText, color: 'text-teal-400' },
  { id: 4, title: 'Sleep Hygiene Masterclass', category: 'Sleep', type: 'Video', duration: '20 min', rating: 4.6, tags: ['sleep', 'wellness'], icon: Video, color: 'text-yellow-400' },
  { id: 5, title: 'Stress Management 101', category: 'Stress', type: 'Article', duration: '6 min read', rating: 4.5, tags: ['stress', 'work'], icon: FileText, color: 'text-red-400' },
  { id: 6, title: 'Body Scan Relaxation', category: 'Mindfulness', type: 'Audio', duration: '15 min', rating: 4.9, tags: ['relaxation', 'body'], icon: Headphones, color: 'text-green-400' },
  { id: 7, title: 'Building Resilience', category: 'Growth', type: 'Video', duration: '25 min', rating: 4.7, tags: ['resilience', 'growth'], icon: Video, color: 'text-orange-400' },
  { id: 8, title: 'Journaling for Mental Health', category: 'Self-Care', type: 'Article', duration: '4 min read', rating: 4.8, tags: ['journaling', 'self-care'], icon: FileText, color: 'text-pink-400' },
];

const categories = ['All', 'Anxiety', 'Depression', 'Mindfulness', 'Sleep', 'Stress', 'Growth', 'Self-Care'];

const LibraryPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeType, setActiveType] = useState('All');

  const filtered = resources.filter(r => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) || r.tags.some(t => t.includes(search.toLowerCase()));
    const matchCat = activeCategory === 'All' || r.category === activeCategory;
    const matchType = activeType === 'All' || r.type === activeType;
    return matchSearch && matchCat && matchType;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        className="glass-card p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
          <BookOpen className="w-9 h-9 text-teal-400" /> Wellness Library
        </h1>
        <p className="text-gray-300 mb-6">Explore curated mental health resources — articles, meditations & videos.</p>

        {/* Premium Search Bar */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-teal-400 transition-colors duration-300 z-10" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search articles, meditations, videos..."
              className="w-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl pl-14 pr-5 py-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-teal-400/60 focus:bg-white/15 hover:bg-white/12 transition-all duration-300 shadow-lg shadow-black/10 selection:bg-teal-400/30 selection:text-gray-800"
              style={{
                color: '#1f2937',
                WebkitTextFillColor: '#1f2937',
                caretColor: '#0d9488'
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

      {/* Filters */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeCategory === cat
                  ? 'bg-gradient-to-r from-teal-500 to-purple-600 text-white'
                  : 'glass-card-hover text-gray-300 hover:text-white'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {['All', 'Article', 'Audio', 'Video'].map(type => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${activeType === type
                  ? 'bg-white bg-opacity-20 text-white'
                  : 'text-gray-400 hover:text-white'
                }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((resource, i) => {
          const Icon = resource.icon;
          return (
            <motion.div
              key={resource.id}
              className="glass-card p-6 cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2.5 rounded-xl bg-white bg-opacity-10 ${resource.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-white bg-opacity-10 text-gray-300">{resource.type}</span>
              </div>
              <h3 className="text-white font-semibold mb-1 group-hover:text-teal-300 transition-colors">{resource.title}</h3>
              <p className="text-gray-400 text-xs mb-3">{resource.category}</p>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{resource.duration}</span>
                <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />{resource.rating}</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-3">
                {resource.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-white bg-opacity-5 text-gray-400">
                    <Tag className="w-2.5 h-2.5" />{tag}
                  </span>
                ))}
              </div>
              <motion.button
                className="mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-white bg-opacity-5 hover:bg-opacity-15 text-white text-sm font-medium transition-all"
                whileTap={{ scale: 0.97 }}
              >
                <Play className="w-3.5 h-3.5" /> Open Resource
              </motion.button>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 glass-card">
          <BookOpen className="w-12 h-12 text-gray-500 mx-auto mb-3" />
          <p className="text-gray-400">No resources found for "{search}"</p>
        </div>
      )}
    </div>
  );
};

export default LibraryPage;
