import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Loader2, Sparkles, TrendingUp, Clock, Shield, Users, CheckCircle2, Zap } from "lucide-react";
import agent from "./assets/pic.png";

export default function MobileLanding() {
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);

  // Fetch content on component mount
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        // Simulate API call - replace with your actual endpoint
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Dynamic content structure
        const mockContent = {
          hero: {
            title: "Save Up To $500",
            subtitle: "On Your Auto Insurance",
            badge: "New Rates Available",
            description: "Join 50,000+ drivers who've already claimed their lower rates"
          },
          stats: [
            { value: "50K+", label: "Happy Customers", icon: Users },
            { value: "2 Min", label: "Quick Check", icon: Clock },
            { value: "100%", label: "Free & Secure", icon: Shield },
            { value: "$500", label: "Average Savings", icon: TrendingUp }
          ],
          benefits: [
            {
              title: "Instant Qualification",
              description: "Answer 3 simple questions in under 2 minutes",
              icon: Zap,
              color: "from-blue-500 to-cyan-500"
            },
            {
              title: "Licensed Agents",
              description: "Get matched with verified insurance professionals",
              icon: Shield,
              color: "from-green-500 to-emerald-500"
            },
            {
              title: "No Obligation",
              description: "Check your eligibility completely free, no strings attached",
              icon: CheckCircle2,
              color: "from-purple-500 to-pink-500"
            }
          ],
          testimonial: {
            quote: "I saved $480 on my auto insurance! The process was so quick and easy.",
            author: "Sarah M.",
            location: "California"
          },
          cta: {
            primary: "Check My Eligibility Now",
            secondary: "See If You Qualify",
            link: "/engsfdq"
          }
        };
        
        setContent(mockContent);
        setError(null);
      } catch (err) {
        setError("Failed to load content. Please try again later.");
        console.error("Error fetching content:", err);
      } finally {
        setLoading(false);
        // Show floating CTA after scroll
        setTimeout(() => setShowFloatingCTA(true), 2000);
      }
    };

    fetchContent();
  }, []);

  // Show floating CTA on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      if (scrollPosition > windowHeight * 0.5) {
        setShowFloatingCTA(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCTAClick = () => {
    if (content?.cta?.link) {
      navigate(content.cta.link);
    } else {
      navigate('/engsfdq');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-10 h-10 text-[#005e54] mx-auto" />
          </motion.div>
          <p className="text-gray-600 text-sm font-medium">Loading your savings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Minimal Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#005e54] to-[#007a6e] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold text-gray-900">Auto Benefit</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCTAClick}
            className="text-xs sm:text-sm font-semibold text-[#005e54] hover:text-[#007a6e] transition"
          >
            Get Started →
          </motion.button>
        </div>
      </motion.header>

      {/* Hero Section - Card Style */}
      <section className="relative px-4 sm:px-6 pt-8 sm:pt-12 pb-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Hero Image Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-6">
              <div className="aspect-[4/3] relative bg-gradient-to-br from-[#005e54] to-[#007a6e]">
                <img
                  src={content?.heroImage || agent}
                  alt="Auto Benefit Helpline"
                  className="w-full h-full object-cover mix-blend-overlay opacity-80"
                  onError={(e) => {
                    e.target.src = agent;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg"
                >
                  <span className="text-xs font-bold text-[#005e54] flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {content?.hero?.badge || "New Rates Available"}
                  </span>
                </motion.div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-4xl sm:text-5xl md:text-6xl font-black mb-3 leading-tight"
                  >
                    {content?.hero?.title || "Save Up To $500"}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-xl sm:text-2xl font-semibold text-gray-100 mb-2"
                  >
                    {content?.hero?.subtitle || "On Your Auto Insurance"}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-sm sm:text-base text-gray-200"
                  >
                    {content?.hero?.description || "Join thousands who've already claimed their lower rates"}
                  </motion.p>
                </div>
              </div>
            </div>

            {/* Primary CTA - Large Card Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCTAClick}
              className="w-full bg-gradient-to-r from-[#005e54] to-[#007a6e] text-white py-5 sm:py-6 rounded-2xl font-bold text-lg sm:text-xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 group"
            >
              <span>{content?.cta?.primary || "Check My Eligibility Now"}</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Stats Grid */}
      {content?.stats && (
        <section className="px-4 sm:px-6 py-6 sm:py-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {content.stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-4 sm:p-5 shadow-md hover:shadow-lg transition-all border border-gray-100"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#005e54] to-[#007a6e] flex items-center justify-center mb-2">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-gray-900 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Benefits Cards */}
      {content?.benefits && (
        <section className="px-4 sm:px-6 py-8 sm:py-12">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl font-black text-center text-gray-900 mb-8"
            >
              Why Choose Us?
            </motion.h2>
            <div className="space-y-4">
              {content.benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="bg-white rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg`}>
                        <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial Card */}
      {content?.testimonial && (
        <section className="px-4 sm:px-6 py-8 sm:py-12">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#005e54] to-[#007a6e] rounded-3xl p-6 sm:p-8 text-white shadow-2xl"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="text-4xl">"</div>
                <p className="text-base sm:text-lg font-medium leading-relaxed flex-1">
                  {content.testimonial.quote}
                </p>
              </div>
              <div className="flex items-center gap-2 pt-4 border-t border-white/20">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold">{content.testimonial.author}</div>
                  <div className="text-sm text-white/80">{content.testimonial.location}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Secondary CTA Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
              Ready to Save?
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              It only takes 2 minutes to check your eligibility. No credit card required.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCTAClick}
              className="bg-gradient-to-r from-[#005e54] to-[#007a6e] text-white px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all"
            >
              {content?.cta?.secondary || "See If You Qualify"}
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4">
            <p className="text-sm sm:text-base">
              &copy; {new Date().getFullYear()} Auto Benefit Helpline. All rights reserved.
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              Not affiliated with any government agency. Information for eligibility purposes only.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm pt-4">
              <a href="/terms" className="hover:text-white transition">Terms</a>
              <a href="/privacy" className="hover:text-white transition">Privacy</a>
              <a href="#contact" className="hover:text-white transition">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating CTA Button */}
      <AnimatePresence>
        {showFloatingCTA && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-6 left-4 right-4 z-50 sm:hidden"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCTAClick}
              className="w-full bg-gradient-to-r from-[#005e54] to-[#007a6e] text-white py-4 rounded-2xl font-bold text-base shadow-2xl flex items-center justify-center gap-2"
            >
              <span>Check Eligibility</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
