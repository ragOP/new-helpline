import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Phone, Sparkles, CheckCircle2, AlertCircle, Shield } from "lucide-react";
import agent from "./assets/pic.png";

export default function BlueFocusPage() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quizStep, setQuizStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showCongrats, setShowCongrats] = useState(false);

  // Fetch content on component mount
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockContent = {
          header: {
            logo: agent,
            brand: "Auto Benefit Helpline"
          },
          urgency: {
            text: "Limited Time: Special rates available for next 48 hours only!",
            badge: "New Rates Available"
          },
          hero: {
            title: "Save Up To $600 Per Year",
            subtitle: "On Your Auto Insurance",
            description: "Join thousands of drivers who've already claimed their lower rates",
            image: agent
          },
          quiz: [
            {
              question: "Are you currently paying more than $100/month for auto insurance?",
              options: ["Yes", "No", "Not sure"]
            },
            {
              question: "Have you had any accidents or violations in the past 3 years?",
              options: ["No accidents", "1 accident", "2+ accidents"]
            }
          ],
          table: {
            title: "See The Savings",
            rows: [
              { feature: "Monthly Payment", before: "$150", after: "$100", savings: "$50" },
              { feature: "Yearly Cost", before: "$1,800", after: "$1,200", savings: "$600" },
              { feature: "Coverage", before: "Basic", after: "Enhanced", savings: "Better" },
              { feature: "Support", before: "Limited", after: "24/7", savings: "Always" }
            ]
          },
          call: {
            phone: "tel:+16197753027",
            text: "CALL (619)-775-3027",
            subtitle: "Speak with a licensed agent now"
          }
        };
        
        setContent(mockContent);
        setError(null);
      } catch (err) {
        setError("Failed to load content. Please try again later.");
        console.error("Error fetching content:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const handleAnswer = (answer) => {
    setAnswers(prev => ({ ...prev, [quizStep]: answer }));
    
    if (quizStep < (content?.quiz?.length || 0) - 1) {
      setTimeout(() => {
        setQuizStep(prev => prev + 1);
      }, 300);
    } else {
      setTimeout(() => {
        setShowCongrats(true);
      }, 500);
    }
  };

  const handleCallClick = () => {
    if (content?.call?.phone) {
      window.location.href = content.call.phone;
    } else {
      window.location.href = 'tel:+16197753027';
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-10 h-10 text-blue-600 mx-auto" />
          </motion.div>
          <p className="text-gray-600 text-sm font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4">
        <div className="text-center space-y-4 max-w-md">
          <p className="text-red-600 text-lg font-semibold">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated Background Elements - Subtle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.03, 0.05, 0.03],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-20 w-64 h-64 bg-blue-400 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.04, 0.03],
            x: [0, -40, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-20 left-20 w-80 h-80 bg-indigo-400 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 bg-blue-600 px-4 sm:px-6 py-4 flex items-center justify-center"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Helpline</h1>
      </motion.header>

      {/* Urgency Flier */}
      {content?.urgency && !showCongrats && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 bg-gradient-to-r from-red-500 via-red-600 to-red-500 text-white py-3 overflow-hidden"
        >
          <div className="flex items-center gap-3 whitespace-nowrap">
            <motion.div
              animate={{
                x: [0, -200],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  duration: 8,
                  ease: "linear"
                }
              }}
              className="flex items-center gap-3"
            >
              <AlertCircle className="w-4 h-4 animate-pulse flex-shrink-0" />
              <span className="text-xs font-black uppercase tracking-wide">
                {content.urgency.text}
              </span>
              <AlertCircle className="w-4 h-4 animate-pulse flex-shrink-0" />
              <span className="text-xs font-black uppercase tracking-wide">
                {content.urgency.text}
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="relative z-10 px-4 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Quiz Section */}
          {!showCongrats && content?.quiz && (
            <AnimatePresence mode="wait">
              {quizStep < content.quiz.length ? (
                <motion.div
                  key={quizStep}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-200"
                >
                  {/* Progress */}
                  <div className="flex justify-center gap-2 mb-6">
                    {content.quiz.map((_, index) => (
                      <div
                        key={index}
                        className={`h-2 rounded-full transition-all ${
                          index <= quizStep
                            ? 'bg-blue-600 w-8'
                            : 'bg-gray-200 w-2'
                        }`}
                      />
                    ))}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900 text-center mb-8">
                    {content.quiz[quizStep].question}
                  </h3>

                  <div className="space-y-3">
                    {content.quiz[quizStep].options.map((option, index) => {
                      const isYes = option.toLowerCase() === 'yes';
                      return (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleAnswer(option)}
                          className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all text-left relative overflow-hidden ${
                            isYes 
                              ? 'bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-amber-500/10 border-2 border-amber-500/50 text-amber-900 hover:border-amber-500 hover:from-amber-500/20 hover:via-amber-400/30 hover:to-amber-500/20 shimmer'
                              : option.toLowerCase() === 'no'
                              ? 'bg-gradient-to-r from-slate-100 to-slate-50 border-2 border-slate-300 text-slate-700 hover:border-slate-400 hover:from-slate-200 hover:to-slate-100'
                              : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 text-gray-700 hover:border-blue-400 hover:from-blue-100 hover:to-indigo-100'
                          }`}
                        >
                          {option}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          )}

          {/* Congratulations Section */}
          {showCongrats && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 sm:p-12 shadow-2xl border border-slate-200 relative overflow-hidden"
            >
              {/* Subtle background pattern */}
              <div className="absolute inset-0 opacity-[0.02]">
                <div className="absolute top-0 right-0 w-96 h-96 bg-slate-900 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
              </div>
              
              <div className="relative z-10 text-center space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 mb-4"
                >
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </motion.div>
                
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3"
                >
                  Qualification Confirmed
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg sm:text-xl text-slate-600 font-medium mb-8 max-w-2xl mx-auto"
                >
                  Based on your responses, you may be eligible for significant savings on your auto insurance.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col items-center gap-4"
                >
                  <motion.a
                    href={content?.call?.phone || 'tel:+16197753027'}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCallClick}
                    className="inline-flex items-center justify-center gap-3 bg-teal-600 hover:bg-teal-700 text-white py-4 sm:py-5 px-8 sm:px-12 rounded-xl font-bold text-lg sm:text-xl shadow-lg hover:shadow-xl transition-all whitespace-nowrap w-full sm:w-auto relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />
                    <span className="relative z-10">{content?.call?.text || "CALL (619)-775-3027"}</span>
                  </motion.a>
                  
                  <p className="text-sm text-slate-500 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>100% Free Consultation • No Credit Card Required</span>
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Badge - Only show if not in quiz */}
          {!showCongrats && content?.urgency?.badge && quizStep === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-300 rounded-full px-4 py-2 shadow-lg">
                <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
                <span className="text-sm font-bold text-blue-800">
                  {content.urgency.badge}
                </span>
              </div>
            </motion.div>
          )}

          {/* Hero Section with Image - Only show if not in quiz/congrats */}
          {!showCongrats && quizStep === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6"
            >
              {/* Hero Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="relative mx-auto w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden shadow-2xl border-4 border-blue-200 cursor-pointer"
              >
                <img
                  src={content?.hero?.image || agent}
                  alt="Hero"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = agent;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
                
                {/* Floating Checkmark */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </motion.div>
              </motion.div>

              {/* Title & Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-tight">
                  {content?.hero?.title || "Save Up To $600 Per Year"}
                </h2>
                <p className="text-xl sm:text-2xl text-gray-700 font-semibold">
                  {content?.hero?.subtitle || "On Your Auto Insurance"}
                </p>
                {content?.hero?.description && (
                  <p className="text-base sm:text-lg text-gray-600 font-medium">
                    {content.hero.description}
                  </p>
                )}
              </motion.div>
            </motion.div>
          )}

          {/* Comparison Table Section - Show after congrats */}
          {showCongrats && content?.table && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-200"
            >
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 text-center mb-6">
                {content.table.title || "See The Savings"}
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left py-3 px-4 text-gray-900 font-bold">Feature</th>
                      <th className="text-center py-3 px-4 text-red-600 font-bold">Before</th>
                      <th className="text-center py-3 px-4 text-green-600 font-bold">After</th>
                      <th className="text-center py-3 px-4 text-yellow-600 font-bold">You Save</th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.table.rows.map((row, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        className="border-b border-gray-100 hover:bg-gray-50 transition"
                      >
                        <td className="py-4 px-4 text-gray-900 font-semibold">{row.feature}</td>
                        <td className="py-4 px-4 text-center">
                          <span className="text-red-600 line-through font-bold">{row.before}</span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="text-green-600 font-black text-lg">{row.after}</span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="text-yellow-600 font-black text-lg">{row.savings}</span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Call Section - Show after congrats */}
          {showCongrats && content?.call && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-center space-y-6 bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 shadow-lg border border-slate-200"
            >
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Ready to Save?
                </h3>
                <p className="text-base sm:text-lg text-slate-600 font-medium">
                  {content.call.subtitle || "Speak with a licensed agent now"}
                </p>
              </div>

              {/* Trust Badge */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-sm text-slate-500 font-medium flex items-center justify-center gap-2"
              >
                <Shield className="w-4 h-4" />
                <span>100% Free • No Credit Card Required</span>
              </motion.p>
            </motion.div>
          )}
        </div>
      </div>

    </div>
  );
}
