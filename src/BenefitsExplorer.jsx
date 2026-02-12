import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { 
  Phone, 
  TrendingUp, 
  Shield, 
  ArrowRight,
  CheckCircle2,
  Gift,
  Target,
  Building2,
  FileCheck,
  Users
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
      icon: FileCheck,
      title: "Instant Eligibility",
      description: "Check your qualification in under 60 seconds",
      savings: "₹5,000",
      color: "from-blue-600 to-blue-700",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: TrendingUp,
      title: "Government Discounts",
      description: "Unlock hidden government benefit programs",
      savings: "+₹8,000",
      color: "from-slate-700 to-slate-800",
      bgColor: "bg-slate-50",
      borderColor: "border-slate-200"
    },
    {
      icon: Shield,
      title: "Family Bonus",
      description: "Maximum savings for your entire family",
      savings: "+₹12,000",
      color: "from-teal-600 to-teal-700",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200"
    }
  ];

  const features = [
    { icon: CheckCircle2, text: "100% Free Eligibility Check" },
    { icon: CheckCircle2, text: "Licensed & Verified Agents" },
    { icon: CheckCircle2, text: "12,000+ Families Helped" },
    { icon: CheckCircle2, text: "Secure & Private" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 relative overflow-hidden">
      {/* Subtle Professional Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-200/30 rounded-full mix-blend-multiply filter blur-3xl"></div>
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
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block mb-6"
              >
                <div className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
                  <Building2 className="w-4 h-4" />
                  <span>Professional Benefits Assessment</span>
                </div>
              </motion.div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
                Discover Your
                <br />
                <span className="text-blue-600">Potential Savings</span>
              </h1>

              <p className="text-xl sm:text-2xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                Unlock up to <span className="font-bold text-blue-600">₹25,000</span> in annual savings
                <br />
                through our comprehensive benefits analysis
              </p>

              {/* Savings Display Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="inline-block"
              >
                <div className="relative bg-white border-2 border-blue-200 rounded-2xl p-8 sm:p-12 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <div className="text-sm text-slate-500 mb-2 font-medium">Your Potential Annual Savings</div>
                  <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-blue-600 mb-2">
                    ₹{savings.toLocaleString('en-IN')}
                  </div>
                  <div className="text-slate-500">per year</div>
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
                className="group inline-block bg-blue-600 hover:bg-blue-700 text-white px-12 sm:px-16 py-5 sm:py-6 rounded-xl font-semibold text-xl sm:text-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-4 mx-auto"
              >
                <Target className="w-6 h-6 sm:w-8 sm:h-8" />
                <span>Explore My Benefits</span>
                <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 group-hover:translate-x-2 transition-transform" />
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
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-4">
                Your Benefits Analysis
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
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
                    <div className={`relative bg-white border-2 ${benefit.borderColor} rounded-2xl p-8 h-full transform transition-all duration-300 shadow-lg hover:shadow-xl ${hoveredCard === index ? 'scale-105 border-blue-400' : 'scale-100'}`}>
                      <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${benefit.color} mb-6 shadow-md`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                      <p className="text-slate-600 mb-6">{benefit.description}</p>
                      <div className={`text-4xl font-bold bg-gradient-to-r ${benefit.color} bg-clip-text text-transparent`}>
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
              className="bg-white border-2 border-slate-200 rounded-2xl p-8 sm:p-12 shadow-lg"
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
                      className="flex items-center gap-3 text-slate-700"
                    >
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Icon className="w-5 h-5 text-blue-600" />
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
              className="bg-white border-2 border-blue-200 rounded-2xl p-12 sm:p-16 shadow-xl"
            >
              <Target className="w-16 h-16 mx-auto mb-6 text-blue-600" />
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6">
                Ready to Claim Your Savings?
              </h2>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                Your agent is waiting for only{" "}
                <span className="font-bold text-blue-600 text-2xl">3 minutes</span>, then your spot will not be reserved.
              </p>

              <div className="mb-8">
                <div className="inline-block bg-red-50 border-2 border-red-200 rounded-xl px-8 py-6">
                  <p className="text-red-600 font-bold text-5xl sm:text-6xl tabular-nums">
                    {formatTime(time)}
                  </p>
                </div>
              </div>

              <a
                href={switchNumber ? 'tel:+13236897861' : 'tel:+18336638513'}
                onClick={handleCallClick}
                className="group inline-block bg-blue-600 hover:bg-blue-700 text-white px-12 sm:px-16 py-5 sm:py-6 rounded-xl font-semibold text-xl sm:text-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-4 mx-auto"
              >
                <Phone className="w-6 h-6 sm:w-8 sm:h-8" />
                <span>Call Now & Claim Benefits</span>
                <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 group-hover:translate-x-2 transition-transform" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-800 text-slate-300 border-t border-slate-700 text-center py-8 px-4">
          <div className="max-w-6xl mx-auto text-sm">
            <p>&copy; 2026 Auto Benefit Helpline. All rights reserved.</p>
            <p className="mt-2 text-xs text-slate-400">Not affiliated with any government agency. Information for eligibility purposes only.</p>
          </div>
        </footer>
      </div>

    </div>
  );
}
