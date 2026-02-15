import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Loader2, Phone, Sparkles, CheckCircle2, TrendingUp, Clock, Shield } from "lucide-react";
import agent from "./assets/pic.png";

export default function FocusPage() {
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch content on component mount
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        // Simulate API call - replace with your actual endpoint
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Dynamic content structure
        const mockContent = {
          header: {
            logo: agent,
            brand: "Auto Benefit Helpline"
          },
          hero: {
            title: "Save $500+ On Auto Insurance",
            subtitle: "Get your lower rate in just 2 minutes",
            image: agent,
            description: "Join thousands of drivers who've already claimed their savings",
            badge: "New Rates Available"
          },
          stats: [
            { icon: TrendingUp, value: "$500+", label: "Average Savings" },
            { icon: Clock, value: "2 Min", label: "Quick Check" },
            { icon: Shield, value: "100%", label: "Free & Secure" }
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
    if (content?.cta?.phone) {
      window.location.href = content.cta.phone;
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
            <Loader2 className="w-10 h-10 text-[#005e54] mx-auto" />
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
            className="px-6 py-3 bg-[#005e54] text-white rounded-xl font-semibold hover:bg-[#007a6e] transition shadow-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#005e54] via-[#007a6e] to-[#005e54] relative overflow-hidden flex flex-col">
      {/* Animated Background Elements */}
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
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent"></div>
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/20 px-4 sm:px-6 py-4 flex items-center justify-center"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-white/20 rounded-full blur-lg"></div>
            <img 
              src={content?.header?.logo || agent} 
              alt={content?.header?.brand || "Auto Benefit"} 
              className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white/30 shadow-lg"
            />
          </motion.div>
          <h1 className="text-xl sm:text-2xl font-black text-white drop-shadow-lg">
            {content?.header?.brand || "Auto Benefit Helpline"}
          </h1>
        </div>
      </motion.header>

      {/* Main Content - Centered & Focused */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 relative z-10">
        <div className="w-full max-w-lg mx-auto space-y-8 text-center">
          {/* Badge */}
          {content?.hero?.badge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-white animate-pulse" />
              <span className="text-sm font-bold text-white">
                {content.hero.badge}
              </span>
            </motion.div>
          )}

          {/* Title & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight drop-shadow-lg">
              {content?.hero?.title || "Save $500+ On Auto Insurance"}
            </h2>
            <p className="text-xl sm:text-2xl text-white/90 font-semibold drop-shadow-md">
              {content?.hero?.subtitle || "Get your lower rate in just 2 minutes"}
            </p>
            {content?.hero?.description && (
              <p className="text-base sm:text-lg text-white/80 font-medium">
                {content.hero.description}
              </p>
            )}
          </motion.div>

          {/* Hero Image with Glow Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring", delay: 0.3 }}
            className="relative"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-3xl blur-2xl transform scale-110"></div>
            
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
              <div className="aspect-square relative bg-gradient-to-br from-white/10 to-white/5">
                <img
                  src={content?.hero?.image || agent}
                  alt="Auto Benefit"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = agent;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#005e54]/80 via-transparent to-transparent"></div>
                
                {/* Floating Elements */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0],
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
              </div>
            </div>
          </motion.div>

          {/* Stats Row */}
          {content?.stats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-3 sm:gap-4"
            >
              {content.stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-3 sm:p-4 shadow-lg"
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white mx-auto mb-2" />
                    <div className="text-lg sm:text-xl font-black text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-white/80 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* Call Button - Premium & Focused */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="pt-4"
          >
            <motion.a
              href={content?.cta?.phone || 'tel:+16197753027'}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCallClick}
              className="block w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white py-6 sm:py-7 rounded-2xl font-black text-xl sm:text-2xl md:text-3xl shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center gap-4 shimmer relative overflow-hidden border-4 border-yellow-300/50"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/50 to-orange-400/50 opacity-0 hover:opacity-100 transition-opacity"></div>
              
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Phone className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-white flex-shrink-0 relative z-10" />
              </motion.div>
              <span className="relative z-10">{content?.cta?.text || "CALL (619)-775-3027"}</span>
            </motion.a>
            
            {/* Trust Badge */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-sm text-white/80 font-medium mt-3 flex items-center justify-center gap-2"
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
