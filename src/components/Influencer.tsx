import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, TrendingUp, Volume2, VolumeX } from 'lucide-react';

export default function AIInfluencerWidget() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error('Autoplay failed:', error);
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-4 sm:p-8 flex items-center justify-center">
      <div className="w-full max-w-sm sm:max-w-md mx-auto">
        <div 
          className="relative bg-gradient-to-br from-white via-orange-50 to-red-50 shadow-2xl p-6 sm:p-10"
          style={{
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          }}
        >
          <div 
            className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-400 via-red-400 to-orange-500 opacity-60 shadow-lg flex items-center justify-center"
            style={{ borderRadius: '60% 40% 50% 50% / 50% 60% 40% 50%', animation: 'float 4s ease-in-out infinite' }}
          >
            <span className="text-white text-xl sm:text-2xl font-bold">1</span>
          </div>
          
          <div 
            className="absolute -bottom-4 -left-4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-300 via-red-400 to-orange-400 opacity-50 shadow-lg"
            style={{ 
              borderRadius: '50% 60% 40% 50% / 60% 50% 50% 40%',
              animation: 'float 5s ease-in-out infinite',
              animationDelay: '0.5s'
            }}
          ></div>
          
          <div className="flex flex-col items-center text-center space-y-6 relative z-10">
            
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-orange-500 tracking-tight leading-tight">
                AI Influencer
              </h1>
              
              <div className="flex items-center justify-center gap-2">
                <svg width="35" height="8" viewBox="0 0 35 8" className="text-orange-500">
                  <path d="M0 4 Q8.75 0, 17.5 4 T35 4" stroke="currentColor" fill="none" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
                <p className="text-orange-600 font-bold text-xs tracking-widest uppercase px-3 sm:px-4 py-1.5 bg-orange-50 rounded-full shadow-sm border border-orange-200">
                  Runs Your Ads
                </p>
                <svg width="35" height="8" viewBox="0 0 35 8" className="text-orange-500">
                  <path d="M0 4 Q8.75 0, 17.5 4 T35 4" stroke="currentColor" fill="none" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
            </div>

            <div className="w-full max-w-xs sm:max-w-sm">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 sm:border-4 border-orange-200">
                <video 
                  ref={videoRef}
                  className="w-full h-auto"
                  autoPlay 
                  loop 
                  muted={isMuted}
                  playsInline
                  preload="auto"
                  style={{ display: 'block' }}
                >
                  <source src="https://storage.googleapis.com/msgsndr/LK2LrQP5tkIZ3ahmumnr/media/68ecb8d3a6b7f9435d277b41.mp4" type="video/mp4" />
                </video>
                
                <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-red-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse"></div>
                  LIVE
                </div>
                
                <button
                  onClick={toggleMute}
                  className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white/80 hover:bg-white text-gray-800 p-1.5 sm:p-2 rounded-full shadow-md transition-all duration-200"
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
                  ) : (
                    <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 pt-4">
              <div className="flex items-center gap-2 bg-white px-3 sm:px-4 py-2 sm:py-2.5 transform hover:scale-100 sm:hover:scale-110 transition-all duration-300 shadow-md border border-purple-100 rounded-xl">
                <Sparkles className="w-4 h-4 text-purple-600" strokeWidth={3} />
                <span className="text-purple-700 font-bold text-xs">AI Content</span>
              </div>
              
              <div className="flex items-center gap-2 bg-white px-3 sm:px-4 py-2 sm:py-2.5 transform hover:scale-100 sm:hover:scale-110 transition-all duration-300 shadow-md border border-blue-100 rounded-xl">
                <TrendingUp className="w-4 h-4 text-blue-600" strokeWidth={3} />
                <span className="text-blue-700 font-bold text-xs">Auto Ads</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(180deg); }
        }
        @media (max-width: 640px) {
          .rounded-3xl {
            border-radius: 1.5rem;
          }
          .rounded-2xl {
            border-radius: 1rem;
          }
          .rounded-xl {
            border-radius: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}