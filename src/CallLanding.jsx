import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Phone, Sparkles } from "lucide-react";

export default function CallLanding() {
  const [time, setTime] = useState(180);

  // ---------- Ringba helpers (same pattern as QuestionLanding) ----------
  const pushToRgbaTags = useCallback((obj) => {
    try {
      window._rgba_tags = window._rgba_tags || [];
      window._rgba_tags.push(obj);
      console.log("✅ _rgba_tags push:", obj, "=>", window._rgba_tags);
    } catch (e) {
      console.error("❌ _rgba_tags push error:", e);
    }
  }, []);

  const tryRingbaAPIs = useCallback((key, val) => {
    try {
      if (!window.Ringba) return false;

      // Some Ringba scripts expose different methods depending on setup
      if (typeof window.Ringba.setTag === "function") {
        window.Ringba.setTag(key, val);
        return true;
      }
      if (typeof window.Ringba.addTag === "function") {
        window.Ringba.addTag(key, val);
        return true;
      }
      if (typeof window.Ringba.push === "function") {
        window.Ringba.push(["setTag", key, val]);
        return true;
      }

      // fallback: direct tags object
      window.Ringba.tags = window.Ringba.tags || {};
      window.Ringba.tags[key] = val;
      return true;
    } catch (e) {
      console.error("❌ Ringba API set error:", e);
      return false;
    }
  }, []);

  const setTagBothWays = useCallback((key, val) => {
    // ✅ EXACTLY like QuestionLanding behavior
    pushToRgbaTags({ [key]: val });

    // ✅ Also set directly if Ringba object is available (extra safety)
    tryRingbaAPIs(key, val);
  }, [pushToRgbaTags, tryRingbaAPIs]);

  // Countdown timer
  useEffect(() => {
    if (time > 0) {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [time]);

  const handleCallClick = () => {
    console.log("📞 Call clicked — pushing tags");

    // Same as QuestionLanding approach: push tags at click moment
    // You can add specific tags here if needed
    setTagBothWays("source", "call_landing");

    // Extra: ensure Ringba APIs get the latest on click
    if (window.Ringba) {
      tryRingbaAPIs("source", "call_landing");
    }

    console.log("Current _rgba_tags:", window._rgba_tags);
    console.log("Ringba object:", window.Ringba);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#005e54] via-[#007a6e] to-[#004d44] relative overflow-hidden">
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-[#008a7a] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-1/2 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-[#006b5f] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-[#009688] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Compact Mobile-Friendly Header */}
        <header className="bg-[#005e54]/90 backdrop-blur-sm border-b border-white/10 px-3 py-3 sm:px-6 sm:py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse"></div>
              <h1 className="text-base sm:text-lg md:text-xl font-bold text-white">Auto Benefit Helpline</h1>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-white/90">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm">Verified</span>
            </div>
          </div>
        </header>

        {/* Main Content - Mobile-First Design */}
        <div className="flex-1 flex items-center justify-center px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
          <div className="w-full max-w-2xl mx-auto text-center">
            
            {/* Welcome Message - Mobile Optimized */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 sm:mb-8 md:mb-12"
            >
              <motion.h1
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2"
              >
                Claim Your Lower<br className="hidden sm:block" /> Auto Insurance Rate Today!
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-white/95 text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-xl mx-auto leading-relaxed px-2"
              >
                You're eligible for a reduction on your Auto Insurance Rate! 
                Speak with a licensed agent now to claim your benefits.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/15 backdrop-blur-sm border-2 border-white/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 mb-6 sm:mb-8 max-w-lg mx-auto"
              >
                <p className="text-white font-semibold text-sm sm:text-base md:text-lg leading-relaxed">
                  👇 Tap the button below to make a quick call. You'll be qualified by a licensed agent in minutes
                </p>
              </motion.div>
            </motion.div>

            {/* THE ONE AND ONLY CALL BUTTON - Mobile Optimized */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="mb-6 sm:mb-8 md:mb-12 px-2"
            >
              <motion.a
                href="tel:+16197753027"
                onClick={handleCallClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="block w-full bg-gradient-to-r from-[#10b981] via-[#059669] to-[#047857] text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold py-8 sm:py-10 md:py-12 lg:py-14 px-4 sm:px-6 md:px-8 lg:px-12 rounded-2xl sm:rounded-3xl text-center shadow-2xl hover:from-[#34d399] hover:via-[#10b981] hover:to-[#059669] transition-all duration-300 relative overflow-hidden group border-4 border-white/40 active:scale-95"
              >
                <span className="relative z-10 flex items-center justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                  <Phone className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 animate-pulse flex-shrink-0" />
                  <span className="leading-tight">
                    CALL (619)-775-3027
                  </span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#34d399] to-[#10b981] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                />
              </motion.a>
            </motion.div>

            {/* Timer Warning - Mobile Optimized */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="space-y-4 sm:space-y-6 px-2"
            >
              <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed">
                Due to high call volume, your official agent is waiting for only{" "}
                <span className="font-bold text-white text-lg sm:text-xl md:text-2xl">3 minutes</span>, then your spot will not be reserved.
              </p>

              {/* Countdown Timer - Mobile Friendly */}
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="inline-block bg-red-500/20 backdrop-blur-sm border-2 border-red-400/60 rounded-xl sm:rounded-2xl px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 shadow-lg"
              >
                <p className="text-red-300 font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tabular-nums">
                  {formatTime(time)}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Compact Footer */}
        <footer className="bg-[#005e54]/90 backdrop-blur-sm border-t border-white/10 text-center py-3 sm:py-4 px-4">
          <p className="text-white/70 text-xs sm:text-sm">&copy; 2026 Auto Benefit Helpline. All rights reserved.</p>
        </footer>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(20px, -30px) scale(1.05);
          }
          66% {
            transform: translate(-15px, 15px) scale(0.95);
          }
        }
        .animate-blob {
          animation: blob 8s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        /* Touch-friendly improvements */
        @media (max-width: 640px) {
          a, button {
            -webkit-tap-highlight-color: rgba(255, 255, 255, 0.2);
          }
        }
      `}</style>
    </div>
  );
}
