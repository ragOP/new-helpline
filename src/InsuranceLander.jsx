import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, CheckCircle2, Shield, Clock, ChevronDown, ChevronUp, Mail, X, Star } from "lucide-react";
import "./InsuranceLander.css";

export default function InsuranceLander() {
  const [formData, setFormData] = useState({
    zip: "",
    ageRange: "",
    vehicleOwnership: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [utmParams, setUtmParams] = useState({});

  // Capture UTM parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utm = {
      utm_source: params.get('utm_source') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_term: params.get('utm_term') || '',
      utm_content: params.get('utm_content') || '',
      gclid: params.get('gclid') || '',
      fbclid: params.get('fbclid') || ''
    };
    setUtmParams(utm);
    
    // Track page view
    if (window.trackEvent) {
      window.trackEvent('page_view', { ...utm, page: 'insurance_lander' });
    }

    // Load form data from localStorage
    const saved = localStorage.getItem('insuranceFormData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(parsed);
      } catch (e) {
        console.error('Failed to load form data:', e);
      }
    }
  }, []);

  // Save form data to localStorage
  useEffect(() => {
    if (formData.zip || formData.ageRange || formData.vehicleOwnership) {
      localStorage.setItem('insuranceFormData', JSON.stringify(formData));
    }
  }, [formData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.zip) {
      newErrors.zip = "ZIP code is required";
    } else if (!/^\d{5}$/.test(formData.zip)) {
      newErrors.zip = "Please enter a valid 5-digit ZIP code";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      if (window.trackEvent) {
        window.trackEvent('form_validation_error', { errors: Object.keys(errors) });
      }
      return;
    }

    if (window.trackEvent) {
      window.trackEvent('form_submit', { ...formData, ...utmParams });
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2500));

    setIsSubmitting(false);
    setShowResults(true);

    // Clear form from localStorage on success
    localStorage.removeItem('insuranceFormData');
  };

  const handleCallClick = () => {
    if (window.trackEvent) {
      window.trackEvent('call_click', { source: 'cta_button', ...utmParams });
    }
  };

  const toggleFAQ = (index) => {
    const newIndex = openFAQ === index ? null : index;
    setOpenFAQ(newIndex);
    
    if (window.trackEvent && newIndex !== null) {
      window.trackEvent('faq_open', { question_index: index });
    }
  };

  const phoneNumber = "+1-888-555-0199";
  const telLink = `tel:${phoneNumber.replace(/-/g, '')}`;

  return (
    <div className="insurance-lander">
      {/* Sticky Mobile CTA Bar */}
      <div className="sticky-cta-bar">
        <motion.a
          href={telLink}
          onClick={handleCallClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="cta-button primary"
          data-track="mobile_call_cta"
        >
          <Phone className="w-5 h-5" />
          <span>Call Now</span>
        </motion.a>
        <motion.button
          onClick={() => {
            document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
            if (window.trackEvent) {
              window.trackEvent('form_start', { source: 'mobile_cta' });
            }
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="cta-button secondary"
          data-track="mobile_check_rate"
        >
          Check My Rate
        </motion.button>
      </div>

      {/* Header */}
      <header className="lander-header">
        <div className="header-content">
          <div className="logo-section">
            <Shield className="w-8 h-8 text-[#005e54]" />
            <span className="logo-text">AutoRate</span>
          </div>
          <div className="trust-badges">
            <div className="trust-item">
              <Shield className="w-4 h-4" />
              <span>Secure</span>
            </div>
            <div className="trust-item">
              <CheckCircle2 className="w-4 h-4" />
              <span>Licensed</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-text"
          >
            <h1 className="hero-title">
              Compare Auto Insurance Options in Minutes
            </h1>
            <p className="hero-subtitle">
              See rates from top providers. No spam, no hassle—just options that may save you money.
            </p>

            {/* Benefits */}
            <div className="benefits-list">
              <div className="benefit-item">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>Compare quotes from multiple carriers</span>
              </div>
              <div className="benefit-item">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>See options in under 2 minutes</span>
              </div>
              <div className="benefit-item">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>100% free, no obligation</span>
              </div>
            </div>

            {/* Star Rating */}
            <div className="rating-strip">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="rating-text">Trusted by drivers nationwide</span>
            </div>

            {/* Hero CTAs */}
            <div className="hero-ctas">
              <motion.a
                href={telLink}
                onClick={handleCallClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cta-primary"
                data-track="hero_call_cta"
              >
                <Phone className="w-5 h-5" />
                <span>Call Now</span>
                <span className="microcopy">Call in 10 seconds</span>
              </motion.a>
              <motion.button
                onClick={() => {
                  document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
                  if (window.trackEvent) {
                    window.trackEvent('form_start', { source: 'hero_cta' });
                  }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cta-secondary"
                data-track="hero_check_rate"
              >
                Check My Rate Online
              </motion.button>
            </div>

            <p className="disclaimer-text">
              Not available in all states. Rates vary.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section id="lead-form" className="form-section">
        <div className="form-container">
          <h2 className="section-title">Get Started in Seconds</h2>
          <p className="section-subtitle">Enter your ZIP code to see available options</p>

          <AnimatePresence>
            {!showResults ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="lead-form"
              >
                <div className="form-group">
                  <label htmlFor="zip">ZIP Code *</label>
                  <input
                    type="text"
                    id="zip"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength="5"
                    value={formData.zip}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 5);
                      handleInputChange('zip', value);
                    }}
                    placeholder="12345"
                    className={errors.zip ? 'error' : ''}
                    required
                  />
                  {errors.zip && <span className="error-message">{errors.zip}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="ageRange">Age Range (Optional)</label>
                  <select
                    id="ageRange"
                    value={formData.ageRange}
                    onChange={(e) => handleInputChange('ageRange', e.target.value)}
                  >
                    <option value="">Select age range</option>
                    <option value="18-24">18-24</option>
                    <option value="25-34">25-34</option>
                    <option value="35-44">35-44</option>
                    <option value="45-54">45-54</option>
                    <option value="55-64">55-64</option>
                    <option value="65+">65+</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="vehicleOwnership">Vehicle Ownership (Optional)</label>
                  <select
                    id="vehicleOwnership"
                    value={formData.vehicleOwnership}
                    onChange={(e) => handleInputChange('vehicleOwnership', e.target.value)}
                  >
                    <option value="">Select ownership</option>
                    <option value="own">Own</option>
                    <option value="lease">Lease</option>
                    <option value="finance">Finance</option>
                  </select>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="submit-button"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="spinner"
                      />
                      <span>Checking options...</span>
                    </>
                  ) : (
                    "See My Options"
                  )}
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="results-section"
              >
                <div className="results-header">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                  <h3>Options Available!</h3>
                  <p>We found insurance options for your area. Choose how you'd like to proceed:</p>
                </div>

                <div className="results-ctas">
                  <motion.a
                    href={telLink}
                    onClick={handleCallClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cta-primary large"
                    data-track="results_call_cta"
                  >
                    <Phone className="w-6 h-6" />
                    <div>
                      <div className="cta-label">Call Now</div>
                      <div className="cta-sublabel">Speak with a licensed agent</div>
                    </div>
                  </motion.a>

                  <motion.button
                    onClick={() => {
                      if (window.trackEvent) {
                        window.trackEvent('continue_online_click', { ...utmParams });
                      }
                      // Placeholder for online flow
                      alert('Online flow would continue here');
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="cta-secondary large"
                    data-track="results_continue_online"
                  >
                    Continue Online
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="section-container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-grid">
            {[
              {
                number: 1,
                title: "Enter Your ZIP",
                description: "Start with your location to see available options in your area.",
                icon: <Shield className="w-8 h-8" />
              },
              {
                number: 2,
                title: "Compare Options",
                description: "View rates and coverage options from multiple trusted providers.",
                icon: <CheckCircle2 className="w-8 h-8" />
              },
              {
                number: 3,
                title: "Choose Your Plan",
                description: "Select the option that works best for you, or speak with an agent.",
                icon: <Phone className="w-8 h-8" />
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="step-card"
              >
                <div className="step-number">{step.number}</div>
                <div className="step-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Need */}
      <section className="what-you-need">
        <div className="section-container">
          <h2 className="section-title">What You'll Need</h2>
          <p className="section-subtitle">To get accurate quotes, have this information ready:</p>
          <div className="info-list">
            {[
              "Your ZIP code",
              "Vehicle information (make, model, year)",
              "Driving history (accidents, violations)",
              "Current coverage details (if applicable)"
            ].map((item, index) => (
              <div key={index} className="info-item">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Compare With Us */}
      <section className="why-compare">
        <div className="section-container">
          <h2 className="section-title">Why Compare With Us</h2>
          <div className="features-grid">
            {[
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Trusted & Transparent",
                description: "We work with licensed insurance providers you can trust."
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: "Fast & Easy",
                description: "Compare options in minutes, not hours."
              },
              {
                icon: <CheckCircle2 className="w-6 h-6" />,
                title: "No Hidden Fees",
                description: "100% free service with no obligation to purchase."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="feature-card"
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="section-container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-list">
            {[
              {
                q: "How long does it take to compare options?",
                a: "The process typically takes 2-3 minutes. You'll enter your ZIP code and basic information, then see available options."
              },
              {
                q: "Is this service really free?",
                a: "Yes, comparing options is completely free. There are no hidden fees or charges."
              },
              {
                q: "Will I be contacted by multiple agents?",
                a: "No. We'll connect you with one licensed agent who can help you compare options and answer questions."
              },
              {
                q: "What information do I need to get started?",
                a: "You'll need your ZIP code to start. Additional information like vehicle details and driving history helps provide more accurate quotes."
              },
              {
                q: "Are rates guaranteed?",
                a: "Rates vary based on many factors. We show you available options, and final rates are determined by the insurance provider after reviewing your information."
              },
              {
                q: "Is this available in all states?",
                a: "Not all states are available. Enter your ZIP code to see if options are available in your area."
              },
              {
                q: "Can I purchase insurance online?",
                a: "Yes, you can continue online or speak with a licensed agent over the phone to complete your purchase."
              },
              {
                q: "How do I know if I'm getting a good rate?",
                a: "We show you options from multiple providers so you can compare. Rates depend on many factors including your location, driving history, and coverage needs."
              }
            ].map((faq, index) => (
              <div key={index} className="faq-item">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="faq-question"
                >
                  <span>{faq.q}</span>
                  {openFAQ === index ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
                <AnimatePresence>
                  {openFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="faq-answer"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact/Support */}
      <section className="contact-section">
        <div className="section-container">
          <h2 className="section-title">Need Help?</h2>
          <p className="section-subtitle">We're here to assist you</p>
          <div className="contact-options">
            <motion.a
              href={telLink}
              onClick={handleCallClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="contact-button"
              data-track="contact_call"
            >
              <Phone className="w-5 h-5" />
              <div>
                <div className="contact-label">Call Us</div>
                <div className="contact-value">{phoneNumber}</div>
              </div>
            </motion.a>
            <motion.a
              href="mailto:support@autorate.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="contact-button"
              data-track="contact_email"
            >
              <Mail className="w-5 h-5" />
              <div>
                <div className="contact-label">Email Us</div>
                <div className="contact-value">support@autorate.com</div>
              </div>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="lander-footer">
        <div className="footer-content">
          <div className="footer-disclaimer">
            <p>
              <strong>Disclaimer:</strong> AutoRate is a comparison service that connects consumers with licensed insurance providers. 
              We do not sell insurance directly. Rates and availability vary by state and individual circumstances. 
              Not all products or services are available in all states. By using this service, you agree to be contacted by 
              licensed insurance agents who may assist you with quotes and coverage options.
            </p>
            <p className="footer-copy">
              © {new Date().getFullYear()} AutoRate. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Help Chip */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowHelpModal(true)}
        className="help-chip"
      >
        Need help?
      </motion.button>

      {/* Help Modal */}
      <AnimatePresence>
        {showHelpModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHelpModal(false)}
              className="modal-overlay"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="help-modal"
            >
              <button
                onClick={() => setShowHelpModal(false)}
                className="modal-close"
              >
                <X className="w-5 h-5" />
              </button>
              <h3>How can we help?</h3>
              <div className="modal-options">
                <motion.a
                  href={telLink}
                  onClick={handleCallClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="modal-option"
                >
                  <Phone className="w-6 h-6" />
                  <div>
                    <div className="modal-option-label">Call Us</div>
                    <div className="modal-option-value">{phoneNumber}</div>
                  </div>
                </motion.a>
                <motion.a
                  href="mailto:support@autorate.com"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="modal-option"
                >
                  <Mail className="w-6 h-6" />
                  <div>
                    <div className="modal-option-label">Email Us</div>
                    <div className="modal-option-value">support@autorate.com</div>
                  </div>
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
