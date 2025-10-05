import React, { useState, useEffect, useRef } from 'react';
import { Home, MessageCircle, ChevronRight, Check, Sparkles, Star, Mic, MicOff, Volume2, X, Radio } from 'lucide-react';
import axios from 'axios';
import { UltravoxSession } from 'ultravox-client';

interface Ripple {
  x: number;
  y: number;
  id: number;
}

const AGENT_ID = '4a35b22f-67fc-44aa-b416-ccd647cc8500';
const SCHEMA = '6af30ad4-a50c-4acc-8996-d5f562b6987f';
const BASE_URL = 'https://app.snowie.ai';

const WebCall: React.FC = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showVoiceCall, setShowVoiceCall] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [callDuration, setCallDuration] = useState<number>(0);
  const [transcripts, setTranscripts] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('disconnected');
  const [callId, setCallId] = useState<string | null>(null);
  const [callSessionId, setCallSessionId] = useState<string | null>(null);

  const sessionRef = useRef<UltravoxSession | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sessionRef.current) {
      sessionRef.current = new UltravoxSession({
        experimentalMessages: new Set(['debug']),
      });

      sessionRef.current.addEventListener('transcripts', () => {
        const allTrans = sessionRef.current?.transcripts || [];
        let transText = '';
        for (const transcript of allTrans) {
          transText = transcript.text;
          if (transcript) {
            setTranscripts(transText);
          }
        }
      });

      sessionRef.current.addEventListener('status', () => {
        if (sessionRef.current) {
          setStatus(sessionRef.current.status);
          setIsSpeaking(sessionRef.current.status === 'speaking');
        }
      });

      sessionRef.current.addEventListener('experimental_message', (msg: any) => {
        console.log('Debug message:', JSON.stringify(msg));
      });
    }

    return () => {
      sessionRef.current?.leaveCall();
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [transcripts]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (sessionRef.current) {
        if (document.visibilityState === 'hidden') {
          sessionRef.current.muteSpeaker();
        } else {
          sessionRef.current.unmuteSpeaker();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const handleStartDemo = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/api/start-thunder/`, {
        agent_code: AGENT_ID,
        schema_name: SCHEMA,
      });

      const wssUrl = response.data.joinUrl;
      const newCallId = response.data.callId;
      setCallId(newCallId);
      setCallSessionId(response.data.call_session_id);
      localStorage.setItem('callId', newCallId);

      if (wssUrl && sessionRef.current) {
        await sessionRef.current.joinCall(wssUrl);
        setIsLoading(false);
        setShowSuccess(true);

        setTimeout(() => {
          setShowSuccess(false);
          setShowVoiceCall(true);
          startCallTimer();
          setTimeout(() => setIsSpeaking(true), 500);
        }, 1500);
      }
    } catch (error) {
      console.error('Error starting call:', error);
      setIsLoading(false);
    }
  };

  const startCallTimer = () => {
    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const endCall = async () => {
    try {
      if (sessionRef.current) {
        await sessionRef.current.leaveCall();
        await axios.post(`${BASE_URL}/api/end-call-session-thunder/`, {
          call_session_id: callSessionId,
          call_id: callId,
          schema_name: SCHEMA,
        });
      }
      setShowVoiceCall(false);
      setCallDuration(0);
      setIsSpeaking(false);
      setIsMuted(false);
      setTranscripts(null);
      setStatus('disconnected');
      localStorage.clear();
    } catch (error) {
      console.error('Error ending call:', error);
    }
  };

  const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple: Ripple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 flex items-center justify-center">
      <div className="w-full max-w-sm sm:max-w-md mx-auto relative z-10">
        {showVoiceCall && (
          <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-800">
            <div className="p-4 sm:p-8 text-center">
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="relative">
                  {isSpeaking && (
                    <>
                      <div className="absolute inset-0 -m-6 sm:-m-8 bg-orange-500 rounded-full opacity-20 animate-ping"></div>
                      <div
                        className="absolute inset-0 -m-8 sm:-m-12 bg-red-500 rounded-full opacity-10 animate-ping"
                        style={{ animationDelay: '0.3s' }}
                      ></div>
                      <div
                        className="absolute inset-0 -m-10 sm:-m-16 bg-pink-500 rounded-full opacity-5 animate-ping"
                        style={{ animationDelay: '0.6s' }}
                      ></div>
                    </>
                  )}
                  <div
                    className="relative w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 rounded-full shadow-2xl flex items-center justify-center transform transition-all duration-300"
                    style={{
                      boxShadow: isSpeaking
                        ? '0 0 40px rgba(251, 146, 60, 0.6), 0 0 60px rgba(239, 68, 68, 0.4)'
                        : '0 10px 40px rgba(239, 68, 68, 0.4)',
                    }}
                  >
                    <Home
                      className="w-12 h-12 sm:w-16 sm:h-16 text-white"
                      strokeWidth={2.5}
                    />
                    {isSpeaking && (
                      <div className="absolute bottom-2 right-2 bg-green-500 rounded-full p-1.5 sm:p-2">
                        <Radio
                          className="w-3 h-3 sm:w-4 sm:h-4 text-white animate-pulse"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <h3 className="text-white text-xl sm:text-2xl font-bold mb-2">
                Real Estate Agent
              </h3>
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-gray-400 text-xs sm:text-sm">Live Voice Call</p>
              </div>
              <div className="inline-flex items-center gap-2 bg-gray-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-white font-mono text-xs sm:text-sm">
                  {formatTime(callDuration)}
                </span>
              </div>
              <div className="mt-4 sm:mt-6 bg-gray-800 bg-opacity-50 backdrop-blur rounded-2xl p-3 sm:p-4 border border-gray-700">
                {isSpeaking ? (
                  <div className="flex items-center justify-center gap-2 sm:gap-3">
                    <Volume2
                      className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 animate-pulse"
                    />
                    <p className="text-gray-300 text-xs sm:text-sm">
                      Agent is speaking...
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 sm:gap-3">
                    <Mic
                      className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 animate-pulse"
                    />
                    <p className="text-gray-300 text-xs sm:text-sm">
                      Listening to you...
                    </p>
                  </div>
                )}
                {isSpeaking && (
                  <div className="flex items-center justify-center gap-1 mt-3 sm:mt-4">
                    <div
                      className="w-0.5 sm:w-1 bg-orange-500 rounded-full animate-wave"
                      style={{ height: '10px', animationDelay: '0s' }}
                    ></div>
                    <div
                      className="w-0.5 sm:w-1 bg-orange-500 rounded-full animate-wave"
                      style={{ height: '16px', animationDelay: '0.1s' }}
                    ></div>
                    <div
                      className="w-0.5 sm:w-1 bg-orange-500 rounded-full animate-wave"
                      style={{ height: '12px', animationDelay: '0.2s' }}
                    ></div>
                    <div
                      className="w-0.5 sm:w-1 bg-red-500 rounded-full animate-wave"
                      style={{ height: '20px', animationDelay: '0.3s' }}
                    ></div>
                    <div
                      className="w-0.5 sm:w-1 bg-red-500 rounded-full animate-wave"
                      style={{ height: '14px', animationDelay: '0.4s' }}
                    ></div>
                    <div
                      className="w-0.5 sm:w-1 bg-red-500 rounded-full animate-wave"
                      style={{ height: '10px', animationDelay: '0.5s' }}
                    ></div>
                    <div
                      className="w-0.5 sm:w-1 bg-pink-500 rounded-full animate-wave"
                      style={{ height: '16px', animationDelay: '0.6s' }}
                    ></div>
                  </div>
                )}
                <div
                  ref={containerRef}
                  className="mt-3 sm:mt-4 max-h-48 sm:max-h-64 overflow-y-auto"
                >
                  <p className="text-gray-300 text-xs sm:text-sm">
                    {transcripts || 'Your conversation will appear here...'}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 sm:p-6 bg-gray-900 bg-opacity-50 flex items-center justify-center gap-4 sm:gap-6">
              <button
                onClick={() => {
                  setIsMuted(!isMuted);
                  if (sessionRef.current) {
                    sessionRef.current.isSpeakerMuted
                      ? sessionRef.current.unmuteSpeaker()
                      : sessionRef.current.muteSpeaker();
                  }
                }}
                className={`p-4 sm:p-5 rounded-full transition-all duration-300 transform hover:scale-100 sm:hover:scale-110 ${
                  isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {isMuted ? (
                  <MicOff
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    strokeWidth={2.5}
                  />
                ) : (
                  <Mic
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    strokeWidth={2.5}
                  />
                )}
              </button>
              <button
                onClick={endCall}
                className="p-4 sm:p-6 bg-red-600 hover:bg-red-700 rounded-full transition-all duration-300 transform hover:scale-100 sm:hover:scale-110 shadow-xl"
              >
                <X
                  className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                  strokeWidth={2.5}
                />
              </button>
              <button
                onClick={() => setIsSpeaking(!isSpeaking)}
                className="p-4 sm:p-5 bg-gray-700 hover:bg-gray-600 rounded-full transition-all duration-300 transform hover:scale-100 sm:hover:scale-110"
              >
                <Volume2
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                  strokeWidth={2.5}
                />
              </button>
            </div>
            <div className="px-4 sm:px-6 pb-4 sm:pb-6">
              <p className="text-gray-500 text-xs sm:text-sm text-center">
                Speak naturally • The agent can hear you clearly
              </p>
            </div>
          </div>
        )}
        {showSuccess && !showVoiceCall && (
          <div
            className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 text-center"
            style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}
          >
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-green-400 rounded-full opacity-20 animate-ping"></div>
                <div className="relative bg-gradient-to-br from-green-400 to-emerald-600 rounded-full p-6 sm:p-8 shadow-2xl">
                  <Check
                    className="w-12 h-12 sm:w-16 sm:h-16 text-white"
                    strokeWidth={3}
                  />
                </div>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 mb-2">
                  Perfect!
                </h2>
                <p className="text-gray-600 text-base sm:text-lg">
                  Starting voice call...
                </p>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"></div>
                <div
                  className="w-3 h-3 bg-red-500 rounded-full animate-bounce"
                  style={{ animationDelay: '0.15s' }}
                ></div>
                <div
                  className="w-3 h-3 bg-pink-500 rounded-full animate-bounce"
                  style={{ animationDelay: '0.3s' }}
                ></div>
              </div>
            </div>
          </div>
        )}
        {!showSuccess && !showVoiceCall && (
          <div
            className="relative bg-gradient-to-br from-white via-orange-50 to-red-50 shadow-2xl p-6 sm:p-10 transform transition-all duration-700 hover:scale-100 sm:hover:scale-105 cursor-pointer"
            style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-400 via-red-400 to-orange-500 opacity-60 shadow-lg flex items-center justify-center"
              style={{
                borderRadius: '60% 40% 50% 50% / 50% 60% 40% 50%',
                animation: 'float 4s ease-in-out infinite',
              }}
            >
              <span className="text-white text-xl sm:text-2xl font-bold">5</span>
            </div>
            <div
              className="absolute -bottom-4 -left-4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-pink-400 via-orange-500 to-yellow-400 opacity-75 shadow-lg"
              style={{
                borderRadius: '50% 60% 40% 50% / 60% 50% 50% 40%',
                animation: 'float 5s ease-in-out infinite',
                animationDelay: '0.5s',
              }}
            ></div>
            <div className="flex flex-col items-center text-center space-y-6 relative z-10">
              <div className="relative">
                {isHovered && (
                  <div className="absolute -inset-4 sm:-inset-5 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 rounded-full opacity-25 animate-ping"></div>
                )}
                <div
                  className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 p-6 sm:p-8 shadow-2xl transform transition-all duration-700"
                  style={{
                    borderRadius: '45% 55% 52% 48% / 55% 48% 52% 45%',
                    transform: isHovered ? 'rotate(8deg) scale(1.08)' : 'rotate(0deg) scale(1)',
                  }}
                >
                  <Home
                    className="w-10 h-10 sm:w-12 sm:h-12 text-white relative z-10"
                    strokeWidth={2.5}
                  />
                  {isHovered && (
                    <>
                      <Sparkles
                        className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-6 h-6 sm:w-7 sm:h-7 text-yellow-300 animate-pulse"
                      />
                      <Star
                        className="absolute -bottom-2 -left-2 w-5 h-5 sm:w-6 sm:h-6 text-orange-300"
                        style={{ animation: 'spin 8s linear infinite' }}
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 tracking-tight leading-tight">
                  Real Estate
                </h1>
                <div className="flex items-center justify-center gap-2">
                  <svg
                    width="35"
                    height="8"
                    viewBox="0 0 35 8"
                    className="text-orange-500"
                  >
                    <path
                      d="M0 4 Q8.75 0, 17.5 4 T35 4"
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <p className="text-orange-600 font-bold text-xs tracking-widest uppercase px-3 sm:px-4 py-1.5 bg-gradient-to-r from-orange-100 to-red-100 rounded-full shadow-sm border border-orange-200">
                    Use Case For
                  </p>
                  <svg
                    width="35"
                    height="8"
                    viewBox="0 0 35 8"
                    className="text-orange-500"
                  >
                    <path
                      d="M0 4 Q8.75 0, 17.5 4 T35 4"
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-gray-700 text-base sm:text-xl font-semibold leading-relaxed max-w-xs">
                Residential Listings & Seller Leads
              </p>
              <button
                disabled={isLoading}
                className="relative text-white px-8 sm:px-10 py-4 sm:py-5 font-bold shadow-2xl transform hover:scale-100 sm:hover:scale-110 transition-all duration-500 flex items-center gap-3 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, #f97316, #ef4444, #ec4899)',
                  borderRadius: '45px 25px 45px 25px',
                }}
                onClick={handleStartDemo}
                onMouseDown={createRipple}
              >
                {ripples.map((ripple) => (
                  <span
                    key={ripple.id}
                    className="absolute bg-white rounded-full"
                    style={{
                      left: ripple.x,
                      top: ripple.y,
                      width: 0,
                      height: 0,
                      opacity: 0.3,
                      animation: 'ripple 0.6s ease-out',
                    }}
                  />
                ))}
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 sm:w-6 sm:h-6 border-3 border-white border-t-transparent rounded-full animate-spin relative z-10"></div>
                    <span className="relative z-10 text-base sm:text-lg tracking-wide">
                      Connecting...
                    </span>
                  </>
                ) : (
                  <>
                    <Mic
                      className="w-5 h-5 sm:w-6 sm:h-6 relative z-10"
                      strokeWidth={2.5}
                    />
                    <span className="relative z-10 text-base sm:text-lg tracking-wide">
                      Start Talking
                    </span>
                    <ChevronRight
                      className="w-5 h-5 sm:w-6 sm:h-6 relative z-10"
                      strokeWidth={2.5}
                    />
                  </>
                )}
              </button>
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 pt-4">
                <div
                  className="flex items-center gap-2 bg-gradient-to-br from-green-50 to-emerald-50 px-3 sm:px-4 py-2 sm:py-2.5 transform hover:scale-100 sm:hover:scale-110 transition-all duration-300 shadow-md border border-green-100"
                  style={{ borderRadius: '18px 22px 20px 24px' }}
                >
                  <div className="relative">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-green-700 font-bold text-xs">Live Voice</span>
                </div>
                <div
                  className="flex items-center gap-2 bg-gradient-to-br from-blue-50 to-cyan-50 px-3 sm:px-4 py-2 sm:py-2.5 transform hover:scale-100 sm:hover:scale-110 transition-all duration-300 shadow-md border border-blue-100"
                  style={{ borderRadius: '24px 20px 22px 18px' }}
                >
                  <Volume2
                    className="w-4 h-4 text-blue-600"
                    strokeWidth={3}
                  />
                  <span className="text-blue-700 font-bold text-xs">Real-time</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(180deg); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes ripple {
          to {
            width: 150px;
            height: 150px;
            opacity: 0;
            margin: -75px 0 0 -75px;
          }
        }
        @keyframes wave {
          0%, 100% { height: 10px; }
          50% { height: 4px; }
        }
        @media (max-width: 640px) {
          .rounded-3xl {
            border-radius: 1.5rem;
          }
          .rounded-2xl {
            border-radius: 1rem;
          }
          .rounded-full {
            border-radius: 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default WebCall;