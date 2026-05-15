import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Brain, Users, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.div
        className="glass-card p-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-5xl md:text-6xl font-bold text-white mb-3"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          MindSpace
        </motion.h1>
        <p className="text-2xl text-teal-300 font-medium mb-4">Your Mental Wellness Companion</p>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Your mental health journey starts here. Get AI-powered guidance, connect with professional counselors, and find support in a caring community.
        </p>
        <Link to="/counselors">
          <motion.button
            className="bg-gradient-to-r from-space-teal to-space-purple px-8 py-4 rounded-lg text-white font-semibold text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </Link>
      </motion.div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: Heart,
            title: 'Crisis Support',
            description: 'Immediate help when you need it most',
            color: 'text-red-400',
          },
          {
            icon: Brain,
            title: 'AI Triage',
            description: 'Smart AI-powered mental health guidance',
            color: 'text-purple-400',
          },
          {
            icon: Users,
            title: 'Counselors',
            description: 'Connect with licensed professionals',
            color: 'text-blue-400',
          },
          {
            icon: BookOpen,
            title: 'Resources',
            description: 'Curated wellness library',
            color: 'text-teal-400',
          },
        ].map((feature, index) => (
          <motion.div
            key={feature.title}
            className="glass-card p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <feature.icon className={`w-12 h-12 mx-auto mb-4 ${feature.color}`} />
            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        className="glass-card p-8 text-center bg-gradient-to-r from-purple-900 to-blue-900 bg-opacity-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-white mb-4">
          You're Not Alone
        </h2>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Join thousands finding their path to wellness. Our platform combines cutting-edge AI with human compassion to support your mental health journey.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/community">
            <motion.button
              className="glass-card-hover px-6 py-3 rounded-lg text-white font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Community
            </motion.button>
          </Link>
          <Link to="/library">
            <motion.button
              className="glass-card-hover px-6 py-3 rounded-lg text-white font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Resources
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;
