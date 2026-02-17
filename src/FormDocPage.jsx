import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Loader2, Phone, ArrowRight, CheckCircle2, FileText, Shield, Clock } from "lucide-react";
import agent from "./assets/pic.png";

export default function FormDocPage() {
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    zipCode: "",
    phoneNumber: "",
    email: "",
    vehicleYear: "",
    currentProvider: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Fetch content on component mount
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockContent = {
          header: {
            logo: agent,
            brand: "Auto Insurance Savings",
            formNumber: "FORM-INS-2024-001",
            date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
          },
          document: {
            title: "AUTO INSURANCE RATE COMPARISON APPLICATION",
            subtitle: "Official Rate Comparison Request Form",
            department: "Insurance Comparison Services Division",
            instructions: "Please complete all required fields to receive your rate comparison. All information is confidential and secure."
          },
          cta: {
            phone: "tel:+16197753027",
            text: "CALL (619)-775-3027",
            subtitle: "Or speak with a licensed agent to complete your application"
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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Required field";
    }
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "Required field";
    } else if (!/^\d{5}$/.test(formData.zipCode)) {
      newErrors.zipCode = "Must be 5 digits";
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Required field";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Required field";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setShowResults(true);
  };

  const handleCallClick = () => {
    if (content?.cta?.phone) {
      window.location.href = content.cta.phone;
    } else {
      window.location.href = 'tel:+16197753027';
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-10 h-10 text-gray-800 mx-auto" />
          </motion.div>
          <p className="text-gray-600 text-sm font-medium">Loading form...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen bg-gray-100 flex items-center justify-center px-4">
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
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Document Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-4 border-gray-900 p-6 mb-6 shadow-lg"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 pb-4 border-b-2 border-gray-900">
            <div className="flex items-center gap-3">
              <div className="bg-gray-900 p-2 rounded">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-gray-900">
                  {content?.header?.brand || "Auto Insurance Savings"}
                </h1>
                <p className="text-xs text-gray-600 font-mono">
                  Form #: {content?.header?.formNumber || "FORM-INS-2024-001"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-700">
                Date: {content?.header?.date || new Date().toLocaleDateString()}
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

          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-gray-900">
              {content?.document?.title || "AUTO INSURANCE RATE COMPARISON APPLICATION"}
            </h2>
            <p className="text-sm font-bold text-gray-700">
              {content?.document?.subtitle || "Official Rate Comparison Request Form"}
            </p>
            <p className="text-xs text-gray-600">
              {content?.document?.department || "Insurance Comparison Services Division"}
            </p>
          </div>
        </motion.div>

        {/* Instructions Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-yellow-50 border-2 border-yellow-400 p-4 mb-6"
        >
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-yellow-700 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-yellow-900 mb-1">INSTRUCTIONS:</p>
              <p className="text-xs text-yellow-800 leading-relaxed">
                {content?.document?.instructions || "Please complete all required fields to receive your rate comparison. All information is confidential and secure."}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Form Document */}
        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="bg-white border-4 border-gray-900 p-6 sm:p-8 shadow-lg"
            >
              {/* Form Sections */}
              <div className="space-y-8">
                {/* Personal Information Section */}
                <div>
                  <h3 className="text-lg font-black uppercase tracking-wide text-gray-900 mb-4 pb-2 border-b-2 border-gray-900">
                    SECTION I: PERSONAL INFORMATION
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-1">
                        Full Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className={`w-full px-3 py-2 border-2 ${errors.fullName ? 'border-red-600' : 'border-gray-900'} bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-gray-900`}
                        placeholder="Enter your full name"
                        required
                      />
                      {errors.fullName && (
                        <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-1">
                          ZIP Code <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength="5"
                          value={formData.zipCode}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 5);
                            handleInputChange('zipCode', value);
                          }}
                          className={`w-full px-3 py-2 border-2 ${errors.zipCode ? 'border-red-600' : 'border-gray-900'} bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-gray-900`}
                          placeholder="12345"
                          required
                        />
                        {errors.zipCode && (
                          <p className="text-xs text-red-600 mt-1">{errors.zipCode}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-1">
                          Phone Number <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                          className={`w-full px-3 py-2 border-2 ${errors.phoneNumber ? 'border-red-600' : 'border-gray-900'} bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-gray-900`}
                          placeholder="(555) 123-4567"
                          required
                        />
                        {errors.phoneNumber && (
                          <p className="text-xs text-red-600 mt-1">{errors.phoneNumber}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-1">
                        Email Address <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full px-3 py-2 border-2 ${errors.email ? 'border-red-600' : 'border-gray-900'} bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-gray-900`}
                        placeholder="your.email@example.com"
                        required
                      />
                      {errors.email && (
                        <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Vehicle Information Section */}
                <div>
                  <h3 className="text-lg font-black uppercase tracking-wide text-gray-900 mb-4 pb-2 border-b-2 border-gray-900">
                    SECTION II: VEHICLE INFORMATION
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-1">
                        Vehicle Year (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.vehicleYear}
                        onChange={(e) => handleInputChange('vehicleYear', e.target.value)}
                        className="w-full px-3 py-2 border-2 border-gray-900 bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-gray-900"
                        placeholder="2020"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-1">
                        Current Provider (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.currentProvider}
                        onChange={(e) => handleInputChange('currentProvider', e.target.value)}
                        className="w-full px-3 py-2 border-2 border-gray-900 bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-gray-900"
                        placeholder="Current insurance company"
                      />
                    </div>
                  </div>
                </div>

                {/* Signature Section */}
                <div>
                  <h3 className="text-lg font-black uppercase tracking-wide text-gray-900 mb-4 pb-2 border-b-2 border-gray-900">
                    SECTION III: AUTHORIZATION
                  </h3>
                  
                  <div className="bg-gray-50 border-2 border-gray-300 p-4 mb-4">
                    <p className="text-xs text-gray-700 leading-relaxed mb-3">
                      By submitting this form, I authorize Auto Insurance Savings to contact me regarding insurance rate comparison services. 
                      I understand that this is a free service and I am under no obligation to purchase any insurance products.
                    </p>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="authorization"
                        required
                        className="w-4 h-4 border-2 border-gray-900 text-gray-900 focus:ring-2 focus:ring-gray-900"
                      />
                      <label htmlFor="authorization" className="text-xs font-bold text-gray-900">
                        I agree to the terms and conditions <span className="text-red-600">*</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4 border-t-2 border-gray-900">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className="w-full sm:w-auto bg-gray-900 text-white px-8 py-4 font-black text-lg uppercase tracking-wide border-2 border-gray-900 hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Loader2 className="w-5 h-5" />
                        </motion.div>
                        <span>PROCESSING...</span>
                      </>
                    ) : (
                      <>
                        <FileText className="w-5 h-5" />
                        <span>SUBMIT APPLICATION</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border-4 border-gray-900 p-8 shadow-lg"
            >
              <div className="text-center space-y-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                  className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center"
                >
                  <CheckCircle2 className="w-12 h-12 text-green-600" />
                </motion.div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase text-gray-900 mb-2">
                    APPLICATION RECEIVED
                  </h3>
                  <p className="text-lg text-gray-700 font-medium">
                    Your rate comparison request has been submitted successfully.
                  </p>
                </div>

                <div className="bg-gray-50 border-2 border-gray-300 p-6 space-y-4">
                  <p className="text-sm font-bold text-gray-900">
                    NEXT STEPS:
                  </p>
                  <ul className="text-left text-sm text-gray-700 space-y-2 max-w-md mx-auto">
                    <li className="flex items-start gap-2">
                      <span className="font-black">1.</span>
                      <span>A licensed agent will review your application</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-black">2.</span>
                      <span>You will receive a call within 24 hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-black">3.</span>
                      <span>Compare rates and choose the best option</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 border-t-2 border-gray-900">
                  <p className="text-sm font-bold text-gray-900 mb-4">
                    OR CALL NOW TO SPEAK WITH AN AGENT:
                  </p>
                  <motion.a
                    href={content?.cta?.phone || 'tel:+16197753027'}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCallClick}
                    className="inline-block bg-gray-900 text-white px-8 py-4 font-black text-xl uppercase tracking-wide border-2 border-gray-900 hover:bg-gray-800 transition flex items-center justify-center gap-3"
                  >
                    <Phone className="w-6 h-6" />
                    <span>{content?.cta?.text || "CALL (619)-775-3027"}</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer - Document Style */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 bg-white border-2 border-gray-900 p-6 text-center"
        >
          <div className="space-y-2 text-xs text-gray-600">
            <p className="font-bold text-gray-900">
              CONFIDENTIALITY NOTICE
            </p>
            <p>
              All information provided is confidential and secure. This form is for rate comparison purposes only.
            </p>
            <p className="pt-4 border-t border-gray-300">
              &copy; {new Date().getFullYear()} Auto Insurance Savings. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <a href="/terms" className="hover:text-gray-900 transition">Terms</a>
              <a href="/privacy" className="hover:text-gray-900 transition">Privacy</a>
              <a href="#contact" className="hover:text-gray-900 transition">Contact</a>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
