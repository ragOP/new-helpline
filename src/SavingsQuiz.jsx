import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Phone, 
  TrendingUp, 
  Shield, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  DollarSign,
  Star,
  Award,
  Zap
} from "lucide-react";

const questions = [
  {
    id: 1,
    question: "What's your current monthly auto insurance cost?",
    options: [
      { text: "Under $100", value: "low", savings: 150 },
      { text: "$100 - $200", value: "medium", savings: 300 },
      { text: "$200 - $300", value: "high", savings: 450 },
      { text: "Over $300", value: "very-high", savings: 600 }
    ],
    icon: DollarSign
  },
  {
    id: 2,
    question: "How long have you been with your current insurer?",
    options: [
      { text: "Less than 1 year", value: "new", savings: 200 },
      { text: "1-3 years", value: "medium", savings: 350 },
      { text: "3-5 years", value: "long", savings: 400 },
      { text: "Over 5 years", value: "very-long", savings: 550 }
    ],
    icon: Clock
  },
  {
    id: 3,
    question: "What's your driving record like?",
    options: [
      { text: "Perfect - No accidents or tickets", value: "perfect", savings: 500 },
      { text: "Good - 1-2 minor incidents", value: "good", savings: 350 },
      { text: "Fair - A few incidents", value: "fair", savings: 250 },
      { text: "Needs improvement", value: "poor", savings: 150 }
    ],
    icon: Shield
  },
  {
    id: 4,
    question: "What type of coverage are you looking for?",
    options: [
      { text: "Full coverage", value: "full", savings: 400 },
      { text: "Comprehensive", value: "comprehensive", savings: 300 },
      { text: "Liability only", value: "liability", savings: 200 },
      { text: "Not sure", value: "unsure", savings: 250 }
    ],
    icon: Shield
  },
  {
    id: 5,
    question: "How many vehicles do you need to insure?",
    options: [
      { text: "1 vehicle", value: "single", savings: 300 },
      { text: "2 vehicles", value: "two", savings: 500 },
      { text: "3+ vehicles", value: "multiple", savings: 700 },
      { text: "Commercial fleet", value: "fleet", savings: 1000 }
    ],
    icon: TrendingUp
  }
];

export default function SavingsQuiz() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [totalSavings, setTotalSavings] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleAnswer = (option) => {
    setSelectedOption(option);
    
    // Add animation delay before moving to next question
    setTimeout(() => {
      const newAnswers = [...answers, option];
      setAnswers(newAnswers);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        // Calculate total savings
        const savings = newAnswers.reduce((sum, answer) => sum + answer.savings, 0);
        setTotalSavings(savings);
        setShowResult(true);
      }
    }, 500);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];
  const Icon = currentQ?.icon || DollarSign;

  const handleCallClick = () => {
    window.location.href = 'tel:+16197753027';
  };

  const getSavingsTier = (savings) => {
    if (savings >= 600) return { tier: "Champion", color: "from-yellow-400 to-orange-500", emoji: "🏆" };
    if (savings >= 450) return { tier: "Expert", color: "from-purple-500 to-pink-500", emoji: "⭐" };
    if (savings >= 300) return { tier: "Saver", color: "from-blue-500 to-cyan-500", emoji: "💎" };
    return { tier: "Starter", color: "from-green-500 to-emerald-500", emoji: "🌟" };
  };

  if (showResult) {
    const tier = getSavingsTier(totalSavings);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#005e54] via-[#007a6e] to-[#005e54] relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 right-20 w-64 h-64 bg-white rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 px-4 py-8 sm:py-12">
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Result Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="inline-block"
              >
                <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${tier.color} flex items-center justify-center shadow-2xl`}>
                  <span className="text-5xl">{tier.emoji}</span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl font-black text-white"
              >
                You're a {tier.tier} Saver!
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="space-y-4"
              >
                <div className="text-6xl sm:text-7xl md:text-8xl font-black text-white">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    ${totalSavings}
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-3xl sm:text-4xl"
                  >
                    +
                  </motion.span>
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-xl sm:text-2xl text-white/90 font-semibold"
                >
                  Potential Annual Savings
                </motion.p>
              </motion.div>
            </motion.div>

            {/* Savings Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl p-6 space-y-4"
            >
              <h3 className="text-xl font-bold text-white text-center">Your Savings Breakdown</h3>
              <div className="space-y-3">
                {answers.map((answer, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4 + index * 0.1 }}
                    className="flex items-center justify-between bg-white/5 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                      <span className="text-white font-medium">{questions[index].question}</span>
                    </div>
                    <span className="text-green-400 font-bold text-lg">+${answer.savings}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
              className="space-y-4"
            >
              <motion.a
                href="tel:+16197753027"
                onClick={handleCallClick}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="block w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white py-6 sm:py-7 rounded-2xl font-black text-xl sm:text-2xl shadow-2xl flex items-center justify-center gap-4 overflow-hidden relative"
              >
                <motion.div
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
                <Phone className="w-7 h-7 sm:w-8 sm:h-8 relative z-10" />
                <span className="relative z-10">CALL (619)-775-3027</span>
              </motion.a>

              <motion.button
                onClick={() => {
                  setCurrentQuestion(0);
                  setAnswers([]);
                  setShowResult(false);
                  setTotalSavings(0);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white py-4 rounded-xl font-semibold text-lg"
              >
                Take Quiz Again
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#005e54] via-[#007a6e] to-[#005e54] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-20 w-64 h-64 bg-white rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/20 px-4 py-3 flex items-center justify-between"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="text-sm font-semibold text-white/90 hover:text-white transition"
        >
          ← Home
        </motion.button>
        <h1 className="text-lg font-black text-white">Find Your Savings</h1>
        <div className="w-20"></div>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 px-4 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between text-white text-sm font-semibold">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full"
              />
            </div>
          </motion.div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl p-6 sm:p-8 space-y-6"
            >
              {/* Question Icon & Text */}
              <div className="flex items-center gap-4">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-16 h-16 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg"
                >
                  <Icon className="w-8 h-8 text-white" />
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl sm:text-3xl font-black text-white flex-1"
                >
                  {currentQ.question}
                </motion.h2>
              </div>

              {/* Answer Options */}
              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={!isMobile ? { scale: 1.02, x: 5 } : {}}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(option)}
                    className={`w-full text-left p-4 rounded-xl font-semibold text-lg transition-all ${
                      selectedOption === option
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg scale-105'
                        : 'bg-white/10 hover:bg-white/20 text-white border-2 border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option.text}</span>
                      {selectedOption === option && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring" }}
                        >
                          <CheckCircle2 className="w-6 h-6" />
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Encouragement Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <p className="text-white/80 text-sm flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Each answer helps us calculate your perfect savings!</span>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
