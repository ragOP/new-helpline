import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import agent from "./assets/pic.png";
import tick from "./assets/tick2.png";
import { Phone, Check, ArrowRight } from "lucide-react";

export default function QuestionLanding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    started: false,
    age: null,
    insured: null,
    payment: null,
  });
  const [time, setTime] = useState(180);
  const [showCTA, setShowCTA] = useState(false);
  const audioRef = useRef(null);

  // ---------- Ringba helpers (same pattern as CallToActiondq2) ----------
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
    // ✅ EXACTLY like CallToActiondq2 behavior
    pushToRgbaTags({ [key]: val });

    // ✅ Also set directly if Ringba object is available (extra safety)
    tryRingbaAPIs(key, val);
  }, [pushToRgbaTags, tryRingbaAPIs]);

  // Normalize values to match tag pattern
  const derivedTags = useMemo(() => {
    const tags = {};

    if (answers.age) {
      // Age question: "Yes, I am under 65" / "No, I am over 65"
      const ageVal = answers.age.includes("under 65") ? "under_65" : "over_65";
      tags.age = ageVal;
    }

    if (answers.insured) {
      tags.insured = answers.insured === "Yes" ? "yes" : "no";
    }

    if (answers.payment) {
      tags.pay_over_100 = answers.payment === "Yes" ? "yes" : "no";
      // Coverage-like tag similar to CallToActiondq2
      tags.coverage = answers.payment === "Yes" ? "Above-100" : "Below-100";
    }

    return tags;
  }, [answers.age, answers.insured, answers.payment]);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio('/Congo.mp3');
    audio.volume = 1.0;
    audio.preload = 'auto';
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Play audio when congratulations section appears
  useEffect(() => {
    if (showCTA && audioRef.current) {
      const playAudio = async () => {
        try {
          audioRef.current.currentTime = 0; // Reset to start
          await audioRef.current.play();
          console.log("Audio playing successfully");
        } catch (error) {
          console.log("Audio play failed:", error);
          // Retry after a short delay
          setTimeout(() => {
            audioRef.current?.play().catch(err => console.log("Retry failed:", err));
          }, 500);
        }
      };
      
      if (audioRef.current.readyState >= 2) {
        playAudio();
      } else {
        audioRef.current.addEventListener('canplaythrough', playAudio, { once: true });
        audioRef.current.load();
      }
    }
  }, [showCTA]);

  // Countdown timer
  useEffect(() => {
    if (showCTA && time > 0) {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showCTA, time]);

  // ---------- when CTA shows, push tags (like CallToActiondq2 flow) ----------
  useEffect(() => {
    if (!showCTA) return;

    // Push immediately
    Object.entries(derivedTags).forEach(([k, v]) => setTagBothWays(k, v));

    // Also retry for a few seconds in case Ringba loads late
    let retryCount = 0;
    const maxRetries = 50; // ~5 seconds

    const retry = () => {
      retryCount += 1;

      // Only retry Ringba direct APIs; _rgba_tags is already pushed
      if (window.Ringba) {
        Object.entries(derivedTags).forEach(([k, v]) => tryRingbaAPIs(k, v));
        return;
      }

      if (retryCount < maxRetries) {
        setTimeout(retry, 100);
      } else {
        console.warn("Ringba not found after retries. _rgba_tags still pushed.");
      }
    };

    retry();
  }, [showCTA, derivedTags, setTagBothWays, tryRingbaAPIs]);

  const handleAnswer = (answer, questionKey) => {
    setAnswers((prev) => ({ ...prev, [questionKey]: answer }));
    
    // Move to next step
    if (currentStep < steps.length - 1) {
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 300);
    } else {
      // Show CTA after last question
      setTimeout(() => {
        setShowCTA(true);
      }, 1000);
    }
  };

  const handleStart = () => {
    setAnswers((prev) => ({ ...prev, started: true }));
    setCurrentStep(1);
  };

  const handleCallClick = () => {
    console.log("📞 Call clicked — pushing tags again:", derivedTags);

    // Same as CallToActiondq2 approach: push again at click moment
    Object.entries(derivedTags).forEach(([k, v]) => setTagBothWays(k, v));

    // Extra: ensure Ringba APIs get the latest on click
    Object.entries(derivedTags).forEach(([k, v]) => tryRingbaAPIs(k, v));

    console.log("Current _rgba_tags:", window._rgba_tags);
    console.log("Ringba object:", window.Ringba);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const steps = [
    {
      id: "welcome",
      title: "Welcome! 👋",
      message: "Hey there! Emily this side. Let's find out if you qualify for reduction on your Auto Insurance Rate — it's quick and only takes 2 minutes!",
      button: "👉 Yes! Show me how to claim!",
      action: handleStart,
    },
    {
      id: "age",
      title: "1. First Question",
      message: "Are you under the age of 65?",
      options: ["Yes, I am under 65", "No, I am over 65"],
      questionKey: "age",
    },
    {
      id: "insured",
      title: "2. Second Question",
      message: "Are you currently insured?",
      options: ["Yes", "No"],
      questionKey: "insured",
    },
    {
      id: "payment",
      title: "3. Last Question",
      message: "Do you pay more than $100/month for your current auto insurance plan?",
      options: ["Yes", "No"],
      questionKey: "payment",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#005e54] via-[#007a6e] to-[#005e54] flex flex-col">
      {/* Header */}
      <div className="bg-[#005e54] text-white p-4 sm:p-5 md:p-6 flex items-center gap-2 sm:gap-3 shadow-lg sticky top-0 z-50">
        <img
          src={agent}
          alt="Agent"
          className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex-shrink-0"
        />
        <div className="flex items-center justify-between w-full">
          <div>
            <div className="flex items-center gap-2 sm:gap-3">
              <p className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl">Auto Benefit Helpline</p>
              <img src={tick} className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" style={{ marginLeft: "-6px" }} />
            </div>
            <p className="text-sm sm:text-base md:text-lg text-gray-200">online</p>
          </div>
          <Phone className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white flex-shrink-0" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md mx-auto">
          {/* Progress Bar */}
          {answers.started && !showCTA && (
            <div className="mb-6">
              <div className="flex justify-between text-white text-sm mb-2">
                <span>Question {currentStep} of {steps.length - 1}</span>
                <span>{Math.round(((currentStep) / (steps.length - 1)) * 100)}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <motion.div
                  className="bg-white rounded-full h-2"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep) / (steps.length - 1)) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}

          {/* Welcome Screen */}
          {!answers.started && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto mb-4 sm:mb-5 md:mb-6 rounded-full bg-[#005e54] flex items-center justify-center"
              >
                <span className="text-4xl sm:text-5xl md:text-6xl">👋</span>
              </motion.div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6">
                Hey there!
              </h1>
              <p className="text-gray-700 mb-6 sm:mb-8 md:mb-10 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed">
                Let's find out if you qualify for reduction on your Auto Insurance Rate — it's quick and only takes 2 minutes!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStart}
                className="w-full bg-[#005e54] text-white py-8 sm:py-9 md:py-11 px-6 sm:px-10 md:px-14 rounded-xl font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl shadow-lg hover:bg-[#007a6e] transition whitespace-nowrap overflow-hidden text-ellipsis"
              >
                👉 Yes! Show me how to claim!
              </motion.button>
            </motion.div>
          )}

          {/* Questions */}
          <AnimatePresence mode="wait">
            {answers.started && !showCTA && currentStep > 0 && (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10"
              >
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6">
                  <img src={agent} alt="Emily" className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full" />
                  <div>
                    <p className="font-bold text-gray-900 text-base sm:text-lg md:text-xl">Emily</p>
                    <p className="text-sm sm:text-base md:text-lg text-gray-500">Auto Benefit Helpline</p>
                  </div>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">
                  {steps[currentStep].title}
                </h2>
                <p className="text-gray-700 mb-6 sm:mb-8 md:mb-10 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed">
                  {steps[currentStep].message}
                </p>
                <div className="space-y-3 sm:space-y-4 md:space-y-5">
                  {steps[currentStep].options?.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(option, steps[currentStep].questionKey)}
                      className="w-full bg-[#005e54] text-white py-4 sm:py-5 md:py-6 px-6 sm:px-8 md:px-10 rounded-xl font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl shadow-md hover:bg-[#007a6e] transition flex items-center justify-between group"
                    >
                      <span>{option}</span>
                      <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 opacity-0 group-hover:opacity-100 transition" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success & CTA */}
          {showCTA && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="text-center mb-6 sm:mb-8 md:mb-10"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto mb-4 sm:mb-5 md:mb-6 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-green-600" />
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">
                  🎉 Congratulations!
                </h2>
                <p className="text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl">
                  You're one step away from securing lower rate
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-green-50 border-2 border-green-200 rounded-xl p-4 sm:p-5 md:p-6 mb-6 sm:mb-8 md:mb-10"
              >
                <p className="text-gray-800 font-semibold text-base sm:text-lg md:text-xl lg:text-2xl text-center leading-relaxed">
                  Based on what you've told me, you're eligible for a reduction on your Auto Insurance Rate!
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 sm:p-5 md:p-6 mb-6 sm:mb-8 md:mb-10"
              >
                <p className="text-gray-800 font-semibold text-base sm:text-lg md:text-xl lg:text-2xl text-center leading-relaxed">
                  Tap on the button below to make a quick call & that's it. You'll be qualified on the call by a licensed agent in minutes 👇
                </p>
              </motion.div>

              <motion.a
                href="tel:+16197753027"
                onClick={handleCallClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="block w-full bg-gradient-to-r from-green-500 to-green-600 text-white text-2xl sm:text-3xl md:text-4xl font-bold py-5 sm:py-6 md:py-7 px-6 sm:px-8 md:px-10 rounded-xl text-center shadow-lg hover:shadow-xl transition mb-4 sm:mb-6 md:mb-8 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 whitespace-nowrap">
                  <Phone className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                  CALL (619)-775-3027
                </span>
                <div className="absolute inset-0 shimmer"></div>
              </motion.a>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-gray-600 text-center text-sm sm:text-base md:text-lg mb-2 sm:mb-4 md:mb-6"
              >
                Due to high call volume, your official agent is waiting for only{" "}
                <span className="font-bold">3 minutes</span>, then your spot will not be reserved.
              </motion.p>

              <div className="text-center">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="inline-block bg-red-500/20 backdrop-blur-sm border-2 border-red-400/60 rounded-xl sm:rounded-2xl px-6 sm:px-8 md:px-10 lg:px-12 py-4 sm:py-5 md:py-6 lg:py-8 shadow-lg"
                >
                  <p className="text-red-300 font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tabular-nums">
                    {formatTime(time)}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#005e54] text-white text-center py-12 sm:py-16 md:py-20 px-8 sm:px-12 md:px-16 text-sm sm:text-base md:text-lg mt-auto w-full">
        <div className="max-w-7xl mx-auto">
          <p className="mb-6 sm:mb-8 md:mb-10">&copy; 2026 Auto Benefit Helpline. All rights reserved.</p>
          {/* <p className="text-gray-200 text-xs mb-3">
            Helping you find savings on your auto insurance rates.
          </p> */}
          <p className="text-yellow-200 text-xs sm:text-sm md:text-base mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed">
            ⚠️ Beware of other fraudulent & similar-looking websites that might look exactly like ours, we have no affiliation with them. This is the only official website to claim your Auto Insurance Reduction with the domain name mybenefithelpline.org
          </p>
          <div className="flex items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm md:text-base mt-6 sm:mt-8 md:mt-10">
            <Link to="/terms" className="text-gray-200 hover:text-white underline transition">
              Terms & Conditions
            </Link>
            <span className="text-gray-400">|</span>
            <Link to="/privacy" className="text-gray-200 hover:text-white underline transition">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
