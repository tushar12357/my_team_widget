import React, { useState, useEffect } from 'react';
import { MessageCircle, Mail, Phone, Check, Clock, Send, Zap, PhoneCall, Activity, Calendar, Bell, TrendingUp, X } from 'lucide-react';

export default function AutomatedFollowUpWidget() {
  const [showSequence, setShowSequence] = useState(false);
  const [currentTouchpoint, setCurrentTouchpoint] = useState(0);
  const [sentMessages, setSentMessages] = useState([]);
  const [sequenceStats, setSequenceStats] = useState({
    calls: 0,
    whatsapp: 0,
    sms: 0,
    emails: 0
  });

  const touchpoints = [
    { type: 'whatsapp', channel: 'WhatsApp', icon: MessageCircle, message: 'Hi! Thanks for your interest in our real estate services. How can I help you today?', time: 'Immediately', delay: 0, color: 'bg-green-500' },
    
    { type: 'ai_call', channel: 'AI Call', icon: PhoneCall, message: 'Initial discovery call to understand your requirements', time: 'Day 1 - 10:00 AM', delay: 1000, color: 'bg-orange-500' },
    
    { type: 'sms', channel: 'SMS', icon: Phone, message: 'Quick follow-up: Did you get a chance to review the properties I mentioned?', time: 'Day 1 - 2:00 PM', delay: 1200, color: 'bg-blue-500' },
    
    { type: 'ai_call', channel: 'AI Call', icon: PhoneCall, message: 'Evening check-in to answer any questions', time: 'Day 1 - 5:15 PM', delay: 1400, color: 'bg-orange-500' },
    
    { type: 'email', channel: 'Email', icon: Mail, message: 'Detailed property listings matching your criteria with photos and pricing', time: 'Day 1 - 8:00 PM', delay: 1600, color: 'bg-purple-500' },
    
    { type: 'ai_call', channel: 'AI Call', icon: PhoneCall, message: 'Morning follow-up on property listings sent', time: 'Day 2 - 10:00 AM', delay: 1800, color: 'bg-orange-500' },
    
    { type: 'whatsapp', channel: 'WhatsApp', icon: MessageCircle, message: 'Sharing virtual tour links and neighborhood insights', time: 'Day 2 - 12:00 PM', delay: 2000, color: 'bg-green-500' },
    
    { type: 'ai_call', channel: 'AI Call', icon: PhoneCall, message: 'Scheduling viewing appointments discussion', time: 'Day 2 - 5:15 PM', delay: 2200, color: 'bg-orange-500' },
    
    { type: 'sms', channel: 'SMS', icon: Phone, message: 'Reminder: Limited-time special offer on selected properties!', time: 'Day 3 - 11:00 AM', delay: 2400, color: 'bg-blue-500' },
    
    { type: 'email', channel: 'Email', icon: Mail, message: 'Success stories: Recent clients who found their dream homes', time: 'Day 3 - 3:00 PM', delay: 2600, color: 'bg-purple-500' },
    
    { type: 'ai_call', channel: 'AI Call', icon: PhoneCall, message: 'Personalized consultation on financing options', time: 'Day 4 - 10:00 AM', delay: 2800, color: 'bg-orange-500' },
    
    { type: 'whatsapp', channel: 'WhatsApp', icon: MessageCircle, message: 'Market trends and investment opportunities in your area', time: 'Day 4 - 2:00 PM', delay: 3000, color: 'bg-green-500' },
    
    { type: 'ai_call', channel: 'AI Call', icon: PhoneCall, message: 'Addressing concerns and next steps discussion', time: 'Day 4 - 5:15 PM', delay: 3200, color: 'bg-orange-500' },
    
    { type: 'sms', channel: 'SMS', icon: Phone, message: 'New listing alert matching your preferences!', time: 'Day 5 - 9:00 AM', delay: 3400, color: 'bg-blue-500' },
    
    { type: 'email', channel: 'Email', icon: Mail, message: 'Comprehensive area guide: Schools, amenities, and community info', time: 'Day 5 - 1:00 PM', delay: 3600, color: 'bg-purple-500' },
    
    { type: 'ai_call', channel: 'AI Call', icon: PhoneCall, message: 'Weekly check-in and property viewing coordination', time: 'Day 7 - 10:00 AM', delay: 3800, color: 'bg-orange-500' },
    
    { type: 'whatsapp', channel: 'WhatsApp', icon: MessageCircle, message: 'Exclusive preview: Properties before they hit the market', time: 'Day 7 - 4:00 PM', delay: 4000, color: 'bg-green-500' },
    
    { type: 'ai_call', channel: 'AI Call', icon: PhoneCall, message: 'Evening follow-up on exclusive listings', time: 'Day 7 - 5:15 PM', delay: 4200, color: 'bg-orange-500' },
    
    { type: 'email', channel: 'Email', icon: Mail, message: 'Mortgage calculator and financing options breakdown', time: 'Day 10 - 10:00 AM', delay: 4400, color: 'bg-purple-500' },
    
    { type: 'ai_call', channel: 'AI Call', icon: PhoneCall, message: 'Mid-week consultation on shortlisted properties', time: 'Day 10 - 10:00 AM', delay: 4600, color: 'bg-orange-500' },
    
    { type: 'sms', channel: 'SMS', icon: Phone, message: 'Price drop alert on properties in your wishlist!', time: 'Day 12 - 2:00 PM', delay: 4800, color: 'bg-blue-500' },
    
    { type: 'ai_call', channel: 'AI Call', icon: PhoneCall, message: 'Afternoon check-in on price drop opportunities', time: 'Day 12 - 5:15 PM', delay: 5000, color: 'bg-orange-500' },
    
    { type: 'whatsapp', channel: 'WhatsApp', icon: MessageCircle, message: 'Comparison sheet: Top 3 properties based on your criteria', time: 'Day 14 - 11:00 AM', delay: 5200, color: 'bg-green-500' },
    
    { type: 'ai_call', channel: 'AI Call', icon: PhoneCall, message: 'Two-week review and next action items', time: 'Day 14 - 10:00 AM', delay: 5400, color: 'bg-orange-500' },
    
    { type: 'email', channel: 'Email', icon: Mail, message: 'Final recommendations and booking assistance', time: 'Day 15 - 9:00 AM', delay: 5600, color: 'bg-purple-500' },
    
    { type: 'ai_call', channel: 'AI Call', icon: PhoneCall, message: 'Final follow-up and feedback collection', time: 'Day 15 - 5:15 PM', delay: 5800, color: 'bg-orange-500' },
  ];

  useEffect(() => {
    if (showSequence && currentTouchpoint < touchpoints.length) {
      const touchpoint = touchpoints[currentTouchpoint];
      const timer = setTimeout(() => {
        setSentMessages(prev => [...prev, touchpoint]);
        
        setSequenceStats(prev => ({
          ...prev,
          calls: prev.calls + (touchpoint.type === 'ai_call' ? 1 : 0),
          whatsapp: prev.whatsapp + (touchpoint.type === 'whatsapp' ? 1 : 0),
          sms: prev.sms + (touchpoint.type === 'sms' ? 1 : 0),
          emails: prev.emails + (touchpoint.type === 'email' ? 1 : 0),
        }));
        
        setCurrentTouchpoint(prev => prev + 1);
      }, touchpoint.delay);
      return () => clearTimeout(timer);
    }
  }, [showSequence, currentTouchpoint]);

  const startSequence = () => {
    setShowSequence(true);
    setCurrentTouchpoint(0);
    setSentMessages([]);
    setSequenceStats({ calls: 0, whatsapp: 0, sms: 0, emails: 0 });
  };

  const closeSequence = () => {
    setShowSequence(false);
    setCurrentTouchpoint(0);
    setSentMessages([]);
    setSequenceStats({ calls: 0, whatsapp: 0, sms: 0, emails: 0 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-8">
      <div className="max-w-6xl mx-auto">
        
        {!showSequence ? (
          <div className="max-w-md mx-auto">
            <div 
              className="relative bg-gradient-to-br from-white via-orange-50 to-red-50 shadow-2xl p-10 transform transition-all duration-700 hover:scale-105"
              style={{
                borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
              }}
            >
              <div 
                className="absolute -top-5 -right-5 w-20 h-20 bg-gradient-to-br from-orange-400 via-red-400 to-orange-500 opacity-60 shadow-lg flex items-center justify-center"
                style={{ borderRadius: '60% 40% 50% 50% / 50% 60% 40% 50%', animation: 'float 4s ease-in-out infinite' }}
              >
                <span className="text-white text-2xl font-bold">4</span>
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
                
                <div className="relative">
                  <div 
                    className="relative bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 p-8 shadow-2xl transform transition-all duration-700 rounded-full"
                  >
                    <MessageCircle className="w-12 h-12 text-white relative z-10" strokeWidth={2.5} />
                  </div>
                </div>

                <div className="space-y-3">
                  <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-orange-500 tracking-tight leading-tight">
                    Follow-Up
                  </h1>
                  
                  <div className="flex items-center justify-center gap-2">
                    <svg width="35" height="8" viewBox="0 0 35 8" className="text-orange-500">
                      <path d="M0 4 Q8.75 0, 17.5 4 T35 4" stroke="currentColor" fill="none" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                    <p className="text-orange-600 font-bold text-xs tracking-widest uppercase px-4 py-1.5 bg-orange-50 rounded-full shadow-sm border border-orange-200">
                      Automation
                    </p>
                    <svg width="35" height="8" viewBox="0 0 35 8" className="text-orange-500">
                      <path d="M0 4 Q8.75 0, 17.5 4 T35 4" stroke="currentColor" fill="none" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>

                <p className="text-gray-700 text-xl font-semibold leading-relaxed max-w-xs">
                  Multi-Channel Nurture Sequence
                </p>

                <button
                  onClick={startSequence}
                  className="relative text-white px-10 py-5 font-bold shadow-2xl transform hover:scale-110 transition-all duration-500 flex items-center gap-3 overflow-hidden rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, #f97316, #ef4444, #f97316)',
                  }}
                >
                  <Zap className="w-6 h-6 relative z-10" strokeWidth={2.5} />
                  <span className="relative z-10 text-lg tracking-wide">Watch Demo</span>
                  <Send className="w-6 h-6 relative z-10" strokeWidth={2.5} />
                </button>

                <div className="flex items-center gap-5 pt-4">
                  <div className="flex items-center gap-2 bg-white px-4 py-2.5 transform hover:scale-110 transition-all duration-300 shadow-md border border-orange-100 rounded-xl">
                    <Activity className="w-4 h-4 text-orange-600" strokeWidth={3} />
                    <span className="text-orange-700 font-bold text-xs">Live Demo</span>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-white px-4 py-2.5 transform hover:scale-110 transition-all duration-300 shadow-md border border-blue-100 rounded-xl">
                    <Clock className="w-4 h-4 text-blue-600" strokeWidth={3} />
                    <span className="text-blue-700 font-bold text-xs">Preview Mode</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-800">
            
            <div className="bg-gradient-to-r from-orange-600 to-red-600 p-6 relative">
              <button
                onClick={closeSequence}
                className="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-2 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="flex items-center gap-4">
                <div className="bg-white bg-opacity-20 p-4 rounded-2xl">
                  <Activity className="w-10 h-10 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Live Sequence Monitor</h2>
                  <p className="text-orange-100 text-sm">Maya's Automated Follow-Up System</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              
              <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-br from-orange-900 to-orange-800 rounded-xl p-4 border border-orange-700">
                  <PhoneCall className="w-8 h-8 text-orange-300 mb-2" />
                  <div className="text-3xl font-bold text-white">{sequenceStats.calls}</div>
                  <div className="text-orange-300 text-sm">AI Calls</div>
                </div>
                
                <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-xl p-4 border border-green-700">
                  <MessageCircle className="w-8 h-8 text-green-300 mb-2" />
                  <div className="text-3xl font-bold text-white">{sequenceStats.whatsapp}</div>
                  <div className="text-green-300 text-sm">WhatsApp</div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl p-4 border border-blue-700">
                  <Phone className="w-8 h-8 text-blue-300 mb-2" />
                  <div className="text-3xl font-bold text-white">{sequenceStats.sms}</div>
                  <div className="text-blue-300 text-sm">SMS</div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-xl p-4 border border-purple-700">
                  <Mail className="w-8 h-8 text-purple-300 mb-2" />
                  <div className="text-3xl font-bold text-white">{sequenceStats.emails}</div>
                  <div className="text-purple-300 text-sm">Emails</div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Sequence Progress</span>
                  <span>{sentMessages.length} / {touchpoints.length} touchpoints completed</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 transition-all duration-500 rounded-full flex items-center justify-end pr-2"
                    style={{ width: `${(sentMessages.length / touchpoints.length) * 100}%` }}
                  >
                    {sentMessages.length > 0 && (
                      <span className="text-white text-xs font-bold">{Math.round((sentMessages.length / touchpoints.length) * 100)}%</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-2xl p-6 max-h-[500px] overflow-y-auto">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-orange-400" />
                  Activity Feed
                </h3>
                
                {sentMessages.length === 0 && (
                  <div className="text-center py-12">
                    <Clock className="w-16 h-16 text-gray-600 mx-auto mb-4 animate-spin" />
                    <p className="text-gray-400">Initializing automated sequence...</p>
                  </div>
                )}

                <div className="space-y-3">
                  {sentMessages.map((msg, idx) => {
                    const Icon = msg.icon;
                    return (
                      <div 
                        key={idx}
                        className="bg-gray-900 rounded-xl p-4 border border-gray-700 animate-slideIn"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-3 rounded-xl ${msg.color} bg-opacity-20 border border-current`}>
                            <Icon className={`w-6 h-6 ${msg.color.replace('bg-', 'text-')}`} strokeWidth={2.5} />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <span className={`font-bold ${msg.color.replace('bg-', 'text-')}`}>
                                {msg.channel}
                              </span>
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {msg.time}
                              </span>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed">{msg.message}</p>
                            <div className="mt-3 flex items-center gap-2">
                              <Check className="w-4 h-4 text-green-500" />
                              <span className="text-xs text-green-500 font-semibold">Delivered Successfully</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {currentTouchpoint >= touchpoints.length && (
                  <div className="mt-6 bg-gradient-to-br from-green-900 to-emerald-900 rounded-xl p-6 border border-green-700">
                    <div className="flex items-center gap-3 mb-4">
                      <TrendingUp className="w-8 h-8 text-green-400" />
                      <div>
                        <h4 className="text-white font-bold text-lg">Sequence Complete!</h4>
                        <p className="text-green-300 text-sm">All touchpoints executed successfully</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="bg-gray-900 bg-opacity-50 rounded-lg p-3">
                        <div className="text-2xl font-bold text-white">{touchpoints.length}</div>
                        <div className="text-green-300 text-xs">Total Touchpoints</div>
                      </div>
                      <div className="bg-gray-900 bg-opacity-50 rounded-lg p-3">
                        <div className="text-2xl font-bold text-white">15 Days</div>
                        <div className="text-green-300 text-xs">Duration</div>
                      </div>
                    </div>

                    <button
                      onClick={closeSequence}
                      className="mt-4 w-full bg-white text-green-700 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all"
                    >
                      Close & Return
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.4s ease-out forwards;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
}