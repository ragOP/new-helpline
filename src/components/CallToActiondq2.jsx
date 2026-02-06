// ✅ components/CallToActiondq2.jsx (UPDATED) — implements SAME Ringba tagging style as your HTML
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const CallToActiondq2 = ({
  finalMessage,
  switchNumber,
  ageAnswer,
  insuredAnswer,
  payMoreThan100,
}) => {
  const [time, setTime] = useState(180);

  // ---------- helpers (HTML-style Ringba tags) ----------
  const pushToRgbaTags = (obj) => {
    try {
      window._rgba_tags = window._rgba_tags || [];
      window._rgba_tags.push(obj);
      // Debug
      console.log("✅ _rgba_tags push:", obj, "=>", window._rgba_tags);
    } catch (e) {
      console.error("❌ _rgba_tags push error:", e);
    }
  };

  const tryRingbaAPIs = (key, val) => {
    try {
      if (!window.Ringba) return false;

      // Some Ringba scripts expose different methods depending on setup
      if (typeof window.Ringba.setTag === "function") {
        window.Ringba.setTag(key, val);
        return true;
      }
      if (typeof window.Ringba.addTag === "function") {
        window.Ringba.addTag(key, val);
        return true;
      }
      if (typeof window.Ringba.push === "function") {
        window.Ringba.push(["setTag", key, val]);
        return true;
      }

      // fallback: direct tags object
      window.Ringba.tags = window.Ringba.tags || {};
      window.Ringba.tags[key] = val;
      return true;
    } catch (e) {
      console.error("❌ Ringba API set error:", e);
      return false;
    }
  };

  const setTagBothWays = (key, val) => {
    // ✅ EXACTLY like your HTML page behavior
    pushToRgbaTags({ [key]: val });

    // ✅ Also set directly if Ringba object is available (extra safety)
    tryRingbaAPIs(key, val);
  };

  // Normalize values to match your tag pattern
  const derivedTags = useMemo(() => {
    const tags = {};

    if (ageAnswer) {
      // Your React age question: "Yes, I am under 65" / "No, I am over 65"
      const ageVal = ageAnswer.includes("under 65") ? "under_65" : "over_65";
      tags.age = ageVal;
    }

    if (insuredAnswer) {
      tags.insured = insuredAnswer === "Yes" ? "yes" : "no";
    }

    if (payMoreThan100) {
      tags.pay_over_100 = payMoreThan100 === "Yes" ? "yes" : "no";
      // If you want a coverage-like tag similar to HTML:
      tags.coverage = payMoreThan100 === "Yes" ? "Above-100" : "Below-100";
    }

    return tags;
  }, [ageAnswer, insuredAnswer, payMoreThan100]);

  // ---------- timer ----------
  useEffect(() => {
    if (!finalMessage) return;
    if (time <= 0) return;

    const timer = setInterval(() => setTime((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [time, finalMessage]);

  // ---------- when CTA shows, push tags (like HTML flow) ----------
  useEffect(() => {
    if (!finalMessage) return;

    // Push immediately
    Object.entries(derivedTags).forEach(([k, v]) => setTagBothWays(k, v));

    // Also retry for a few seconds in case Ringba loads late
    let retryCount = 0;
    const maxRetries = 50; // ~5 seconds

    const retry = () => {
      retryCount += 1;

      // Only retry Ringba direct APIs; _rgba_tags is already pushed
      if (window.Ringba) {
        Object.entries(derivedTags).forEach(([k, v]) => tryRingbaAPIs(k, v));
        return;
      }

      if (retryCount < maxRetries) {
        setTimeout(retry, 100);
      } else {
        console.warn("Ringba not found after retries. _rgba_tags still pushed.");
      }
    };

    retry();
  }, [finalMessage, derivedTags]);

  const handleCallClick = () => {
    console.log("📞 Call clicked — pushing tags again:", derivedTags);

    // Same as HTML approach: push again at click moment
    Object.entries(derivedTags).forEach(([k, v]) => setTagBothWays(k, v));

    // Extra: ensure Ringba APIs get the latest on click
    Object.entries(derivedTags).forEach(([k, v]) => tryRingbaAPIs(k, v));

    console.log("Current _rgba_tags:", window._rgba_tags);
    console.log("Ringba object:", window.Ringba);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const tel = switchNumber ? "tel:+16197753027" : "tel:+16197753027";
  const label = switchNumber ? "CALL (619)-775-3027" : "CALL (619)-775-3027";

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
          Tap on the button below to make a quick call &amp; that's it. You'll be
          qualified on the call by a licensed agent in minutes 👇
        </p>
      </motion.div>

      <motion.a
        href={tel}
        className="mt-4 bg-green-500 text-white text-xl font-bold py-4 px-8 rounded-md w-full max-w-md text-center transition hover:bg-green-600 relative overflow-hidden"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCallClick}
      >
        <span className="relative z-10">{label}</span>
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

export default CallToActiondq2;
