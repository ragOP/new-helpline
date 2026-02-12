import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Phone, 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark,
  ChevronDown,
  X,
  Play,
  Pause,
  Volume2,
  VolumeX
} from "lucide-react";

export default function TikTokLanding() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [time, setTime] = useState(180);
  const [showCTA, setShowCTA] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const switchNumber = false;

  const videos = [
    {
      id: 1,
      title: "Save ₹25,000 on Auto Insurance!",
      description: "Check your eligibility in 60 seconds 👇",
      savings: "₹25,000",
      color: "from-blue-500 to-purple-500"
    },
    {
      id: 2,
      title: "Government Discounts Available",
      description: "Unlock hidden benefits now! 💰",
      savings: "+₹8,000",
      color: "from-green-500 to-teal-500"
    },
    {
      id: 3,
      title: "Family Bonus Applied",
      description: "Maximum savings for your family 🎉",
      savings: "+₹12,000",
      color: "from-pink-500 to-red-500"
    }
  ];

  // Countdown timer
  useEffect(() => {
    if (showCTA && time > 0) {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showCTA, time]);

  // Auto-advance videos (TikTok style)
  useEffect(() => {
    if (currentVideo < videos.length - 1) {
      const timer = setTimeout(() => {
        setCurrentVideo((prev) => prev + 1);
        setLiked(false);
        setSaved(false);
      }, 8000); // 8 seconds per video
      return () => clearTimeout(timer);
    } else {
      // Show CTA after last video
      setTimeout(() => {
        setShowCTA(true);
      }, 3000);
    }
  }, [currentVideo]);

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

  const handleScroll = (direction) => {
    if (direction === 'down' && currentVideo < videos.length - 1) {
      setCurrentVideo((prev) => prev + 1);
      setLiked(false);
      setSaved(false);
    } else if (direction === 'up' && currentVideo > 0) {
      setCurrentVideo((prev) => prev - 1);
      setLiked(false);
      setSaved(false);
    }
  };

  const currentVideoData = videos[currentVideo];

  return (
    <div className="h-screen w-full bg-black overflow-hidden relative">
      {/* TikTok Header - Minimal */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-center pt-12 pb-4">
        <div className="flex gap-8">
          <button className="text-white font-semibold text-base border-b-2 border-white pb-1">
            Following
          </button>
          <button className="text-white/60 font-semibold text-base">
            For You
          </button>
        </div>
      </div>

      {/* Video Feed Container */}
      <div 
        ref={containerRef}
        className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        style={{ scrollSnapType: 'y mandatory' }}
      >
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            className="h-screen w-full snap-start relative flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentVideo ? 1 : 0.3 }}
            transition={{ duration: 0.3 }}
          >
            {/* Video Background - TikTok Style */}
            <div className={`absolute inset-0 bg-gradient-to-br ${video.color}`}>
              <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {/* Video Content - TikTok Authentic Layout */}
            {index === currentVideo && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 w-full h-full flex flex-col justify-between"
              >
                {/* Main Video Content Area */}
                <div className="flex-1 flex items-center justify-center px-4">
                  <div className="text-center max-w-2xl">
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <div className="text-7xl sm:text-8xl md:text-9xl font-black text-white mb-6 leading-none">
                        {video.savings}
                      </div>
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                        {video.title}
                      </h2>
                    </motion.div>
                  </div>
                </div>

                {/* Right Side Actions - Authentic TikTok Style */}
                <div className="absolute right-3 sm:right-5 bottom-32 flex flex-col items-center gap-6 z-20">
                  {/* Profile Avatar - Top */}
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full border-2 border-white overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
                    </div>
                    <motion.div
                      animate={{ y: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-0.5"
                    >
                      <ChevronDown className="w-4 h-4 text-black" />
                    </motion.div>
                  </div>

                  {/* Like Button - Simple Icon */}
                  <button
                    onClick={() => setLiked(!liked)}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className="w-10 h-10 flex items-center justify-center">
                      <Heart className={`w-8 h-8 ${liked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                    </div>
                    <span className="text-white text-xs font-medium" style={{ fontSize: '12px' }}>
                      {liked ? '1.3K' : '1.2K'}
                    </span>
                  </button>

                  {/* Comment Button */}
                  <button className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <MessageCircle className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-white text-xs font-medium" style={{ fontSize: '12px' }}>856</span>
                  </button>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => setSaved(!saved)}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className="w-10 h-10 flex items-center justify-center">
                      <Bookmark className={`w-8 h-8 ${saved ? 'fill-white text-white' : 'text-white'}`} />
                    </div>
                    <span className="text-white text-xs font-medium" style={{ fontSize: '12px' }}>Save</span>
                  </button>

                  {/* Share Button */}
                  <button className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <Share2 className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-white text-xs font-medium" style={{ fontSize: '12px' }}>Share</span>
                  </button>
                </div>

                {/* Bottom Left Info - Authentic TikTok Style */}
                <div className="absolute bottom-4 left-4 right-24 z-20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 rounded-full border-2 border-white overflow-hidden flex-shrink-0">
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
                    </div>
                    <div>
                      <p className="text-white font-bold text-base leading-tight">@autobenefit</p>
                    </div>
                  </div>
                  <p className="text-white text-base mb-2 leading-snug" style={{ lineHeight: '1.4' }}>
                    {video.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    <span className="text-white/90 text-sm">Check eligibility now! 👇</span>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}

        {/* CTA Section (After Videos) */}
        {showCTA && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-screen w-full snap-start bg-black flex items-center justify-center p-6"
          >
            <div className="max-w-md w-full text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="mb-8"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                  <Phone className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-white mb-4">
                  🎉 You're Eligible!
                </h2>
                <p className="text-white/80 text-lg mb-6">
                  Based on your profile, you qualify for up to ₹25,000 in savings!
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-6"
              >
                <a
                  href={switchNumber ? 'tel:+13236897861' : 'tel:+18336638513'}
                  onClick={handleCallClick}
                  className="block w-full bg-white text-black py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-gray-100 transition flex items-center justify-center gap-3"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call Now & Claim Benefits</span>
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                <p className="text-white/70 text-sm">
                  Your agent is waiting for only{" "}
                  <span className="font-bold text-white text-lg">3 minutes</span>
                </p>
                <div className="inline-block bg-red-500/20 border-2 border-red-500/50 rounded-2xl px-8 py-4">
                  <p className="text-red-400 font-bold text-4xl tabular-nums">
                    {formatTime(time)}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Scroll Indicator - Removed (TikTok doesn't show this) */}

      {/* Video Progress Indicator - TikTok Style (removed, TikTok doesn't show this) */}

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
