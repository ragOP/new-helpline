import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Loader2, Phone, ArrowRight, TrendingUp, Clock, Shield, CheckCircle2, Star } from "lucide-react";
import agent from "./assets/pic.png";

export default function EditorialPage() {
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch content on component mount
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockContent = {
          header: {
            logo: agent,
            brand: "Auto Savings Journal",
            date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            tagline: "Your Weekly Guide to Smart Insurance Decisions"
          },
          headline: {
            main: "BREAKING: Drivers Save Average of $500+ Annually",
            subheadline: "New Study Reveals Simple Method to Lower Auto Insurance Rates",
            author: "By Insurance Research Team",
            date: "Published Today"
          },
          hero: {
            image: agent,
            caption: "Thousands of drivers are discovering significant savings on their auto insurance premiums."
          },
          article: {
            paragraphs: [
              "In a groundbreaking study released this week, researchers have identified a simple yet effective method that allows drivers to potentially save hundreds of dollars annually on their auto insurance premiums.",
              "The study, which analyzed over 50,000 insurance policies across multiple states, found that drivers who compare rates from multiple providers can save an average of $500 or more per year. The key, according to experts, is taking just a few minutes to explore available options.",
              "Many drivers remain with their current insurance provider simply because they haven't taken the time to compare alternatives. However, with rates varying significantly between providers, a quick comparison could reveal substantial savings opportunities.",
              "The process is straightforward: enter your ZIP code, answer a few simple questions, and within minutes, you can see available rates from multiple trusted insurance carriers. There's no obligation, and the service is completely free."
            ],
            quote: {
              text: "The difference between what you're paying now and what you could be paying can be significant. It's worth taking a few minutes to check.",
              author: "Sarah Mitchell, Insurance Analyst"
            }
          },
          sidebar: {
            title: "Quick Facts",
            items: [
              { label: "Average Savings", value: "$500+", icon: TrendingUp },
              { label: "Time Required", value: "2 Minutes", icon: Clock },
              { label: "Success Rate", value: "85%", icon: Star },
              { label: "Free Service", value: "100%", icon: Shield }
            ]
          },
          cta: {
            phone: "tel:+16197753027",
            text: "CALL (619)-775-3027",
            subtitle: "Speak with a licensed agent to compare your options"
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
      <div className="h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-10 h-10 text-gray-800 mx-auto" />
          </motion.div>
          <p className="text-gray-600 text-sm font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center space-y-4 max-w-md">
          <p className="text-red-600 text-lg font-semibold">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gray-900 text-white rounded font-semibold hover:bg-gray-800 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-serif">
      {/* Newspaper-Style Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b-4 border-gray-900 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 pb-4 border-b-2 border-gray-300">
            <div className="flex items-center gap-3">
              <img 
                src={content?.header?.logo || agent} 
                alt={content?.header?.brand || "Auto Savings Journal"} 
                className="w-12 h-12 rounded-full border-2 border-gray-900"
              />
              <div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                  {content?.header?.brand || "Auto Savings Journal"}
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 font-medium italic">
                  {content?.header?.tagline || "Your Weekly Guide to Smart Insurance Decisions"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-700">
                {content?.header?.date || new Date().toLocaleDateString()}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="text-xs text-gray-600 hover:text-gray-900 transition mt-1 flex items-center gap-1"
              >
                Home
                <ArrowRight className="w-3 h-3" />
              </motion.button>
            </div>
          </div>

          {/* Newspaper Categories */}
          <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-wider border-t border-gray-300 pt-3">
            <span className="text-gray-900">Insurance</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-900">Savings</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-900">Finance</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-900">Auto</span>
          </div>
        </div>
      </motion.header>

      {/* Main Editorial Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Article Column */}
          <div className="lg:col-span-8">
            {/* Headline Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 border-b-4 border-gray-900 pb-6"
            >
              <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                BREAKING NEWS
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-4 tracking-tight">
                {content?.headline?.main || "BREAKING: Drivers Save Average of $500+ Annually"}
              </h1>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-4 italic">
                {content?.headline?.subheadline || "New Study Reveals Simple Method to Lower Auto Insurance Rates"}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <span className="font-semibold">{content?.headline?.author || "By Insurance Research Team"}</span>
                <span>•</span>
                <span>{content?.headline?.date || "Published Today"}</span>
              </div>
            </motion.div>

            {/* Hero Image with Caption */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className="relative">
                <img
                  src={content?.hero?.image || agent}
                  alt="Article"
                  className="w-full h-auto object-cover rounded-sm border-2 border-gray-900 shadow-lg"
                  onError={(e) => {
                    e.target.src = agent;
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3 text-xs font-medium">
                  {content?.hero?.caption || "Thousands of drivers are discovering significant savings on their auto insurance premiums."}
                </div>
              </div>
            </motion.div>

            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="prose prose-lg max-w-none"
            >
              {content?.article?.paragraphs?.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-lg sm:text-xl leading-relaxed mb-6 text-gray-800 font-serif"
                  style={{ textAlign: 'justify' }}
                >
                  {paragraph}
                </motion.p>
              ))}

              {/* Pull Quote */}
              {content?.article?.quote && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="border-l-4 border-gray-900 pl-6 py-4 my-8 bg-gray-50"
                >
                  <blockquote className="text-2xl sm:text-3xl font-bold italic text-gray-900 mb-3 leading-tight">
                    "{content.article.quote.text}"
                  </blockquote>
                  <cite className="text-sm font-semibold text-gray-600 not-italic">
                    — {content.article.quote.author}
                  </cite>
                </motion.div>
              )}
            </motion.div>

            {/* Call-to-Action Section - Editorial Style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-12 p-8 bg-gray-900 text-white border-4 border-gray-900"
            >
              <div className="text-center space-y-6">
                <div className="space-y-2">
                  <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
                    Ready to Compare Your Rates?
                  </h3>
                  <p className="text-lg sm:text-xl text-gray-300 font-medium">
                    {content?.cta?.subtitle || "Speak with a licensed agent to compare your options"}
                  </p>
                </div>

                <motion.a
                  href={content?.cta?.phone || 'tel:+16197753027'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCallClick}
                  className="inline-block bg-white text-gray-900 py-5 px-10 rounded-none font-black text-xl sm:text-2xl uppercase tracking-wider border-4 border-white hover:bg-gray-100 transition-all shadow-lg"
                >
                  <div className="flex items-center justify-center gap-3">
                    <Phone className="w-6 h-6" />
                    <span>{content?.cta?.text || "CALL (619)-775-3027"}</span>
                  </div>
                </motion.a>

                <p className="text-sm text-gray-400 italic">
                  Free service. No obligation. Licensed agents available.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="sticky top-8"
            >
              {/* Quick Facts Box */}
              {content?.sidebar && (
                <div className="bg-gray-100 border-2 border-gray-900 p-6 mb-6">
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-6 border-b-2 border-gray-900 pb-3">
                    {content.sidebar.title || "Quick Facts"}
                  </h3>
                  <div className="space-y-4">
                    {content.sidebar.items.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          className="flex items-center justify-between border-b border-gray-300 pb-3 last:border-0 last:pb-0"
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="w-5 h-5 text-gray-700" />
                            <span className="font-semibold text-gray-800">{item.label}</span>
                          </div>
                          <span className="font-black text-xl text-gray-900">{item.value}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Related Articles Box */}
              <div className="bg-white border-2 border-gray-900 p-6">
                <h3 className="text-xl font-black uppercase tracking-tight mb-4 border-b-2 border-gray-900 pb-2">
                  Related Stories
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="border-l-2 border-gray-300 pl-3">
                    <a href="#" className="font-semibold text-gray-900 hover:text-gray-600 transition">
                      How to Lower Your Premium in 3 Steps
                    </a>
                  </li>
                  <li className="border-l-2 border-gray-300 pl-3">
                    <a href="#" className="font-semibold text-gray-900 hover:text-gray-600 transition">
                      Top 5 Insurance Savings Tips
                    </a>
                  </li>
                  <li className="border-l-2 border-gray-300 pl-3">
                    <a href="#" className="font-semibold text-gray-900 hover:text-gray-600 transition">
                      Why Comparison Shopping Matters
                    </a>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer - Newspaper Style */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-gray-900 text-white border-t-4 border-gray-700 mt-12"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-b border-gray-700 pb-8 mb-8">
            <div>
              <h4 className="font-black uppercase tracking-wide mb-4">About</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                Auto Savings Journal provides independent insurance comparison services to help drivers find the best rates.
              </p>
            </div>
            <div>
              <h4 className="font-black uppercase tracking-wide mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/terms" className="text-gray-400 hover:text-white transition">Terms</a></li>
                <li><a href="/privacy" className="text-gray-400 hover:text-white transition">Privacy</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black uppercase tracking-wide mb-4">Contact</h4>
              <p className="text-sm text-gray-400">
                Call: <a href="tel:+16197753027" className="text-white hover:underline">(619)-775-3027</a>
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Licensed insurance comparison service
              </p>
            </div>
          </div>
          <div className="text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Auto Savings Journal. All rights reserved.</p>
            <p className="mt-2 text-xs">Not affiliated with any government agency. Information for comparison purposes only.</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
