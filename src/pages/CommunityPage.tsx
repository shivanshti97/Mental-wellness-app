import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Heart, MessageCircle, Share2, Plus, ThumbsUp, Clock } from 'lucide-react';

const posts = [
  { id: 1, author: 'Anonymous Panda', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=panda', time: '2 hours ago', content: "Today was really hard but I made it through. Therapy helped me realize that small wins count. Proud of myself for getting out of bed. 💙", likes: 34, comments: 8, category: 'Victory' },
  { id: 2, author: 'Quiet Storm', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=storm', time: '4 hours ago', content: "Does anyone else feel like anxiety spikes on Sunday evenings? I've been trying the 5-4-3-2-1 grounding technique and it actually helps!", likes: 67, comments: 23, category: 'Tips' },
  { id: 3, author: 'Healing Journey', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=healing', time: '1 day ago', content: "6 months sober today. Never thought I'd say that. This community kept me going on the darkest nights. Thank you all. 🌟", likes: 142, comments: 41, category: 'Milestone' },
  { id: 4, author: 'Mindful Seeker', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mindful', time: '2 days ago', content: "Reminder: You don't have to be productive every day. Rest is also progress. Be kind to yourself today. 🌸", likes: 89, comments: 15, category: 'Reminder' },
];

const categoryColors: Record<string, string> = {
  Victory: 'text-green-400 bg-green-500',
  Tips: 'text-blue-400 bg-blue-500',
  Milestone: 'text-yellow-400 bg-yellow-500',
  Reminder: 'text-pink-400 bg-pink-500',
};

const CommunityPage: React.FC = () => {
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [showNew, setShowNew] = useState(false);
  const [newPost, setNewPost] = useState('');

  const toggleLike = (id: number) => {
    setLiked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <motion.div
        className="glass-card p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
          <MessageSquare className="w-9 h-9 text-purple-400" /> Community
        </h1>
        <p className="text-gray-300 mb-4">A safe, anonymous space to share, support, and heal together.</p>
        <motion.button
          onClick={() => setShowNew(!showNew)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-500 to-purple-600 text-white rounded-lg font-medium text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-4 h-4" /> Share Your Story
        </motion.button>
      </motion.div>

      {/* New post form */}
      {showNew && (
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-teal-400" />
            Share anonymously
          </h3>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
            <textarea
              value={newPost}
              onChange={e => setNewPost(e.target.value)}
              placeholder="What's on your mind? This is a safe space..."
              rows={4}
              className="relative w-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-5 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-purple-400/60 focus:bg-white/15 hover:bg-white/12 transition-all duration-300 resize-none shadow-lg shadow-black/10 selection:bg-purple-400/30 selection:text-gray-800"
              style={{
                color: '#1f2937',
                WebkitTextFillColor: '#1f2937',
                caretColor: '#a855f7'
              }}
              autoComplete="off"
            />
          </div>
          <div className="flex justify-end gap-2 mt-3">
            <button onClick={() => setShowNew(false)} className="px-4 py-2 text-gray-400 text-sm hover:text-white transition-colors">Cancel</button>
            <motion.button
              onClick={() => { setShowNew(false); setNewPost(''); }}
              className="px-5 py-2 bg-gradient-to-r from-teal-500 to-purple-600 text-white rounded-lg text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Post
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Posts */}
      {posts.map((post, i) => (
        <motion.div
          key={post.id}
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="flex items-start gap-3 mb-4">
            <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-teal-600" />
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-white font-medium text-sm">{post.author}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full bg-opacity-20 font-medium ${categoryColors[post.category]}`}>
                  {post.category}
                </span>
              </div>
              <span className="text-gray-500 text-xs flex items-center gap-1 mt-0.5">
                <Clock className="w-3 h-3" />{post.time}
              </span>
            </div>
          </div>

          <p className="text-gray-200 text-sm leading-relaxed mb-4">{post.content}</p>

          <div className="flex items-center gap-4 pt-3 border-t border-white border-opacity-10">
            <motion.button
              onClick={() => toggleLike(post.id)}
              className={`flex items-center gap-1.5 text-sm transition-colors ${liked.has(post.id) ? 'text-pink-400' : 'text-gray-400 hover:text-pink-400'}`}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className={`w-4 h-4 ${liked.has(post.id) ? 'fill-pink-400' : ''}`} />
              {post.likes + (liked.has(post.id) ? 1 : 0)}
            </motion.button>
            <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors">
              <MessageCircle className="w-4 h-4" /> {post.comments}
            </button>
            <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors ml-auto">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CommunityPage;
