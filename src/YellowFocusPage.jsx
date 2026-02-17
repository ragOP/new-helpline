import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Loader2, Phone, Sparkles, CheckCircle2, AlertCircle, ArrowRight, Shield, TrendingUp, Clock, Star, Zap, PartyPopper } from "lucide-react";
import agent from "./assets/pic.png";

export default function YellowFocusPage() {
  const navigate = useNavigate();
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
            brand: "Auto Savings Pro",
            tagline: "Your Trusted Insurance Partner"
          },
          hero: {
            title: "Unlock Your Auto Insurance Savings",
            subtitle: "Discover how much you could save in under 2 minutes",
            description: "Compare rates from top providers and find the best coverage for your needs",
            image: agent,
            highlight: "Average savings of $500+ per year"
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
          benefits: [
            { icon: TrendingUp, text: "Compare Multiple Quotes", color: "from-yellow-400 to-orange-500" },
            { icon: Clock, text: "Quick 2-Minute Process", color: "from-amber-400 to-yellow-500" },
            { icon: Shield, text: "100% Free & Secure", color: "from-yellow-500 to-amber-600" }
          ],
          urgency: {
            text: "Special rates expire in 24 hours - Act now to secure your savings!",
            badge: "Limited Time Offer"
          },
          cta: {
            phone: "tel:+16197753027",
            text: "CALL (619)-775-3027",
            subtitle: "Speak with an expert agent today"
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
    if (content?.cta?.phone) {
      window.location.href = content.cta.phone;
    } else {
      window.location.href = 'tel:+16197753027';
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-gradient-to-br from-yellow-50 to-amber-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-10 h-10 text-yellow-600 mx-auto" />
          </motion.div>
          <p className="text-gray-600 text-sm font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen bg-gradient-to-br from-yellow-50 to-amber-50 flex items-center justify-center px-4">
        <div className="text-center space-y-4 max-w-md">
          <p className="text-red-600 text-lg font-semibold">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-yellow-600 text-white rounded-xl font-semibold hover:bg-yellow-700 transition shadow-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 relative overflow-hidden">
      {/* Animated Background - Graffiti Style Acceleration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360],
            x: [0, 100, -50, 0],
            y: [0, 50, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-10 right-10 w-40 h-40 bg-yellow-300 rounded-full blur-2xl opacity-40"
        />
        <motion.div
          animate={{
            scale: [1, 1.8, 1],
            rotate: [360, 180, 0],
            x: [0, -80, 60, 0],
            y: [0, -40, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="absolute bottom-10 left-10 w-48 h-48 bg-amber-300 rounded-full blur-3xl opacity-30"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 90, 180, 270, 360],
            x: [0, 50, -30, 20, 0],
            y: [0, -30, 40, -20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-1/2 left-1/2 w-32 h-32 bg-orange-300 rounded-full blur-xl opacity-25"
        />
      </div>

      {/* Completely Different Header - Side by Side Layout */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 bg-white shadow-xl border-b-4 border-yellow-400"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Left: Logo with vertical layout */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-yellow-400 rounded-full blur-lg opacity-50"
                />
                <img 
                  src={content?.header?.logo || agent} 
                  alt={content?.header?.brand || "Auto Savings Pro"} 
                  className="relative w-14 h-14 rounded-full border-3 border-yellow-500 shadow-lg"
                />
              </div>
              <div className="hidden sm:block border-l-2 border-yellow-300 pl-3">
                <h1 className="text-lg font-black text-gray-900 leading-tight">
                  {content?.header?.brand || "Auto Savings Pro"}
                </h1>
                <p className="text-xs text-gray-600 font-medium">
                  {content?.header?.tagline || "Your Trusted Insurance Partner"}
                </p>
              </div>
            </div>
            
            {/* Right: Action buttons */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 bg-yellow-100 px-3 py-1.5 rounded-full">
                <Star className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                <span className="text-xs font-black text-yellow-900">4.9</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="text-sm font-bold text-yellow-700 hover:text-yellow-800 transition px-3 py-1.5 rounded-lg hover:bg-yellow-50 flex items-center gap-1"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                <span className="hidden sm:inline">Back</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Urgency Banner */}
      {content?.urgency && !showCongrats && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 text-white py-2.5 overflow-hidden"
        >
          <div className="flex items-center gap-3 whitespace-nowrap">
            <motion.div
              animate={{
                x: [0, -200],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  duration: 10,
                  ease: "linear"
                }
              }}
              className="flex items-center gap-3"
            >
              <Zap className="w-4 h-4 animate-pulse flex-shrink-0" />
              <span className="text-xs font-black uppercase tracking-wide">
                {content.urgency.text}
              </span>
              <Zap className="w-4 h-4 animate-pulse flex-shrink-0" />
              <span className="text-xs font-black uppercase tracking-wide">
                {content.urgency.text}
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="relative z-10 px-4 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Hero Section - Better Image Presentation */}
          {!showCongrats && quizStep === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Badge */}
              {content?.urgency?.badge && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-white rounded-full px-5 py-2.5 shadow-xl border-2 border-yellow-300">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    <span className="text-sm font-black uppercase tracking-wide">
                      {content.urgency.badge}
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Hero Image - Better Presentation with Frame */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="relative"
              >
                {/* Decorative Frame */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 rounded-3xl blur-xl opacity-50 transform rotate-3"></div>
                <div className="relative bg-white rounded-3xl p-4 shadow-2xl border-4 border-yellow-400">
                  <div className="relative rounded-2xl overflow-hidden aspect-square max-w-xs mx-auto">
                    <img
                      src={content?.hero?.image || agent}
                      alt="Hero"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = agent;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/40 via-transparent to-transparent"></div>
                    
                    {/* Floating Elements */}
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-white rounded-full px-3 py-1.5 shadow-lg"
                    >
                      <span className="text-xs font-black">SAVE $500+</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Title & Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center space-y-4"
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                  {content?.hero?.title || "Unlock Your Auto Insurance Savings"}
                </h2>
                <p className="text-lg sm:text-xl text-gray-700 font-bold">
                  {content?.hero?.subtitle || "Discover how much you could save in under 2 minutes"}
                </p>
                {content?.hero?.highlight && (
                  <div className="inline-flex items-center gap-2 bg-yellow-100 border-2 border-yellow-400 rounded-full px-4 py-2">
                    <TrendingUp className="w-5 h-5 text-yellow-700" />
                    <span className="text-sm font-black text-yellow-900">
                      {content.hero.highlight}
                    </span>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}

          {/* Quiz Section */}
          {!showCongrats && content?.quiz && quizStep < content.quiz.length && (
            <AnimatePresence mode="wait">
              <motion.div
                key={quizStep}
                initial={{ opacity: 0, x: 100, rotateY: 90 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -100, rotateY: -90 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-yellow-400"
              >
                {/* Progress */}
                <div className="flex justify-center gap-2 mb-6">
                  {content.quiz.map((_, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`h-3 rounded-full transition-all ${
                        index <= quizStep
                          ? 'bg-gradient-to-r from-yellow-400 to-amber-500 w-10'
                          : 'bg-gray-200 w-3'
                      }`}
                    />
                  ))}
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 text-center mb-8">
                  {content.quiz[quizStep].question}
                </h3>

                <div className="space-y-3">
                  {content.quiz[quizStep].options.map((option, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: index * 0.1, type: "spring" }}
                      whileHover={{ 
                        scale: 1.05, 
                        x: 10,
                        rotate: [0, -2, 2, 0],
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAnswer(option)}
                      className="w-full bg-gradient-to-r from-yellow-50 to-amber-50 border-3 border-yellow-300 text-gray-900 py-5 px-6 rounded-2xl font-black text-lg hover:border-yellow-500 hover:from-yellow-100 hover:to-amber-100 transition-all text-left shadow-lg hover:shadow-xl touch-manipulation"
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {/* Congratulations Section with Mobile-Oriented Buttons */}
          {showCongrats && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-yellow-300 relative overflow-hidden"
            >
              {/* Celebration Effects */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-4 right-4 w-20 h-20 bg-white/30 rounded-full blur-xl"
              />
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [360, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute bottom-4 left-4 w-16 h-16 bg-white/20 rounded-full blur-lg"
              />

              <div className="relative z-10 text-center space-y-6">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="mb-4"
                >
                  <PartyPopper className="w-24 h-24 mx-auto text-white drop-shadow-2xl" />
                </motion.div>
                
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-2"
                >
                  Congratulations! 🎉
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl sm:text-2xl text-white/95 font-bold mb-8"
                >
                  You may qualify for lower rates!
                </motion.p>

                {/* Mobile-Oriented CTA Buttons */}
                <div className="space-y-4">
                  {/* Primary Call Button - Mobile Optimized */}
                  <motion.a
                    href={content?.cta?.phone || 'tel:+16197753027'}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCallClick}
                    className="block w-full bg-white text-yellow-700 py-6 px-6 rounded-2xl font-black text-2xl sm:text-3xl shadow-2xl flex items-center justify-center gap-4 overflow-hidden relative touch-manipulation"
                  >
                    {/* Shimmer */}
                    <motion.div
                      animate={{
                        x: ['-100%', '200%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/50 to-transparent"
                    />
                    
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 360]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="relative z-10"
                    >
                      <Phone className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-700" />
                    </motion.div>
                    <span className="relative z-10">{content?.cta?.text || "CALL (619)-775-3027"}</span>
                  </motion.a>

                  {/* Secondary Button - Mobile Optimized */}
                  <motion.button
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      // Scroll to form or continue
                    }}
                    className="block w-full bg-white/20 backdrop-blur-sm border-3 border-white/50 text-white py-5 px-6 rounded-2xl font-bold text-xl sm:text-2xl hover:bg-white/30 transition-all touch-manipulation"
                  >
                    Continue Online
                  </motion.button>
                </div>

                {/* Trust Indicators - Mobile Friendly */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center justify-center gap-4 sm:gap-6 pt-6 border-t-2 border-white/30 flex-wrap"
                >
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-white" />
                    <span className="text-sm font-bold text-white">Secure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                    <span className="text-sm font-bold text-white">Free</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-white" />
                    <span className="text-sm font-bold text-white">2 Min</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative z-10 bg-gray-900 text-gray-300 py-8 px-4 sm:px-6 border-t-4 border-yellow-500"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm sm:text-base text-center sm:text-left font-semibold">
                &copy; {new Date().getFullYear()} Auto Savings Pro. All rights reserved.
              </p>
              <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left mt-2">
                Licensed insurance comparison service
              </p>
            </div>
            <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6 text-sm">
              <a href="/terms" className="hover:text-yellow-400 transition">Terms</a>
              <a href="/privacy" className="hover:text-yellow-400 transition">Privacy</a>
              <a href="#contact" className="hover:text-yellow-400 transition">Contact</a>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
