import React from 'react';
import { Sparkles, TrendingUp, Users } from 'lucide-react';

export default function AIInfluencerWidget() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-8 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div 
          className="relative bg-gradient-to-br from-white via-orange-50 to-red-50 shadow-2xl p-10"
          style={{
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          }}
        >
          <div 
            className="absolute -top-5 -right-5 w-20 h-20 bg-gradient-to-br from-orange-400 via-red-400 to-orange-500 opacity-60 shadow-lg flex items-center justify-center"
            style={{ borderRadius: '60% 40% 50% 50% / 50% 60% 40% 50%', animation: 'float 4s ease-in-out infinite' }}
          >
            <span className="text-white text-2xl font-bold">1</span>
          </div>
          
          <div 
            className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-orange-300 via-red-400 to-orange-400 opacity-50 shadow-lg"
            style={{ 
              borderRadius: '50% 60% 40% 50% / 60% 50% 50% 40%',
              animation: 'float 5s ease-in-out infinite',
              animationDelay: '0.5s'
            }}
          ></div>
          
          <div className="flex flex-col items-center text-center space-y-6 relative z-10">
            
            <div className="space-y-3">
              <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-orange-500 tracking-tight leading-tight">
                AI Influencer
              </h1>
              
              <div className="flex items-center justify-center gap-2">
                <svg width="35" height="8" viewBox="0 0 35 8" className="text-orange-500">
                  <path d="M0 4 Q8.75 0, 17.5 4 T35 4" stroke="currentColor" fill="none" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
                <p className="text-orange-600 font-bold text-xs tracking-widest uppercase px-4 py-1.5 bg-orange-50 rounded-full shadow-sm border border-orange-200">
                  Runs Your Ads
                </p>
                <svg width="35" height="8" viewBox="0 0 35 8" className="text-orange-500">
                  <path d="M0 4 Q8.75 0, 17.5 4 T35 4" stroke="currentColor" fill="none" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
            </div>

            <div className="w-full max-w-sm">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-orange-200">
                <video 
                  className="w-full h-auto"
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  preload="auto"
                  style={{ display: 'block' }}
                >
                  <source src="https://storage.googleapis.com/msgsndr/LK2LrQP5tkIZ3ahmumnr/media/686ec758038ba8dfa348e01b.mp4" type="video/mp4" />
                </video>
                
                <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  LIVE
                </div>
              </div>
            </div>

            <div className="flex items-center gap-5 pt-4">
              <div className="flex items-center gap-2 bg-white px-4 py-2.5 transform hover:scale-110 transition-all duration-300 shadow-md border border-purple-100 rounded-xl">
                <Sparkles className="w-4 h-4 text-purple-600" strokeWidth={3} />
                <span className="text-purple-700 font-bold text-xs">AI Content</span>
              </div>
              
              <div className="flex items-center gap-2 bg-white px-4 py-2.5 transform hover:scale-110 transition-all duration-300 shadow-md border border-blue-100 rounded-xl">
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
          50% { transform: translateY(-12px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
}