import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import agent from '../src/assets/pic.png';

const Home = () => {
  const navigate = useNavigate();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <div className="w-full">
      {/* Header */}
      <header className="bg-[#005e54] text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={agent} alt="Live Benefit" className="w-10 h-10 rounded-full" />
            <h1 className="text-2xl font-bold">Auto Benefit Helpline</h1>
          </div>
          <button 
            onClick={() => navigate('/engsfdq')}
            className="bg-white text-[#005e54] px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-[#005e54] to-[#007a6e] text-white py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl sm:text-6xl font-bold mb-6">
          Claim Your Lower Auto Insurance Rate Today! 
          </h2>
          <p className="text-xl mb-4 text-gray-100">
          It takes just 2 minutes to qualify. Get the rate you deserve...
          </p>
          <motion.button
            onClick={() => navigate('/engsfdq')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-[#005e54] px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition"
          >
            Check Your Eligibility →
          </motion.button>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-16 text-gray-900">
            What You Can Get
          </h3>
        
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-16 text-gray-900">
            How It Works
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div variants={itemVariants} className="text-center">
              <div className="bg-[#005e54] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h4 className="text-xl font-bold mb-2 text-gray-900">Answer Quick Questions</h4>
              <p className="text-gray-600">
                Just 2 minutes of simple questions to check your eligibility.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <div className="bg-[#005e54] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h4 className="text-xl font-bold mb-2 text-gray-900">Get Verified</h4>
              <p className="text-gray-600">
                We verify your information and eligibility status instantly.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <div className="bg-[#005e54] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h4 className="text-xl font-bold mb-2 text-gray-900">Claim Your Benefits</h4>
              <p className="text-gray-600">
                Claim Your Lower Auto Insurance Rate Today!
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Eligibility Requirements */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50"
      >
     
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-[#005e54] to-[#007a6e] text-white py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-4">    Ready to Claim Your Lower Rate?</h3>
        
          <motion.button
            onClick={() => navigate('/engsfdq')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-[#005e54] px-12 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition"
          >
            Start Free Eligibility Check
          </motion.button>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-2">&copy; 2026 Auto Benefit Helpline. All rights reserved.</p>
          <p className="text-sm text-gray-500">
            Not affiliated with any government agency. Information for eligibility purposes only.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
