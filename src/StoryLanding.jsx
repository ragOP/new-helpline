import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, CheckCircle, ArrowRight, Sparkles, Quote, Shield, Clock, DollarSign, Users } from "lucide-react";

export default function StoryLanding() {
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
    
    if (currentStep < storySteps.length - 1) {
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 500);
    } else {
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

  const storySteps = [
    {
      type: "story",
      content: "Meet Sarah. She's a working mom, just like many of us, trying to make ends meet every month.",
    },
    {
      type: "story",
      content: "Sarah was paying $150/month for her auto insurance. That's $1,800 a year - money that could go toward her kids' education or family vacations.",
    },
    {
      type: "question",
      message: "Are you under the age of 65?",
      options: ["Yes, I am under 65", "No, I am over 65"],
      questionKey: "age",
      storyContext: "Sarah was 42 when she discovered she could save money. What about you?",
    },
    {
      type: "story",
      content: "Sarah found out she qualified for age-based discounts. This was just the beginning of her savings journey.",
    },
    {
      type: "question",
      message: "Are you currently insured?",
      options: ["Yes", "No"],
      questionKey: "insured",
      storyContext: "Like Sarah, if you're already insured, you might qualify for additional savings.",
    },
    {
      type: "story",
      content: "Because Sarah was already insured, she unlocked even more savings. Her insurance company offered her a loyalty discount she never knew existed.",
    },
    {
      type: "question",
      message: "Do you pay more than $100/month for your current auto insurance plan?",
      options: ["Yes", "No"],
      questionKey: "payment",
      storyContext: "Sarah was paying $150/month. If you're paying over $100, you could be saving hundreds just like she did.",
    },
    {
      type: "story",
      content: "After answering just 3 simple questions, Sarah discovered she could save $500 per year. That's money back in her pocket for things that truly matter.",
    },
    {
      type: "story",
      content: "Sarah made one quick call, spoke with a licensed agent for 5 minutes, and her new lower rate was activated. She's been saving $500 every year since.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#005e54] via-[#007a6e] to-[#005e54]">
      {/* Header */}
      <header className="bg-[#005e54] text-white p-4 shadow-lg sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-base sm:text-lg font-bold">Auto Benefit Helpline</h1>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm hidden sm:inline">Verified</span>
          </div>
        </div>
      </header>

      {/* Welcome Screen */}
      {!answers.started && (
        <section className="min-h-screen flex items-center justify-center px-4 py-12 sm:py-16">
          <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4 sm:space-y-6"
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl border-2 border-white/30">
                <span className="text-5xl sm:text-6xl">👩</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                Meet Sarah, She Saved $500
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
                Follow her story and see how you could save money too
              </p>
            </motion.div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-4">
              {[
                { icon: DollarSign, title: "Save Money", desc: "Up to $500/year" },
                { icon: Clock, title: "Quick Check", desc: "2 minutes" },
                { icon: Shield, title: "100% Free", desc: "No obligation" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20"
                >
                  <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white mx-auto mb-2" />
                  <div className="font-semibold text-sm sm:text-base text-white mb-1">{item.title}</div>
                  <div className="text-xs sm:text-sm text-white/80">{item.desc}</div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="bg-white text-[#005e54] px-8 sm:px-12 py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg shadow-xl hover:bg-gray-100 transition inline-flex items-center gap-3"
            >
              <span>Read Sarah's Story</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>
          </div>
        </section>
      )}

      {/* Story Flow */}
      {answers.started && !showCTA && (
        <div className="min-h-screen py-8 sm:py-12 px-4">
          <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
            <AnimatePresence mode="wait">
              {currentStep > 0 && (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6 sm:space-y-8"
                >
                  {/* Progress Indicator */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex justify-between text-xs sm:text-sm text-white/90 mb-2">
                      <span>Step {currentStep} of {storySteps.length}</span>
                      <span>{Math.round(((currentStep) / storySteps.length) * 100)}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <motion.div
                        className="bg-white h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentStep) / storySteps.length) * 100}%` }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  </div>

                  {/* Story Content */}
                  {storySteps[currentStep - 1].type === "story" ? (
                    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 md:p-10">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#005e54] flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl sm:text-3xl">👩</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm sm:text-base text-[#005e54] font-semibold mb-2">Sarah's Story</div>
                          <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed">
                            {storySteps[currentStep - 1].content}
                          </p>
                        </div>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setCurrentStep((prev) => prev + 1)}
                        className="w-full bg-[#005e54] text-white py-4 sm:py-5 px-6 rounded-xl font-semibold text-base sm:text-lg shadow-md hover:bg-[#007a6e] transition mt-6"
                      >
                        Continue Story →
                      </motion.button>
                    </div>
                  ) : (
                    /* Question Content */
                    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 md:p-10">
                      <div className="space-y-6 sm:space-y-8">
                        {/* Story Context */}
                        <div className="bg-[#005e54]/10 border-l-4 border-[#005e54] p-4 sm:p-5 rounded-lg">
                          <div className="flex items-start gap-3">
                            <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-[#005e54] flex-shrink-0 mt-1" />
                            <p className="text-sm sm:text-base text-[#005e54] italic">
                              {storySteps[currentStep - 1].storyContext}
                            </p>
                          </div>
                        </div>

                        <div>
                          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                            {storySteps[currentStep - 1].message}
                          </h2>

                          <div className="space-y-3 sm:space-y-4">
                            {storySteps[currentStep - 1].options?.map((option, index) => (
                              <motion.button
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleAnswer(option, storySteps[currentStep - 1].questionKey)}
                                className="w-full bg-[#005e54] text-white py-4 sm:py-5 px-6 rounded-xl font-semibold text-sm sm:text-base md:text-lg shadow-md hover:bg-[#007a6e] transition text-left"
                              >
                                {option}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Trust Components - Fill Empty Space */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-4">
                    {[
                      { icon: Users, text: "12,000+ Helped" },
                      { icon: Shield, text: "Licensed Agents" },
                      { icon: CheckCircle, text: "100% Free" },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center"
                      >
                        <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white mx-auto mb-2" />
                        <div className="text-xs sm:text-sm text-white font-semibold">{item.text}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Success & CTA */}
      {showCTA && (
        <section className="min-h-screen bg-gradient-to-br from-[#005e54] to-[#007a6e] text-white py-8 sm:py-12 px-4 flex items-center">
          <div className="max-w-2xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 md:p-12 text-center space-y-6 sm:space-y-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full bg-green-500 flex items-center justify-center"
              >
                <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </motion.div>

              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                  🎉 You're Just Like Sarah!
                </h2>
                <p className="text-xl sm:text-2xl text-white/90">
                  You're eligible for savings up to $500 per year, just like Sarah discovered.
                </p>
              </div>

              <div className="bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-5 sm:p-6 md:p-8">
                <div className="text-white/80 text-sm sm:text-base mb-2">Your Potential Annual Savings</div>
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white">
                  $500
                </div>
                <div className="text-white/70 text-xs sm:text-sm mt-2">per year</div>
              </div>

              <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-4 sm:p-6">
                <p className="text-sm sm:text-base md:text-lg text-white/90">
                  Just like Sarah, make one quick call. You'll be qualified by a licensed agent in minutes 👇
                </p>
              </div>

              {/* Call Button */}
              <motion.a
                href={switchNumber ? 'tel:+13236897861' : 'tel:+18336638513'}
                onClick={handleCallClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="block w-full bg-white text-[#005e54] py-6 sm:py-8 md:py-10 px-6 rounded-xl sm:rounded-2xl font-black text-xl sm:text-2xl md:text-3xl shadow-2xl hover:bg-gray-100 transition"
              >
                <span className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                  <Phone className="w-6 h-6 sm:w-8 sm:h-8 animate-pulse" />
                  <span>{switchNumber ? "CALL (323)-689-7861" : "CALL (833)-366-8513"}</span>
                </span>
              </motion.a>

              <div className="space-y-4 pt-2">
                <p className="text-xs sm:text-sm md:text-base text-white/80">
                  Due to high call volume, your agent is waiting for only{" "}
                  <span className="font-bold text-base sm:text-lg md:text-xl">3 minutes</span>, then your spot will not be reserved.
                </p>

                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="inline-block bg-red-500/20 border-2 border-red-400/50 rounded-2xl px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5"
                >
                  <p className="text-red-300 font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tabular-nums">
                    {formatTime(time)}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
