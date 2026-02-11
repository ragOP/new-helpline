import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useInView } from "framer-motion";
import { Phone, CheckCircle, Shield, Users, TrendingUp, ArrowDown, Star } from "lucide-react";

export default function CompareLanding() {
  const [totalSavings, setTotalSavings] = useState(0);
  const [time, setTime] = useState(180);
  const switchNumber = false;

  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);

  const section1InView = useInView(section1Ref, { once: true, margin: "-100px" });
  const section2InView = useInView(section2Ref, { once: true, margin: "-100px" });
  const section3InView = useInView(section3Ref, { once: true, margin: "-100px" });
  const section4InView = useInView(section4Ref, { once: true, margin: "-100px" });

  // Animate savings counter as sections come into view
  useEffect(() => {
    if (section1InView && totalSavings < 5000) {
      animateCounter(0, 5000, setTotalSavings);
    }
  }, [section1InView]);

  useEffect(() => {
    if (section2InView && totalSavings < 13000) {
      animateCounter(5000, 13000, setTotalSavings);
    }
  }, [section2InView]);

  useEffect(() => {
    if (section3InView && totalSavings < 25000) {
      animateCounter(13000, 25000, setTotalSavings);
    }
  }, [section3InView]);

  const animateCounter = (start, end, setter) => {
    const duration = 1500;
    const steps = 60;
    const increment = (end - start) / steps;
    let current = start;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current += increment;
      if (step >= steps) {
        setter(end);
        clearInterval(timer);
      } else {
        setter(Math.round(current));
      }
    }, duration / steps);
  };

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

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Savings Tracker - Mobile */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white px-4 py-3 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-xs text-gray-300">Total Savings</div>
          <div className="text-xl font-bold text-green-400">
            ₹{totalSavings.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Sticky Savings Tracker - Desktop */}
      <div className="hidden lg:block fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white px-6 py-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-sm text-gray-300">Your Potential Annual Savings</div>
          <div className="text-3xl font-bold text-green-400">
            ₹{totalSavings.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white pt-16 lg:pt-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 sm:space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Save Up To ₹25,000<br />On Your Coverage Today
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
              Check your eligibility in 60 seconds
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <a
              href={switchNumber ? 'tel:+13236897861' : 'tel:+18336638513'}
              onClick={handleCallClick}
              className="inline-block bg-blue-600 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-lg font-bold text-lg sm:text-xl shadow-xl hover:bg-blue-700 transition"
            >
              Check My Benefits
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="pt-8"
          >
            <ArrowDown className="w-6 h-6 mx-auto text-gray-400 animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* Problem Awareness Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6 mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
              Most Families Overpay 30–40% Every Month
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              You could already qualify for hidden discounts and benefits you're not aware of.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { title: "Hidden Fees", desc: "Unnecessary charges you're paying monthly" },
              { title: "Outdated Plans", desc: "Better rates available for your profile" },
              { title: "Missed Benefits", desc: "Government discounts you may qualify for" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-gray-50 rounded-xl p-6 sm:p-8 border border-gray-200"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefit Reveal Section 1 */}
      <section ref={section1Ref} className="py-16 sm:py-20 md:py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={section1InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Benefit Unlocked
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
              You Already Qualify For
            </h2>
            <div className="text-5xl sm:text-6xl md:text-7xl font-black text-green-600">
              ₹5,000
            </div>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Basic eligibility savings applied to your account
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefit Reveal Section 2 */}
      <section ref={section2Ref} className="py-16 sm:py-20 md:py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={section2InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Additional Discount
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
              Government Discount Unlocked
            </h2>
            <div className="text-5xl sm:text-6xl md:text-7xl font-black text-green-600">
              +₹8,000
            </div>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Additional savings through government benefit programs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefit Reveal Section 3 */}
      <section ref={section3Ref} className="py-16 sm:py-20 md:py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={section3InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Maximum Savings
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
              Family Bonus Applied
            </h2>
            <div className="text-5xl sm:text-6xl md:text-7xl font-black text-green-600">
              +₹12,000
            </div>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Maximum savings achieved with all eligible benefits combined
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section ref={section4Ref} className="py-16 sm:py-20 md:py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-12 sm:space-y-16"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Trusted By Thousands
              </h2>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
              {[
                { number: "12,000+", label: "Families Helped" },
                { number: "100%", label: "Free Eligibility Check" },
                { number: "Secure", label: "Private & Protected" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 text-lg">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-8">
              {[
                { name: "Rajesh K.", text: "Saved ₹22,000 in the first year. Highly recommend!", rating: 5 },
                { name: "Priya M.", text: "Quick process and great savings. Very professional.", rating: 5 },
                { name: "Amit S.", text: "Easy to understand and saved me money immediately.", rating: 5 },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl p-6 border border-gray-200"
                >
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                  <p className="font-semibold text-gray-900">- {testimonial.name}</p>
                </motion.div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 pt-8">
              {[
                { icon: Shield, text: "Licensed Agents" },
                { icon: CheckCircle, text: "Verified Service" },
                { icon: Users, text: "12,000+ Customers" },
              ].map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 text-gray-700"
                >
                  <badge.icon className="w-6 h-6 text-blue-600" />
                  <span className="font-semibold">{badge.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final Summary + CTA */}
      <section className="py-16 sm:py-20 md:py-24 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              You're Eligible To Save<br />₹25,000+ Today
            </h2>
            <p className="text-xl sm:text-2xl text-gray-300">
              Don't miss out on these savings. Claim your benefits now.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <a
              href={switchNumber ? 'tel:+13236897861' : 'tel:+18336638513'}
              onClick={handleCallClick}
              className="inline-block bg-blue-600 text-white px-10 sm:px-16 py-5 sm:py-6 rounded-lg font-bold text-xl sm:text-2xl md:text-3xl shadow-2xl hover:bg-blue-700 transition flex items-center gap-4 mx-auto"
            >
              <Phone className="w-6 h-6 sm:w-8 sm:h-8" />
              <span>Call Now & Claim Benefits</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="pt-8 space-y-4"
          >
            <p className="text-gray-400 text-sm sm:text-base">
              Due to high call volume, your agent is waiting for only{" "}
              <span className="font-bold text-white text-lg sm:text-xl">3 minutes</span>, then your spot will not be reserved.
            </p>
            <div className="inline-block bg-red-500/20 border-2 border-red-500/50 rounded-xl px-8 py-4">
              <p className="text-red-400 font-bold text-3xl sm:text-4xl md:text-5xl tabular-nums">
                {formatTime(time)}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-800 p-4 shadow-2xl">
        <a
          href={switchNumber ? 'tel:+13236897861' : 'tel:+18336638513'}
          onClick={handleCallClick}
          className="block w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg text-center shadow-xl hover:bg-blue-700 transition"
        >
          <span className="flex items-center justify-center gap-2">
            <Phone className="w-5 h-5" />
            <span>Call Now & Claim Benefits</span>
          </span>
        </a>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center text-sm">
          <p>&copy; 2026 Auto Benefit Helpline. All rights reserved.</p>
          <p className="mt-2 text-xs">Not affiliated with any government agency. Information for eligibility purposes only.</p>
        </div>
      </footer>
    </div>
  );
}
