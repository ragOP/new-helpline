import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Loader2, Phone, CheckCircle2, XCircle, TrendingDown, TrendingUp, AlertCircle } from "lucide-react";
import agent from "./assets/pic.png";

export default function CompareMobile() {
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
            title: "Save Up To $600 Per Year",
            description: "Compare your current auto insurance rate with your potential new rate. See the savings you could be getting today.",
            image: agent,
            urgency: "Limited Time: Rates available for next 24 hours only!"
          },
          comparison: {
            before: {
              monthly: "$150",
              yearly: "$1,800",
              features: ["Standard coverage", "Basic support", "No discounts"]
            },
            after: {
              monthly: "$100",
              yearly: "$1,200",
              features: ["Enhanced coverage", "24/7 support", "Multiple discounts"]
            },
            savings: {
              monthly: "$50",
              yearly: "$600",
              percentage: "33%"
            }
          },
          testimonial: {
            quote: "I saved $600 per year! The process was so simple and the agent was incredibly helpful.",
            author: "Michael R.",
            location: "Texas",
            savings: "$600/year"
          },
          cta: {
            phone: "tel:+16197753027",
            text: "CALL (619)-775-3027"
          }
        };
        
        setContent(mockContent);
        setError(null);
      } catch (err) {
        setError("Failed to load content. Please try again later.");
        console.error("Error fetching content:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const handleCallClick = () => {
    if (content?.cta?.phone) {
      window.location.href = content.cta.phone;
    } else {
      window.location.href = 'tel:+16197753027';
    }
  };


  if (loading) {
    return (
      <div className="h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-10 h-10 text-[#005e54] mx-auto" />
          </motion.div>
          <p className="text-gray-600 text-sm font-medium">Loading comparison...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4">
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
      {/* Header - Minimal */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-sm border-b border-gray-100 px-4 py-3 flex items-center justify-between sticky top-0 z-40"
      >
        <div className="flex items-center gap-2">
          <img src={agent} alt="Auto Benefit" className="w-8 h-8 rounded-full" />
          <span className="text-sm font-bold text-gray-900">Auto Benefit</span>
        </div>
        <button
          onClick={() => navigate('/')}
          className="text-xs font-semibold text-[#005e54]"
        >
          Home
        </button>
      </motion.header>

      {/* Content Area */}
      <div className="px-4 py-6 space-y-6">
        {/* Hero Section */}
        {content?.hero && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Urgency Flier - Moving Banner */}
            <div className="bg-gradient-to-r from-red-500 via-red-600 to-red-500 text-white py-3 rounded-lg overflow-hidden relative">
              <div className="flex items-center gap-3 whitespace-nowrap">
                <motion.div
                  animate={{
                    x: [0, -200],
                  }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      duration: 8,
                      ease: "linear"
                    }
                  }}
                  className="flex items-center gap-3"
                >
                  <AlertCircle className="w-4 h-4 animate-pulse flex-shrink-0" />
                  <span className="text-xs font-black uppercase tracking-wide">
                    {content.hero.urgency || "Limited Time: Rates available for next 24 hours only!"}
                  </span>
                  <AlertCircle className="w-4 h-4 animate-pulse flex-shrink-0" />
                  <span className="text-xs font-black uppercase tracking-wide">
                    {content.hero.urgency || "Limited Time: Rates available for next 24 hours only!"}
                  </span>
                  <AlertCircle className="w-4 h-4 animate-pulse flex-shrink-0" />
                  <span className="text-xs font-black uppercase tracking-wide">
                    {content.hero.urgency || "Limited Time: Rates available for next 24 hours only!"}
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <div className="aspect-[4/3] relative bg-gradient-to-br from-[#005e54] to-[#007a6e]">
                <img
                  src={content.hero.image || agent}
                  alt="Hero"
                  className="w-full h-full object-cover mix-blend-overlay opacity-80"
                  onError={(e) => {
                    e.target.src = agent;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
            </div>

            {/* Title & Description */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
                {content.hero.title || "Save Up To $600 Per Year"}
              </h1>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                {content.hero.description || "Compare your current auto insurance rate with your potential new rate. See the savings you could be getting today."}
              </p>
            </div>
          </motion.div>
        )}

          {/* Comparison Table */}
          {content?.comparison && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
            >
              {/* Table Header */}
              <div className="grid grid-cols-3 gap-2 bg-gradient-to-r from-[#005e54] to-[#007a6e] text-white p-3">
                <div className="text-xs font-bold">Feature</div>
                <div className="text-xs font-bold text-center">Before</div>
                <div className="text-xs font-bold text-center">After</div>
              </div>

              {/* Monthly Payment Row */}
              <div className="grid grid-cols-3 gap-2 p-3 border-b border-gray-100">
                <div className="text-xs font-semibold text-gray-700 flex items-center">Monthly Payment</div>
                <div className="text-center">
                  <div className="text-sm font-bold text-red-600 flex items-center justify-center gap-1">
                    <XCircle className="w-4 h-4" />
                    {content.comparison.before.monthly}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-green-600 flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    {content.comparison.after.monthly}
                  </div>
                </div>
              </div>

              {/* Yearly Payment Row */}
              <div className="grid grid-cols-3 gap-2 p-3 border-b border-gray-100 bg-gray-50">
                <div className="text-xs font-semibold text-gray-700 flex items-center">Yearly Cost</div>
                <div className="text-center">
                  <div className="text-sm font-bold text-red-600">
                    {content.comparison.before.yearly}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-green-600">
                    {content.comparison.after.yearly}
                  </div>
                </div>
              </div>

              {/* Savings Row */}
              <div className="grid grid-cols-3 gap-2 p-3 bg-gradient-to-r from-green-50 to-emerald-50">
                <div className="text-xs font-bold text-gray-900 flex items-center">You Save</div>
                <div className="text-center">
                  <div className="text-xs text-gray-500 line-through">
                    {content.comparison.before.yearly}
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <TrendingDown className="w-4 h-4 text-green-600" />
                    <span className="text-base font-black text-green-600">
                      {content.comparison.savings.yearly}
                    </span>
                  </div>
                  <div className="text-xs text-green-600 font-semibold">
                    ({content.comparison.savings.percentage} off)
                  </div>
                </div>
              </div>

              {/* Features Comparison */}
              <div className="p-3 space-y-2">
                <div className="text-xs font-bold text-gray-900 mb-2">Features:</div>
                {content.comparison.before.features.map((feature, index) => (
                  <div key={index} className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-gray-600">{feature}</div>
                    <div className="text-center">
                      <XCircle className="w-3 h-3 text-red-400 mx-auto" />
                    </div>
                    <div className="text-center">
                      <CheckCircle2 className="w-3 h-3 text-green-500 mx-auto" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Testimonial Card */}
          {content?.testimonial && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-[#005e54] to-[#007a6e] rounded-2xl p-4 text-white shadow-lg"
            >
              <div className="flex items-start gap-2 mb-3">
                <div className="text-3xl leading-none">"</div>
                <p className="text-sm font-medium leading-relaxed flex-1">
                  {content.testimonial.quote}
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-white/20">
                <div>
                  <div className="font-bold text-sm">{content.testimonial.author}</div>
                  <div className="text-xs text-white/80">{content.testimonial.location}</div>
                </div>
                <div className="bg-white/20 rounded-lg px-3 py-1.5">
                  <div className="text-xs text-white/80">Saved</div>
                  <div className="text-sm font-black">{content.testimonial.savings}</div>
                </div>
              </div>
            </motion.div>
          )}

        {/* Spacer for bottom CTA */}
        <div className="h-24"></div>
      </div>

      {/* Fixed Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-2xl z-50"
      >
        <motion.a
          href={content?.cta?.phone || 'tel:+16197753027'}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCallClick}
          className="w-full bg-gradient-to-r from-[#005e54] to-[#007a6e] text-white py-4 rounded-2xl font-bold text-base shadow-xl flex items-center justify-center gap-2 shimmer relative overflow-hidden"
        >
          <Phone className="w-5 h-5 animate-pulse flex-shrink-0" />
          <span>{content?.cta?.text || "CALL (619)-775-3027"}</span>
        </motion.a>
      </motion.div>
    </div>
  );
}
