import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X, CheckCircle } from "lucide-react";

export default function CTALanding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    started: false,
    age: null,
    insured: null,
    payment: null,
  });
  const [time, setTime] = useState(180);
  const [showCTA, setShowCTA] = useState(false);
  const switchNumber = false;

  // Countdown timer
  useEffect(() => {
    if (showCTA && time > 0) {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showCTA, time]);

  // Set Ringba tags when answers are collected
  useEffect(() => {
    if (showCTA && (answers.age || answers.insured)) {
      const setRingbaTags = () => {
        if (window.Ringba) {
          if (answers.age) {
            const ageValue = answers.age.includes("under 65") ? "under_65" : "over_65";
            if (window.Ringba.setTag) {
              window.Ringba.setTag("age", ageValue);
            } else if (window.Ringba.addTag) {
              window.Ringba.addTag("age", ageValue);
            }
          }
          if (answers.insured) {
            const insuredValue = answers.insured === "Yes" ? "yes" : "no";
            if (window.Ringba.setTag) {
              window.Ringba.setTag("insured", insuredValue);
            } else if (window.Ringba.addTag) {
              window.Ringba.addTag("insured", insuredValue);
            }
          }
        } else {
          setTimeout(setRingbaTags, 100);
        }
      };
      setRingbaTags();
    }
  }, [showCTA, answers.age, answers.insured]);

  const handleAnswer = (answer, questionKey) => {
    setAnswers((prev) => ({ ...prev, [questionKey]: answer }));
    
    if (currentStep < steps.length - 1) {
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 400);
    } else {
      setTimeout(() => {
        setShowCTA(true);
      }, 800);
    }
  };

  const handleStart = () => {
    setAnswers((prev) => ({ ...prev, started: true }));
    setCurrentStep(1);
  };

  const handleCallClick = () => {
    if (window.Ringba) {
      if (answers.age) {
        const ageValue = answers.age.includes("under 65") ? "under_65" : "over_65";
        if (window.Ringba.setTag) {
          window.Ringba.setTag("age", ageValue);
        } else if (window.Ringba.addTag) {
          window.Ringba.addTag("age", ageValue);
        }
      }
      if (answers.insured) {
        const insuredValue = answers.insured === "Yes" ? "yes" : "no";
        if (window.Ringba.setTag) {
          window.Ringba.setTag("insured", insuredValue);
        } else if (window.Ringba.addTag) {
          window.Ringba.addTag("insured", insuredValue);
        }
      }
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const steps = [
    {
      id: "age",
      message: "Are you under the age of 65?",
      options: ["Yes, I am under 65", "No, I am over 65"],
      questionKey: "age",
    },
    {
      id: "insured",
      message: "Are you currently insured?",
      options: ["Yes", "No"],
      questionKey: "insured",
    },
    {
      id: "payment",
      message: "Do you pay more than $100/month for your current auto insurance plan?",
      options: ["Yes", "No"],
      questionKey: "payment",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500 rounded-full mix-blend-screen opacity-30 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500 rounded-full mix-blend-screen opacity-30 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-indigo-500 rounded-full mix-blend-screen opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Minimal Top Bar */}
        <div className="px-4 py-3 sm:px-6 sm:py-4 flex justify-between items-center border-b border-white/10">
          <div className="text-sm sm:text-base font-medium">Auto Benefit Helpline</div>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-3 sm:px-4 py-6 sm:py-8 md:py-12">
          <div className="w-full max-w-md mx-auto">
            
            {/* Welcome Screen */}
            {!answers.started && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8"
              >
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight">
                    Save $500<br />On Auto Insurance
                  </h1>
                  <p className="text-xl sm:text-2xl text-gray-300">
                    Quick check to see if you qualify
                  </p>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-6"
                >
                  <div className="flex justify-center gap-6 text-sm sm:text-base text-gray-400">
                    <div>💰 Save $500</div>
                    <div>⚡ 2 Min</div>
                    <div>🔒 Free</div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleStart}
                    className="w-full bg-white text-black py-4 sm:py-5 md:py-6 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg md:text-xl shadow-2xl hover:bg-gray-100 transition active:scale-95"
                  >
                    Start Now
                  </motion.button>
                </motion.div>
              </motion.div>
            )}

            {/* Questions - Full Screen Modal Style */}
            <AnimatePresence mode="wait">
              {answers.started && !showCTA && currentStep > 0 && (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="space-y-8"
                >
                  {/* Progress Dots */}
                  <div className="flex justify-center gap-2">
                    {steps.map((_, index) => (
                      <div
                        key={index}
                        className={`h-2 rounded-full transition-all ${
                          index + 1 <= currentStep
                            ? 'bg-white w-8'
                            : 'bg-white/20 w-2'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Question */}
                  <div className="space-y-6 sm:space-y-8">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center leading-tight px-2">
                      {steps[currentStep - 1].message}
                    </h2>

                    <div className="space-y-3 sm:space-y-4">
                      {steps[currentStep - 1].options?.map((option, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleAnswer(option, steps[currentStep - 1].questionKey)}
                          className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white py-4 sm:py-5 md:py-6 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base md:text-lg hover:bg-white/20 transition-all active:scale-95"
                        >
                          {option}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success & CTA - Super Mobile Friendly */}
            {showCTA && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="text-center space-y-5 sm:space-y-6 md:space-y-8"
              >
                {/* Success Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-2xl"
                >
                  <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
                </motion.div>

                {/* Title Section */}
                <div className="space-y-3 sm:space-y-4">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight px-2">
                    You Qualify! 🎉
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 px-2 leading-relaxed">
                    You're eligible for a reduction on your Auto Insurance Rate
                  </p>
                </div>

                {/* CTA Card */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 space-y-4 sm:space-y-5 md:space-y-6">
                  <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed px-1">
                    Tap the button below to call. You'll be qualified by a licensed agent in minutes 👇
                  </p>

                  {/* Call Button - Mobile Optimized */}
                  <motion.a
                    href={switchNumber ? 'tel:+13236897861' : 'tel:+18336638513'}
                    onClick={handleCallClick}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="block w-full bg-white text-black py-4 sm:py-5 md:py-6 lg:py-8 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-black text-lg sm:text-xl md:text-2xl lg:text-3xl shadow-2xl hover:bg-gray-100 transition active:scale-95"
                  >
                    <span className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4">
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 animate-pulse flex-shrink-0" />
                      <span className="leading-tight text-center sm:text-left">
                        {switchNumber ? "CALL (323)-689-7861" : "CALL (833)-366-8513"}
                      </span>
                    </span>
                  </motion.a>

                  {/* Timer Section */}
                  <div className="space-y-3 sm:space-y-4 pt-2 sm:pt-4">
                    <p className="text-xs sm:text-sm md:text-base text-gray-400 leading-relaxed px-2">
                      Due to high call volume, your agent is waiting for only{" "}
                      <span className="font-bold text-white text-sm sm:text-base md:text-lg lg:text-xl">3 minutes</span>, then your spot will not be reserved.
                    </p>

                    {/* Countdown Timer */}
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                      className="inline-block bg-red-500/20 border-2 border-red-500/50 rounded-xl sm:rounded-2xl px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 lg:py-6"
                    >
                      <p className="text-red-400 font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tabular-nums">
                        {formatTime(time)}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
