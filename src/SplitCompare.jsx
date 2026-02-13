import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ArrowRight, CheckCircle2, TrendingDown, TrendingUp, Calculator } from "lucide-react";

export default function SplitCompare() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    age: null,
    insured: null,
    payment: null,
    coverage: null,
  });
  const [currentCost, setCurrentCost] = useState(15000);
  const [potentialSavings, setPotentialSavings] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const [time, setTime] = useState(180);
  const [showCTA, setShowCTA] = useState(false);

  const switchNumber = false;

  const questions = [
    {
      id: "age",
      question: "Are you under the age of 65?",
      options: ["Yes, I am under 65", "No, I am over 65"],
      impact: { yes: 2000, no: 1000 }
    },
    {
      id: "insured",
      question: "Are you currently insured?",
      options: ["Yes", "No"],
      impact: { yes: 3000, no: 0 }
    },
    {
      id: "payment",
      question: "Do you pay more than $100/month for your current auto insurance?",
      options: ["Yes", "No"],
      impact: { yes: 5000, no: 2000 }
    },
    {
      id: "coverage",
      question: "How long have you been with your current provider?",
      options: ["Less than 1 year", "1-3 years", "More than 3 years"],
      impact: { "Less than 1 year": 3000, "1-3 years": 5000, "More than 3 years": 8000 }
    }
  ];

  // Calculate savings based on answers
  useEffect(() => {
    let savings = 0;
    
    if (answers.age === "Yes, I am under 65") {
      savings += questions[0].impact.yes;
    } else if (answers.age === "No, I am over 65") {
      savings += questions[0].impact.no;
    }

    if (answers.insured === "Yes") {
      savings += questions[1].impact.yes;
    }

    if (answers.payment === "Yes") {
      savings += questions[2].impact.yes;
    } else if (answers.payment === "No") {
      savings += questions[2].impact.no;
    }

    if (answers.coverage) {
      savings += questions[3].impact[answers.coverage] || 0;
    }

    setPotentialSavings(savings);
    setTotalSavings(savings);
  }, [answers]);

  // Animate savings counter
  useEffect(() => {
    if (potentialSavings > 0) {
      const duration = 1000;
      const steps = 50;
      const increment = potentialSavings / steps;
      let current = 0;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        current += increment;
        if (step >= steps) {
          setPotentialSavings(potentialSavings);
          clearInterval(timer);
        } else {
          setPotentialSavings(Math.round(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [totalSavings]);

  // Countdown timer
  useEffect(() => {
    if (showCTA && time > 0) {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showCTA, time]);

  const handleAnswer = (answer, questionId) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    
    if (currentStep < questions.length - 1) {
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 300);
    } else {
      setTimeout(() => {
        setShowCTA(true);
      }, 1000);
    }
  };

  const handleCallClick = () => {
    if (window.Ringba) {
      // Add any Ringba tags if needed
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const newCost = currentCost - potentialSavings;
  const savingsPercentage = currentCost > 0 ? Math.round((potentialSavings / currentCost) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-bold text-slate-900">Savings Calculator</h1>
          </div>
          <div className="text-sm text-slate-600">
            Question {currentStep + 1} of {questions.length}
          </div>
        </div>
      </div>

      {/* Main Split Screen Container */}
      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 min-h-[calc(100vh-200px)]">
          
          {/* Left Side - Current Costs */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl border-2 border-slate-200 p-6 lg:p-8 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Current Costs</h2>
                <p className="text-sm text-slate-600">Your annual insurance</p>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center">
              <div className="text-center mb-8">
                <div className="text-5xl sm:text-6xl lg:text-7xl font-black text-red-600 mb-2">
                  ₹{currentCost.toLocaleString('en-IN')}
                </div>
                <p className="text-slate-600 text-lg">per year</p>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-600">Monthly Premium</span>
                    <span className="font-semibold text-slate-900">₹{Math.round(currentCost / 12).toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-600">Current Provider</span>
                    <span className="font-semibold text-slate-900">Existing Plan</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Potential Savings */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl border-2 border-green-200 p-6 lg:p-8 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Potential Savings</h2>
                <p className="text-sm text-slate-600">With our benefits</p>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center">
              <div className="text-center mb-8">
                <motion.div
                  key={potentialSavings}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-5xl sm:text-6xl lg:text-7xl font-black text-green-600 mb-2"
                >
                  ₹{potentialSavings.toLocaleString('en-IN')}
                </motion.div>
                <p className="text-slate-600 text-lg">
                  {savingsPercentage > 0 ? `${savingsPercentage}% savings` : 'Start answering to see savings'}
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-600">New Monthly Cost</span>
                    <span className="font-semibold text-green-600">
                      ₹{newCost > 0 ? Math.round(newCost / 12).toLocaleString('en-IN') : '0'}
                    </span>
                  </div>
                </div>
                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-600">Annual Savings</span>
                    <span className="font-semibold text-green-600">
                      ₹{potentialSavings.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Middle Questions Section */}
        <div className="mt-8 lg:mt-12">
          <AnimatePresence mode="wait">
            {!showCTA && (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl mx-auto"
              >
                <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-200 p-6 lg:p-8">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-slate-900">
                        {questions[currentStep].question}
                      </h3>
                      <div className="text-sm text-slate-500">
                        {currentStep + 1}/{questions.length}
                      </div>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <motion.div
                        className="bg-blue-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    {questions[currentStep].options.map((option, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswer(option, questions[currentStep].id)}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-between group"
                      >
                        <span>{option}</span>
                        <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA Section */}
          {showCTA && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto mt-8"
            >
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-2xl p-8 text-white text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="mb-6"
                >
                  <CheckCircle2 className="w-16 h-16 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold mb-3">🎉 Congratulations!</h2>
                  <p className="text-xl mb-2">You could save up to</p>
                  <div className="text-5xl font-black mb-4">
                    ₹{totalSavings.toLocaleString('en-IN')}
                  </div>
                  <p className="text-lg opacity-90">
                    per year on your auto insurance!
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-6"
                >
                  <a
                    href={switchNumber ? 'tel:+13236897861' : 'tel:+18336638513'}
                    onClick={handleCallClick}
                    className="inline-block bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto"
                  >
                    <Phone className="w-6 h-6" />
                    <span>Call Now & Claim Benefits</span>
                    <ArrowRight className="w-6 h-6" />
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-4"
                >
                  <p className="text-white/90 text-sm">
                    Your agent is waiting for only{" "}
                    <span className="font-bold text-white text-lg">3 minutes</span>
                  </p>
                  <div className="inline-block bg-red-500/20 border-2 border-red-300 rounded-xl px-6 py-3">
                    <p className="text-red-100 font-bold text-3xl tabular-nums">
                      {formatTime(time)}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      {showCTA && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 p-4 shadow-2xl">
          <a
            href={switchNumber ? 'tel:+13236897861' : 'tel:+18336638513'}
            onClick={handleCallClick}
            className="block w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg text-center shadow-lg flex items-center justify-center gap-2"
          >
            <Phone className="w-5 h-5" />
            <span>Call Now & Claim Benefits</span>
          </a>
        </div>
      )}
    </div>
  );
}
