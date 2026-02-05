import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
          // Set age tag
          if (answers.age) {
            const ageValue = answers.age.includes("under 65") ? "under_65" : "over_65";
            if (window.Ringba.setTag) {
              window.Ringba.setTag("age", ageValue);
            } else if (window.Ringba.addTag) {
              window.Ringba.addTag("age", ageValue);
            }
          }
          // Set insured tag
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
    // Send tags to Ringba on click
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
      id: "welcome",
      title: "Welcome! 👋",
      message: "Hey there! Emily this side. Let's find out if you qualify for reduction on your Auto Insurance Rate — it's quick and only takes 2 minutes!",
      button: "👉 Yes! Show me how to claim!",
      action: handleStart,
    },
    {
      id: "age",
      title: "Quick Question",
      message: "Are you under the age of 65?",
      options: ["Yes, I am under 65", "No, I am over 65"],
      questionKey: "age",
    },
    {
      id: "insured",
      title: "Almost There",
      message: "Are you currently insured?",
      options: ["Yes", "No"],
      questionKey: "insured",
    },
    {
      id: "payment",
      title: "Last Question",
      message: "Do you pay more than $100/month for your current auto insurance plan?",
      options: ["Yes", "No"],
      questionKey: "payment",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#005e54] via-[#007a6e] to-[#005e54] flex flex-col">
      {/* Header */}
      <div className="bg-[#005e54] text-white p-4 flex items-center gap-2 shadow-lg sticky top-0 z-50">
        <img
          src={agent}
          alt="Agent"
          className="w-10 h-10 rounded-full flex-shrink-0"
        />
        <div className="flex items-center justify-between w-full">
          <div>
            <div className="flex items-center gap-2">
              <p className="font-bold text-sm sm:text-base">Auto Benefit Helpline</p>
              <img src={tick} className="w-4 h-4" style={{ marginLeft: "-6px" }} />
            </div>
            <p className="text-xs sm:text-sm text-gray-200">online</p>
          </div>
          <Phone className="w-5 h-5 text-white flex-shrink-0" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md mx-auto">
          {/* Progress Bar */}
          {answers.started && !showCTA && (
            <div className="mb-6">
              <div className="flex justify-between text-white text-xs mb-2">
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
              className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#005e54] flex items-center justify-center"
              >
                <span className="text-4xl">👋</span>
              </motion.div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Hey there!
              </h1>
              <p className="text-gray-700 mb-6 text-sm sm:text-base leading-relaxed">
                Emily this side. Let's find out if you qualify for reduction on your Auto Insurance Rate — it's quick and only takes 2 minutes!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStart}
                className="w-full bg-[#005e54] text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:bg-[#007a6e] transition"
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
                className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img src={agent} alt="Emily" className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="font-bold text-gray-900">Emily</p>
                    <p className="text-xs text-gray-500">Auto Benefit Helpline</p>
                  </div>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  {steps[currentStep].title}
                </h2>
                <p className="text-gray-700 mb-6 text-sm sm:text-base">
                  {steps[currentStep].message}
                </p>
                <div className="space-y-3">
                  {steps[currentStep].options?.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(option, steps[currentStep].questionKey)}
                      className="w-full bg-[#005e54] text-white py-4 px-6 rounded-xl font-semibold text-base sm:text-lg shadow-md hover:bg-[#007a6e] transition flex items-center justify-between group"
                    >
                      <span>{option}</span>
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition" />
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
              className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="text-center mb-6"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  🎉 Fantastic news!
                </h2>
                <p className="text-gray-700 text-sm sm:text-base">
                  You're one step away from securing lower rate
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-6"
              >
                <p className="text-gray-800 font-semibold text-sm sm:text-base text-center">
                  Based on what you've told me, you're eligible for a reduction on your Auto Insurance Rate!
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6"
              >
                <p className="text-gray-800 font-semibold text-sm sm:text-base text-center">
                  Tap on the button below to make a quick call & that's it. You'll be qualified on the call by a licensed agent in minutes 👇
                </p>
              </motion.div>

              <motion.a
                href={switchNumber ? 'tel:+13236897861' : 'tel:+18336638513'}
                onClick={handleCallClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="block w-full bg-gradient-to-r from-green-500 to-green-600 text-white text-xl font-bold py-5 px-6 rounded-xl text-center shadow-lg hover:shadow-xl transition mb-4 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Phone className="w-6 h-6" />
                  {switchNumber ? "CALL (323)-689-7861" : "CALL (833)-366-8513"}
                </span>
                <div className="absolute inset-0 shimmer"></div>
              </motion.a>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-gray-600 text-center text-xs sm:text-sm mb-2"
              >
                Due to high call volume, your official agent is waiting for only{" "}
                <span className="font-bold">3 minutes</span>, then your spot will not be reserved.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                className="text-red-500 font-bold text-2xl sm:text-3xl text-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                {formatTime(time)}
              </motion.p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#005e54] text-white text-center py-4 px-4 text-xs">
        <p>&copy; 2026 Auto Benefit Helpline. All rights reserved.</p>
      </footer>
    </div>
  );
}
