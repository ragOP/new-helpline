import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Loader2, Phone, CheckCircle2, Clock, User, PhoneCall, Sparkles } from "lucide-react";
import agent from "./assets/pic.png";

export default function TimelinePage() {
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  // Fetch content on component mount
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        // Simulate API call - replace with your actual endpoint
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Dynamic content structure
        const mockContent = {
          header: {
            logo: agent,
            brand: "Auto Benefit Helpline"
          },
          hero: {
            title: "Get Your Lower Rate in 3 Simple Steps",
            subtitle: "See how easy it is to claim your savings",
            description: "Follow our proven process to get your lower auto insurance rate"
          },
          steps: [
            {
              number: 1,
              title: "Answer Quick Questions",
              description: "Just 2 minutes of simple questions to check your eligibility",
              icon: User,
              duration: "2 Min",
              color: "from-blue-500 to-cyan-500"
            },
            {
              number: 2,
              title: "Get Verified",
              description: "We verify your information and eligibility status instantly",
              icon: CheckCircle2,
              duration: "Instant",
              color: "from-green-500 to-emerald-500"
            },
            {
              number: 3,
              title: "Claim Your Benefits",
              description: "Speak with a licensed agent and activate your lower rate",
              icon: PhoneCall,
              duration: "5 Min Call",
              color: "from-purple-500 to-pink-500"
            }
          ],
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

  // Auto-advance through steps
  useEffect(() => {
    if (content?.steps && activeStep < content.steps.length - 1) {
      const timer = setTimeout(() => {
        setActiveStep(prev => (prev + 1) % content.steps.length);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [activeStep, content]);

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
          <p className="text-gray-600 text-sm font-medium">Loading timeline...</p>
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
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/95 backdrop-blur-sm border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm"
      >
        <div className="flex items-center gap-3">
          <img 
            src={content?.header?.logo || agent} 
            alt={content?.header?.brand || "Auto Benefit"} 
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
          />
          <h1 className="text-lg sm:text-xl font-black text-gray-900">
            {content?.header?.brand || "Auto Benefit Helpline"}
          </h1>
        </div>
        <button
          onClick={() => navigate('/')}
          className="text-sm font-semibold text-[#005e54] hover:text-[#007a6e] transition"
        >
          Home
        </button>
      </motion.header>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4 mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-[#005e54]/10 rounded-full px-4 py-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#005e54]" />
              <span className="text-sm font-bold text-[#005e54]">Simple Process</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              {content?.hero?.title || "Get Your Lower Rate in 3 Simple Steps"}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 font-medium">
              {content?.hero?.subtitle || "See how easy it is to claim your savings"}
            </p>
            {content?.hero?.description && (
              <p className="text-base text-gray-500">
                {content.hero.description}
              </p>
            )}
          </motion.div>

          {/* Timeline */}
          {content?.steps && (
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-0.5 sm:w-1 bg-gray-200 transform sm:-translate-x-1/2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ 
                    height: `${((activeStep + 1) / content.steps.length) * 100}%` 
                  }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#005e54] to-[#007a6e] origin-top"
                />
              </div>

              {/* Steps */}
              <div className="space-y-12 sm:space-y-16">
                {content.steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = index <= activeStep;
                  const isCurrent = index === activeStep;
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0,
                        scale: isCurrent ? 1.05 : 1
                      }}
                      transition={{ delay: index * 0.2 }}
                      className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-6 ${
                        index % 2 === 0 ? 'sm:flex-row-reverse' : ''
                      }`}
                    >
                      {/* Step Circle */}
                      <div className="relative z-10 flex-shrink-0">
                        <motion.div
                          animate={{
                            scale: isCurrent ? [1, 1.2, 1] : 1,
                          }}
                          transition={{
                            duration: 2,
                            repeat: isCurrent ? Infinity : 0,
                            ease: "easeInOut"
                          }}
                          className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border-4 shadow-lg ${
                            isActive
                              ? 'bg-gradient-to-br ' + step.color + ' border-white'
                              : 'bg-white border-gray-300'
                          }`}
                        >
                          {isActive ? (
                            <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                          ) : (
                            <div className="w-4 h-4 rounded-full bg-gray-300" />
                          )}
                          
                          {/* Pulse Effect for Active Step */}
                          {isCurrent && (
                            <motion.div
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 0, 0.5],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                              className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.color} opacity-50`}
                            />
                          )}
                        </motion.div>
                        
                        {/* Step Number Badge */}
                        <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                          isActive ? 'bg-white text-[#005e54]' : 'bg-gray-300 text-gray-600'
                        }`}>
                          {step.number}
                        </div>
                      </div>

                      {/* Step Content Card */}
                      <motion.div
                        animate={{
                          y: isCurrent ? -5 : 0,
                        }}
                        className={`flex-1 bg-white rounded-2xl p-6 shadow-lg border-2 transition-all ${
                          isActive
                            ? 'border-[#005e54] shadow-xl'
                            : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h3 className={`text-xl sm:text-2xl font-black ${
                            isActive ? 'text-gray-900' : 'text-gray-400'
                          }`}>
                            {step.title}
                          </h3>
                          {isActive && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="bg-green-100 rounded-full p-1.5"
                            >
                              <CheckCircle2 className="w-5 h-5 text-green-600" />
                            </motion.div>
                          )}
                        </div>
                        
                        <p className={`text-sm sm:text-base mb-4 ${
                          isActive ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {step.description}
                        </p>
                        
                        <div className="flex items-center gap-2">
                          <Clock className={`w-4 h-4 ${
                            isActive ? 'text-[#005e54]' : 'text-gray-400'
                          }`} />
                          <span className={`text-sm font-semibold ${
                            isActive ? 'text-[#005e54]' : 'text-gray-400'
                          }`}>
                            {step.duration}
                          </span>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Progress & CTA Combined Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
          >
            {/* Progress Indicator */}
            {content?.steps && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-gray-600">Progress</span>
                  <span className="text-sm font-black text-[#005e54]">
                    Step {activeStep + 1} of {content.steps.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ 
                      width: `${((activeStep + 1) / content.steps.length) * 100}%` 
                    }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-[#005e54] to-[#007a6e] rounded-full"
                  />
                </div>
              </div>
            )}

            {/* CTA Content */}
            <div className="text-center space-y-4">
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900">
                  Ready to Get Started?
                </h3>
                <p className="text-base sm:text-lg text-gray-600">
                  Call now to begin your journey to lower rates
                </p>
              </div>
              
              {/* Call Button - Simple Design */}
              <motion.a
                href={content?.cta?.phone || 'tel:+16197753027'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCallClick}
                className="block w-full bg-white border-2 border-yellow-300 rounded-xl py-4 px-6 text-center font-bold text-lg sm:text-xl text-gray-700 hover:bg-yellow-50 transition-all shadow-sm"
              >
                {content?.cta?.text || "CALL (619)-775-3027"}
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
