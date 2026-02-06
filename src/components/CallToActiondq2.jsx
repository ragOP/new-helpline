import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CallToAction = ({ finalMessage, switchNumber, ageAnswer, insuredAnswer }) => {
  const [time, setTime] = useState(180);

  useEffect(() => {
    if (time <= 0) return;

    if (finalMessage) {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [time, finalMessage]);

  // Set Ringba tags when component mounts with data
  useEffect(() => {
    if (finalMessage && (ageAnswer || insuredAnswer)) {
      // Wait for Ringba to be available
      let retryCount = 0;
      const maxRetries = 50; // Try for up to 5 seconds
      
      const setRingbaTags = () => {
        if (window.Ringba) {
          console.log("Ringba found, setting tags...", { ageAnswer, insuredAnswer });
          
          // Set age tag
          if (ageAnswer) {
            const ageValue = ageAnswer.includes("under 65") ? "yes" : "no";
            console.log("Setting age tag:", ageValue);
            
            // Try multiple Ringba API methods
            if (window.Ringba.setTag) {
              window.Ringba.setTag("age", ageValue);
              console.log("✓ Age tag set via setTag:", ageValue);
            } else if (window.Ringba.addTag) {
              window.Ringba.addTag("age", ageValue);
              console.log("✓ Age tag set via addTag:", ageValue);
            } else if (window.Ringba.push) {
              window.Ringba.push(["setTag", "age", ageValue]);
              console.log("✓ Age tag set via push:", ageValue);
            }
            
            // Also try setting directly on the Ringba object
            if (window.Ringba.tags) {
              window.Ringba.tags = window.Ringba.tags || {};
              window.Ringba.tags.age = ageValue;
              console.log("✓ Age tag set directly on tags object:", ageValue);
            }
          }
          
          // Set insured tag
          if (insuredAnswer) {
            const insuredValue = insuredAnswer === "Yes" ? "yes" : "no";
            console.log("Setting insured tag:", insuredValue);
            
            // Try multiple Ringba API methods
            if (window.Ringba.setTag) {
              window.Ringba.setTag("insured", insuredValue);
              console.log("✓ Insured tag set via setTag:", insuredValue);
            } else if (window.Ringba.addTag) {
              window.Ringba.addTag("insured", insuredValue);
              console.log("✓ Insured tag set via addTag:", insuredValue);
            } else if (window.Ringba.push) {
              window.Ringba.push(["setTag", "insured", insuredValue]);
              console.log("✓ Insured tag set via push:", insuredValue);
            }
            
            // Also try setting directly on the Ringba object
            if (window.Ringba.tags) {
              window.Ringba.tags = window.Ringba.tags || {};
              window.Ringba.tags.insured = insuredValue;
              console.log("✓ Insured tag set directly on tags object:", insuredValue);
            }
          }
          
          // Verify tags were set
          console.log("Ringba object:", window.Ringba);
          console.log("Ringba tags:", window.Ringba.tags);
        } else {
          retryCount++;
          if (retryCount < maxRetries) {
            // Retry if Ringba isn't loaded yet
            setTimeout(setRingbaTags, 100);
          } else {
            console.error("Ringba not found after", maxRetries, "retries");
          }
        }
      };
      setRingbaTags();
    }
  }, [finalMessage, ageAnswer, insuredAnswer]);

  const handleCallClick = () => {
    // Send tags to Ringba on click as well
    console.log("Call button clicked, setting Ringba tags...", { ageAnswer, insuredAnswer });
    
    if (window.Ringba) {
      // Set age tag
      if (ageAnswer) {
        const ageValue = ageAnswer.includes("under 65") ? "yes" : "no";
        console.log("Setting age tag on click:", ageValue);
        
        if (window.Ringba.setTag) {
          window.Ringba.setTag("age", ageValue);
          console.log("✓ Age tag set via setTag on click:", ageValue);
        } else if (window.Ringba.addTag) {
          window.Ringba.addTag("age", ageValue);
          console.log("✓ Age tag set via addTag on click:", ageValue);
        } else if (window.Ringba.push) {
          window.Ringba.push(["setTag", "age", ageValue]);
          console.log("✓ Age tag set via push on click:", ageValue);
        }
        
        if (window.Ringba.tags) {
          window.Ringba.tags = window.Ringba.tags || {};
          window.Ringba.tags.age = ageValue;
          console.log("✓ Age tag set directly on tags object on click:", ageValue);
        }
      }
      
      // Set insured tag
      if (insuredAnswer) {
        const insuredValue = insuredAnswer === "Yes" ? "yes" : "no";
        console.log("Setting insured tag on click:", insuredValue);
        
        if (window.Ringba.setTag) {
          window.Ringba.setTag("insured", insuredValue);
          console.log("✓ Insured tag set via setTag on click:", insuredValue);
        } else if (window.Ringba.addTag) {
          window.Ringba.addTag("insured", insuredValue);
          console.log("✓ Insured tag set via addTag on click:", insuredValue);
        } else if (window.Ringba.push) {
          window.Ringba.push(["setTag", "insured", insuredValue]);
          console.log("✓ Insured tag set via push on click:", insuredValue);
        }
        
        if (window.Ringba.tags) {
          window.Ringba.tags = window.Ringba.tags || {};
          window.Ringba.tags.insured = insuredValue;
          console.log("✓ Insured tag set directly on tags object on click:", insuredValue);
        }
      }
      
      // Verify tags
      console.log("Ringba tags after click:", window.Ringba.tags);
    } else {
      console.error("Ringba not available on call click");
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <motion.div
      className="flex flex-col items-center pt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="bg-green-100 text-green-700 text-center p-3 rounded-md w-full max-w-md"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <p className="font-semibold">
          Tap on the button below to make a quick call & that's it. You'll be
          qualified on the call by a licensed agent in minutes 👇
        </p>
      </motion.div>

      <motion.a
        href={switchNumber ? 'tel:+16197753027': 'tel:+16197753027'}
        className="mt-4 bg-green-500 text-white text-xl font-bold py-4 px-8 rounded-md w-full max-w-md text-center transition hover:bg-green-600 relative overflow-hidden"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCallClick}
      >
        <span className="relative z-10">
          {switchNumber ? "CALL (619)-775-3027": "CALL (619)-775-3027"}
        </span>
        <div className="shimmer absolute inset-0 z-0"></div>
      </motion.a>

      <motion.p
        className="mt-4 text-gray-600 text-center text-sm w-full max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Due to high call volume, your official agent is waiting for only{" "}
        <span className="font-bold">3 minutes</span>, then your spot will not be
        reserved.
      </motion.p>

      <motion.p
        className="mt-2 text-red-500 font-bold text-lg"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        {formatTime(time)}
      </motion.p>
    </motion.div>
  );
};

export default CallToAction;
