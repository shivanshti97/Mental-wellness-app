import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, RotateCcw, Smile, Frown, Meh, Zap, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const questions = [
    { id: 1, text: "How would you rate your overall energy level today?", options: ["Very Low", "Low", "Moderate", "High", "Very High"], weights: [-2, -1, 0, 1, 2] },
    { id: 2, text: "How well did you sleep last night?", options: ["Very Poorly", "Poorly", "Okay", "Well", "Very Well"], weights: [-2, -1, 0, 1, 2] },
    { id: 3, text: "How often have you felt anxious or worried today?", options: ["Constantly", "Often", "Sometimes", "Rarely", "Not at all"], weights: [-2, -1, 0, 1, 2] },
    { id: 4, text: "How connected do you feel to people around you?", options: ["Very Isolated", "Somewhat Isolated", "Neutral", "Connected", "Very Connected"], weights: [-2, -1, 0, 1, 2] },
    { id: 5, text: "How motivated are you to do things you usually enjoy?", options: ["Not at all", "Very Little", "Somewhat", "Motivated", "Very Motivated"], weights: [-2, -1, 0, 1, 2] },
    { id: 6, text: "How would you describe your mood right now?", options: ["Very Sad", "Sad", "Neutral", "Happy", "Very Happy"], weights: [-2, -1, 0, 1, 2] },
    { id: 7, text: "Have you experienced any irritability or frustration today?", options: ["Extreme", "A lot", "Some", "Little", "None"], weights: [-2, -1, 0, 1, 2] },
    { id: 8, text: "How well are you able to concentrate on tasks?", options: ["Cannot Focus", "Very Difficult", "Somewhat", "Fairly Well", "Very Well"], weights: [-2, -1, 0, 1, 2] },
    { id: 9, text: "How hopeful do you feel about the future?", options: ["Very Hopeless", "Hopeless", "Uncertain", "Hopeful", "Very Hopeful"], weights: [-2, -1, 0, 1, 2] },
    { id: 10, text: "Have you had any moments of joy or laughter today?", options: ["None at all", "Very Few", "A couple", "Several", "Many"], weights: [-2, -1, 0, 1, 2] },
    { id: 11, text: "How is your appetite today?", options: ["No appetite", "Poor", "Normal", "Good", "Very Good"], weights: [-2, -1, 0, 1, 2] },
    { id: 12, text: "How overwhelmed do you feel by your responsibilities?", options: ["Completely", "Very Much", "Somewhat", "Slightly", "Not at all"], weights: [-2, -1, 0, 1, 2] },
    { id: 13, text: "How satisfied are you with your day so far?", options: ["Very Dissatisfied", "Dissatisfied", "Neutral", "Satisfied", "Very Satisfied"], weights: [-2, -1, 0, 1, 2] },
    { id: 14, text: "Have you been kind to yourself today (self-compassion)?", options: ["Not at all", "Rarely", "Sometimes", "Often", "Always"], weights: [-2, -1, 0, 1, 2] },
    { id: 15, text: "How would you rate your overall mental wellness today?", options: ["Very Poor", "Poor", "Fair", "Good", "Excellent"], weights: [-2, -1, 0, 1, 2] },
];

interface MoodResult {
    mood: string;
    emoji: string;
    color: string;
    gradient: string;
    description: string;
    tips: string[];
    icon: React.ReactNode;
}

const getMoodResult = (score: number): MoodResult => {
    if (score <= -15) return {
        mood: "Distressed", emoji: "😔", color: "#ef4444",
        gradient: "from-red-900 to-red-700",
        description: "You're going through a really tough time right now. Your feelings are valid, and it's okay to ask for help.",
        tips: ["Reach out to a trusted friend or counselor", "Try deep breathing exercises", "Be gentle with yourself today", "Consider using the SOS button if you need immediate support"],
        icon: <Frown className="w-16 h-16" style={{ color: '#ef4444' }} />
    };
    if (score <= -5) return {
        mood: "Sad", emoji: "😢", color: "#f97316",
        gradient: "from-orange-900 to-orange-700",
        description: "You're feeling down today. It's completely normal to have difficult days — this too shall pass.",
        tips: ["Talk to someone you trust", "Go for a short walk outside", "Listen to uplifting music", "Practice self-care rituals"],
        icon: <Frown className="w-16 h-16" style={{ color: '#f97316' }} />
    };
    if (score <= 5) return {
        mood: "Neutral", emoji: "😐", color: "#a78bfa",
        gradient: "from-purple-900 to-blue-800",
        description: "You're in a balanced, neutral state today. A good foundation to build positivity from.",
        tips: ["Try a mindfulness exercise", "Set one small goal for today", "Connect with a friend", "Explore the wellness library"],
        icon: <Meh className="w-16 h-16" style={{ color: '#a78bfa' }} />
    };
    if (score <= 15) return {
        mood: "Happy", emoji: "😊", color: "#34d399",
        gradient: "from-teal-800 to-green-700",
        description: "You're in a good mood today! Keep nurturing this positive energy.",
        tips: ["Share your positivity with others", "Channel energy into creative activities", "Practice gratitude journaling", "Help someone who might be struggling"],
        icon: <Smile className="w-16 h-16" style={{ color: '#34d399' }} />
    };
    return {
        mood: "Joyful", emoji: "🌟", color: "#fbbf24",
        gradient: "from-yellow-700 to-amber-600",
        description: "You're feeling fantastic today! You're radiating positive energy and thriving.",
        tips: ["Celebrate this feeling!", "Use this energy for meaningful activities", "Help uplift others around you", "Document this moment in a journal"],
        icon: <Zap className="w-16 h-16" style={{ color: '#fbbf24' }} />
    };
};

const MoodTrackerPage: React.FC = () => {
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState<number[]>(new Array(15).fill(-1));
    const [completed, setCompleted] = useState(false);
    const [direction, setDirection] = useState(1);
    const { user, updateProfile } = useAuth();

    const totalScore = answers.reduce((sum, a, i) => sum + (a >= 0 ? questions[i].weights[a] : 0), 0);
    const answeredCount = answers.filter(a => a >= 0).length;
    const progress = (answeredCount / 15) * 100;

    const handleAnswer = (optionIndex: number) => {
        const newAnswers = [...answers];
        newAnswers[currentQ] = optionIndex;
        setAnswers(newAnswers);
        if (currentQ < 14) {
            setTimeout(() => {
                setDirection(1);
                setCurrentQ(currentQ + 1);
            }, 300);
        }
    };

    const handleComplete = () => {
        if (answeredCount < 15) return;
        const result = getMoodResult(totalScore);
        if (user) {
            const moodEntry = { date: new Date().toISOString(), mood: result.mood, score: totalScore };
            updateProfile({ moodHistory: [...(user.moodHistory || []), moodEntry] });
        }
        setCompleted(true);
    };

    const handleReset = () => {
        setAnswers(new Array(15).fill(-1));
        setCurrentQ(0);
        setCompleted(false);
    };

    const result = getMoodResult(totalScore);
    const q = questions[currentQ];

    const slideVariants = {
        enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
    };

    if (completed) {
        return (
            <div className="space-y-8 max-w-2xl mx-auto">
                <motion.div
                    className="glass-card p-10 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                        className="mb-6"
                    >
                        {result.icon}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <p className="text-6xl mb-4">{result.emoji}</p>
                        <h1 className="text-4xl font-bold text-white mb-2">
                            You're feeling <span style={{ color: result.color }}>{result.mood}</span>
                        </h1>
                        <p className="text-gray-300 text-lg mb-8 max-w-md mx-auto">{result.description}</p>

                        {/* Score bar */}
                        <div className="mb-8">
                            <div className="flex justify-between text-xs text-gray-400 mb-2">
                                <span>Distressed</span>
                                <span>Score: {totalScore > 0 ? '+' : ''}{totalScore}</span>
                                <span>Joyful</span>
                            </div>
                            <div className="h-3 bg-white bg-opacity-10 rounded-full overflow-hidden">
                                <motion.div
                                    className={`h-full rounded-full bg-gradient-to-r ${result.gradient}`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${((totalScore + 30) / 60) * 100}%` }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                />
                            </div>
                        </div>

                        {/* Tips */}
                        <div className="glass-card p-6 text-left mb-8">
                            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                                <Heart className="w-5 h-5 text-pink-400" /> Personalized Tips for You
                            </h3>
                            <ul className="space-y-3">
                                {result.tips.map((tip, i) => (
                                    <motion.li
                                        key={i}
                                        className="flex items-start gap-3 text-gray-300 text-sm"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.6 + i * 0.1 }}
                                    >
                                        <span className="w-6 h-6 rounded-full bg-teal-500 bg-opacity-30 flex items-center justify-center text-teal-400 text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                                        {tip}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        <motion.button
                            onClick={handleReset}
                            className="flex items-center gap-2 mx-auto px-6 py-3 rounded-lg glass-card-hover text-white font-medium"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <RotateCcw className="w-4 h-4" /> Take Again
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-2xl mx-auto">
            {/* Header */}
            <motion.div
                className="glass-card p-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold text-white mb-1">🧠 Mood Tracker</h1>
                <p className="text-gray-400 text-sm">Answer 15 questions to discover your current emotional state</p>

                {/* Progress */}
                <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-2">
                        <span>Question {currentQ + 1} of 15</span>
                        <span>{answeredCount} answered</span>
                    </div>
                    <div className="h-2 bg-white bg-opacity-10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-teal-500 to-purple-500"
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </div>
            </motion.div>

            {/* Question Card */}
            <div className="relative overflow-hidden" style={{ minHeight: '380px' }}>
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={currentQ}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="glass-card p-8 absolute inset-0"
                    >
                        {/* Question number badge */}
                        <div className="inline-flex items-center gap-2 bg-teal-500 bg-opacity-20 text-teal-400 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                            Q{currentQ + 1}
                        </div>

                        <h2 className="text-xl font-semibold text-white mb-6 leading-relaxed">{q.text}</h2>

                        <div className="space-y-3">
                            {q.options.map((option, i) => (
                                <motion.button
                                    key={i}
                                    id={`q${currentQ + 1}-option-${i}`}
                                    onClick={() => handleAnswer(i)}
                                    className={`w-full text-left px-5 py-3 rounded-xl border transition-all font-medium text-sm ${answers[currentQ] === i
                                            ? 'bg-teal-500 bg-opacity-30 border-teal-400 text-white'
                                            : 'bg-white bg-opacity-5 border-white border-opacity-10 text-gray-300 hover:bg-white hover:bg-opacity-10 hover:border-white hover:border-opacity-20 hover:text-white'
                                        }`}
                                    whileHover={{ x: 4 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className="inline-block w-6 h-6 rounded-full border border-current mr-3 text-center text-xs leading-5">
                                        {String.fromCharCode(65 + i)}
                                    </span>
                                    {option}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation */}
            <motion.div
                className="flex items-center justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <motion.button
                    onClick={() => { setDirection(-1); setCurrentQ(Math.max(0, currentQ - 1)); }}
                    disabled={currentQ === 0}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg glass-card-hover text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed font-medium text-sm"
                    whileHover={{ scale: currentQ === 0 ? 1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <ChevronLeft className="w-4 h-4" /> Previous
                </motion.button>

                {currentQ < 14 ? (
                    <motion.button
                        onClick={() => { setDirection(1); setCurrentQ(Math.min(14, currentQ + 1)); }}
                        disabled={answers[currentQ] < 0}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-teal-600 to-purple-600 text-white disabled:opacity-30 disabled:cursor-not-allowed font-medium text-sm"
                        whileHover={{ scale: answers[currentQ] < 0 ? 1 : 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Next <ChevronRight className="w-4 h-4" />
                    </motion.button>
                ) : (
                    <motion.button
                        onClick={handleComplete}
                        disabled={answeredCount < 15}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-teal-500 to-purple-600 text-white font-semibold disabled:opacity-30 disabled:cursor-not-allowed"
                        whileHover={{ scale: answeredCount < 15 ? 1 : 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Zap className="w-4 h-4" /> See My Mood Result
                    </motion.button>
                )}
            </motion.div>

            {/* Question dots */}
            <div className="flex flex-wrap justify-center gap-2">
                {questions.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => { setDirection(i > currentQ ? 1 : -1); setCurrentQ(i); }}
                        className={`w-7 h-7 rounded-full text-xs font-medium transition-all ${i === currentQ
                                ? 'bg-teal-500 text-white scale-110'
                                : answers[i] >= 0
                                    ? 'bg-purple-500 bg-opacity-60 text-white'
                                    : 'bg-white bg-opacity-10 text-gray-400'
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MoodTrackerPage;
