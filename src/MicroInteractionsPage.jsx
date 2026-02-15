import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Loader2, Phone, Sparkles, TrendingUp, Users, Shield, Clock, CheckCircle2, Zap } from "lucide-react";
import agent from "./assets/pic.png";

export default function MicroInteractionsPage() {
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredStat, setHoveredStat] = useState(null);
  const [clicked, setClicked] = useState(false);

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
          hero: {
            title: "Save $500+ On Auto Insurance",
            subtitle: "Tap, swipe, and interact to discover your savings",
            image: agent
          },
          stats: [
            { icon: TrendingUp, value: "$500+", label: "Average Savings", color: "from-blue-500 to-cyan-500" },
            { icon: Users, value: "50K+", label: "Happy Customers", color: "from-green-500 to-emerald-500" },
            { icon: Clock, value: "2 Min", label: "Quick Check", color: "from-purple-500 to-pink-500" },
            { icon: Shield, value: "100%", label: "Free & Secure", color: "from-orange-500 to-red-500" }
          ],
          cta: {
            phone: "tel:+16197753027",
            text: "CALL (619)-775-3027"
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

  const handleCallClick = () => {
    setClicked(true);
    setTimeout(() => {
      if (content?.cta?.phone) {
        window.location.href = content.cta.phone;
      } else {
        window.location.href = 'tel:+16197753027';
      }
    }, 300);
  };

  if (loading) {
    return (
      <div className="h-screen bg-gradient-to-br from-[#005e54] to-[#007a6e] flex items-center justify-center">
        <div className="text-center space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-10 h-10 text-white mx-auto" />
          </motion.div>
          <p className="text-white text-sm font-medium">Loading...</p>
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
            className="px-6 py-3 bg-[#005e54] text-white rounded-xl font-semibold hover:bg-[#007a6e] transition shadow-lg"
          >
            Retry
          </button>
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
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
            x: [0, -80, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-20 left-20 w-80 h-80 bg-white rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/20 px-4 py-3 flex items-center justify-between"
      >
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2"
        >
          <img 
            src={content?.header?.logo || agent} 
            alt={content?.header?.brand || "Auto Benefit"} 
            className="w-10 h-10 rounded-full border-2 border-white/30"
          />
          <h1 className="text-lg font-black text-white">Auto Benefit</h1>
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="text-sm font-semibold text-white/90 hover:text-white transition"
        >
          Home
        </motion.button>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 px-4 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            {/* Badge */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2">
                <Sparkles className="w-4 h-4 text-white animate-pulse" />
                <span className="text-sm font-bold text-white">Tap to Interact</span>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              className="relative mx-auto w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden shadow-2xl border-4 border-white/30 cursor-pointer"
            >
              <img
                src={content?.hero?.image || agent}
                alt="Hero"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = agent;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#005e54]/60 to-transparent"></div>
              
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

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight drop-shadow-lg"
            >
              {content?.hero?.title || "Save $500+ On Auto Insurance"}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl sm:text-2xl text-white/90 font-semibold"
            >
              {content?.hero?.subtitle || "Tap, swipe, and interact to discover your savings"}
            </motion.p>
          </motion.div>

          {/* Interactive Stats - Mobile Optimized */}
          {content?.stats && (
            <div className="grid grid-cols-2 gap-4">
              {content.stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.05,
                      y: -5,
                    }}
                    whileTap={{ 
                      scale: 0.95,
                      rotate: [0, -5, 5, 0]
                    }}
                    onHoverStart={() => setHoveredStat(index)}
                    onHoverEnd={() => setHoveredStat(null)}
                    className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl p-6 cursor-pointer relative overflow-hidden group touch-manipulation"
                  >
                    {/* Animated Background */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={hoveredStat === index ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                      className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-20`}
                    />
                    
                    <div className="relative z-10 text-center">
                      <motion.div
                        animate={hoveredStat === index ? { 
                          rotate: 360,
                          scale: 1.2
                        } : { 
                          rotate: 0,
                          scale: 1
                        }}
                        transition={{ duration: 0.5 }}
                        className={`w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </motion.div>
                      <motion.div
                        animate={hoveredStat === index ? { scale: 1.2 } : { scale: 1 }}
                        className="text-3xl sm:text-4xl font-black text-white mb-1"
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-sm font-semibold text-white/80">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Interactive CTA Button - Large & Mobile Friendly */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="space-y-4"
          >
            <motion.h3
              whileHover={{ scale: 1.02 }}
              className="text-2xl sm:text-3xl font-black text-white text-center"
            >
              Ready to Get Started?
            </motion.h3>
            
            <motion.a
              href={content?.cta?.phone || 'tel:+16197753027'}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCallClick}
              animate={clicked ? { 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              } : {}}
              className="block w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white py-6 sm:py-7 rounded-2xl font-black text-xl sm:text-2xl md:text-3xl shadow-2xl flex items-center justify-center gap-4 overflow-hidden relative touch-manipulation"
            >
              {/* Shimmer Effect */}
              <motion.div
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer"
              />
              
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative z-10"
              >
                <Phone className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-white animate-pulse" />
              </motion.div>
              <span className="relative z-10">{content?.cta?.text || "CALL (619)-775-3027"}</span>
              
              {/* Ripple Effect */}
              {clicked && (
                <motion.div
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 4, opacity: 0 }}
                  className="absolute inset-0 bg-white rounded-full"
                />
              )}
            </motion.a>

            <motion.p
              whileHover={{ scale: 1.02 }}
              className="text-sm text-white/80 text-center flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4" />
              <span>100% Free • No Credit Card Required</span>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
