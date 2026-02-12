import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { 
  Phone, 
  Sparkles, 
  TrendingUp, 
  Shield, 
  Zap, 
  Award,
  ArrowRight,
  CheckCircle2,
  Star,
  Gift,
  Target,
  Rocket
} from "lucide-react";

export default function BenefitsExplorer() {
  const [activeCard, setActiveCard] = useState(0);
  const [savings, setSavings] = useState(0);
  const [time, setTime] = useState(180);
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const switchNumber = false;

  // Animate savings counter
  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 100;
      const target = 25000;
      const increment = target / steps;
      let current = 0;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        current += increment;
        if (step >= steps) {
          setSavings(target);
          clearInterval(timer);
        } else {
          setSavings(Math.round(current));
        }
      }, duration / steps);
    }
  }, [isInView]);

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
    if (window.Ringba) {
      // Add any Ringba tags if needed
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const benefits = [
    {
      icon: Gift,
      title: "Instant Eligibility",
      description: "Check your qualification in under 60 seconds",
      savings: "₹5,000",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30"
    },
    {
      icon: TrendingUp,
      title: "Government Discounts",
      description: "Unlock hidden government benefit programs",
      savings: "+₹8,000",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30"
    },
    {
      icon: Shield,
      title: "Family Bonus",
      description: "Maximum savings for your entire family",
      savings: "+₹12,000",
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/30"
    }
  ];

  const features = [
    { icon: CheckCircle2, text: "100% Free Eligibility Check" },
    { icon: CheckCircle2, text: "Licensed & Verified Agents" },
    { icon: CheckCircle2, text: "12,000+ Families Helped" },
    { icon: CheckCircle2, text: "Secure & Private" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/2 w-72 h-72 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => {
          const randomX = typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1920;
          const randomY = typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 1080;
          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              initial={{
                x: randomX,
                y: randomY,
              }}
              animate={{
                y: [null, randomY + (Math.random() - 0.5) * 500],
                x: [null, randomX + (Math.random() - 0.5) * 500],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          );
        })}
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-block mb-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-2xl opacity-50"></div>
                  <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Exclusive Benefits Available</span>
                  </div>
                </div>
              </motion.div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-200 mb-6 leading-tight">
                Discover Your
                <br />
                <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Hidden Savings
                </span>
              </h1>

              <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
                Unlock up to <span className="font-bold text-green-400">₹25,000</span> in annual savings
                <br />
                with our exclusive benefits explorer
              </p>

              {/* Savings Display Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="inline-block"
              >
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                  <div className="relative bg-slate-800/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 sm:p-12 shadow-2xl">
                    <div className="text-sm text-gray-400 mb-2">Your Potential Savings</div>
                    <div className="text-5xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300 mb-2">
                      ₹{savings.toLocaleString('en-IN')}
                    </div>
                    <div className="text-gray-400">per year</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-12"
            >
              <a
                href={switchNumber ? 'tel:+13236897861' : 'tel:+18336638513'}
                onClick={handleCallClick}
                className="group relative inline-block"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white px-12 sm:px-16 py-5 sm:py-6 rounded-2xl font-bold text-xl sm:text-2xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-4">
                  <Rocket className="w-6 h-6 sm:w-8 sm:h-8 animate-bounce" />
                  <span>Explore My Benefits Now</span>
                  <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 group-hover:translate-x-2 transition-transform" />
                </div>
              </a>
            </motion.div>
          </div>
        </section>

        {/* Benefits Cards Section */}
        <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4">
                Your Benefits Journey
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Discover how much you can save with each benefit unlocked
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="relative group cursor-pointer"
                  >
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${benefit.color} rounded-3xl blur-lg opacity-0 group-hover:opacity-75 transition duration-500`}></div>
                    <div className={`relative bg-slate-800/60 backdrop-blur-xl border ${benefit.borderColor} rounded-3xl p-8 h-full transform transition-all duration-300 ${hoveredCard === index ? 'scale-105' : 'scale-100'}`}>
                      <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${benefit.color} mb-6`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">{benefit.title}</h3>
                      <p className="text-gray-300 mb-6">{benefit.description}</p>
                      <div className={`text-4xl font-black bg-gradient-to-r ${benefit.color} bg-clip-text text-transparent`}>
                        {benefit.savings}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="bg-slate-800/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 text-white"
                    >
                      <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-semibold">{feature.text}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-purple-600/20 backdrop-blur-xl border border-white/20 rounded-3xl p-12 sm:p-16"
            >
              <Target className="w-16 h-16 mx-auto mb-6 text-purple-400" />
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6">
                Ready to Claim Your Savings?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Your agent is waiting for only{" "}
                <span className="font-bold text-white text-2xl">3 minutes</span>, then your spot will not be reserved.
              </p>

              <div className="mb-8">
                <div className="inline-block bg-red-500/20 backdrop-blur-sm border-2 border-red-400/60 rounded-2xl px-8 py-6">
                  <p className="text-red-300 font-bold text-5xl sm:text-6xl tabular-nums">
                    {formatTime(time)}
                  </p>
                </div>
              </div>

              <a
                href={switchNumber ? 'tel:+13236897861' : 'tel:+18336638513'}
                onClick={handleCallClick}
                className="group relative inline-block"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                <div className="relative bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white px-12 sm:px-16 py-5 sm:py-6 rounded-2xl font-bold text-xl sm:text-2xl shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-4 mx-auto">
                  <Phone className="w-6 h-6 sm:w-8 sm:h-8 animate-pulse" />
                  <span>Call Now & Claim Benefits</span>
                  <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 group-hover:translate-x-2 transition-transform" />
                </div>
              </a>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900/50 backdrop-blur-xl border-t border-white/10 text-center py-8 px-4">
          <div className="max-w-6xl mx-auto text-gray-400 text-sm">
            <p>&copy; 2026 Auto Benefit Helpline. All rights reserved.</p>
            <p className="mt-2 text-xs">Not affiliated with any government agency. Information for eligibility purposes only.</p>
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
