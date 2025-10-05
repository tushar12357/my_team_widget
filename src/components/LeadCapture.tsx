import React, { useState, useEffect } from 'react';
import { FileText, Check, Zap, Send, Clock, Activity, Database, ArrowRight, X, User, Mail, Phone, Home, DollarSign, Sparkles } from 'lucide-react';

export default function FormCaptureWidget() {
  const [showDemo, setShowDemo] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    budget: ''
  });
  const [isTyping, setIsTyping] = useState(false);
  const [capturedData, setCapturedData] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncComplete, setSyncComplete] = useState(false);

  const demoData = {
    name: 'John Anderson',
    email: 'john.anderson@email.com',
    phone: '+1 (555) 123-4567',
    propertyType: '3-Bedroom House',
    budget: '$450,000 - $550,000'
  };

  const steps = [
    { id: 'form', title: 'Lead Form Submission', duration: 4000 },
    { id: 'capture', title: 'Instant Data Capture', duration: 1500 },
    { id: 'sync', title: 'CRM Synchronization', duration: 2000 },
    { id: 'complete', title: 'Process Complete', duration: 0 }
  ];

  useEffect(() => {
    if (showDemo) {
      if (currentStep === 0) {
        simulateFormFilling();
      } else if (currentStep === 1) {
        setTimeout(() => {
          setCapturedData(demoData);
          setTimeout(() => setCurrentStep(2), 1500);
        }, 500);
      } else if (currentStep === 2) {
        setIsSyncing(true);
        setTimeout(() => {
          setIsSyncing(false);
          setSyncComplete(true);
          setTimeout(() => setCurrentStep(3), 1000);
        }, 2000);
      }
    }
  }, [showDemo, currentStep]);

  const simulateFormFilling = async () => {
    setIsTyping(true);
    
    const fields = ['name', 'email', 'phone', 'propertyType', 'budget'];
    
    for (let i = 0; i < fields.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 700));
      setFormData(prev => ({
        ...prev,
        [fields[i]]: demoData[fields[i]]
      }));
    }
    
    setIsTyping(false);
    setTimeout(() => setCurrentStep(1), 800);
  };

  const startDemo = () => {
    setShowDemo(true);
    setCurrentStep(0);
    setFormData({ name: '', email: '', phone: '', propertyType: '', budget: '' });
    setCapturedData(null);
    setIsSyncing(false);
    setSyncComplete(false);
  };

  const closeDemo = () => {
    setShowDemo(false);
    setCurrentStep(0);
    setFormData({ name: '', email: '', phone: '', propertyType: '', budget: '' });
    setCapturedData(null);
    setIsSyncing(false);
    setSyncComplete(false);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-6">
      <div className="w-full flex items-center justify-center">
        
        {!showDemo ? (
          <div className="relative bg-gradient-to-br from-white via-orange-50 to-red-50 shadow-2xl p-8 transform transition-all duration-700 hover:scale-105 w-full" style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}>
            <div 
              className="absolute -top-5 -right-5 w-16 h-16 bg-gradient-to-br from-orange-400 via-red-400 to-orange-500 opacity-60 shadow-lg flex items-center justify-center rounded-full"
              style={{ animation: 'float 4s ease-in-out infinite' }}
            >
              <span className="text-white text-xl font-bold">2</span>
            </div>
            
            <div 
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-orange-300 via-red-400 to-orange-400 opacity-50 shadow-lg rounded-full"
              style={{ animation: 'float 5s ease-in-out infinite', animationDelay: '0.5s' }}
            ></div>
            
            <div className="flex flex-col items-center text-center space-y-6 relative z-10">
              <div className="relative">
                <div className="bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 p-6 rounded-full shadow-2xl">
                  <FileText className="w-10 h-10 text-white" strokeWidth={2.5} />
                </div>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-orange-500 tracking-tight leading-tight">
                  Form Fill
                </h1>
                <div className="flex items-center justify-center gap-2">
                  <svg width="30" height="7" viewBox="0 0 30 7" className="text-orange-500">
                    <path d="M0 3.5 Q7.5 0, 15 3.5 T30 3.5" stroke="currentColor" fill="none" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                  <p className="text-orange-600 font-bold text-xs tracking-widest uppercase px-3 py-1.5 bg-orange-50 rounded-full shadow-sm border border-orange-200">
                    Data Capture
                  </p>
                  <svg width="30" height="7" viewBox="0 0 30 7" className="text-orange-500">
                    <path d="M0 3.5 Q7.5 0, 15 3.5 T30 3.5" stroke="currentColor" fill="none" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>

              <p className="text-gray-700 text-lg font-semibold leading-relaxed max-w-xs">
                Instant Lead Processing System
              </p>

              <button
                onClick={startDemo}
                className="relative text-white px-6 py-3 font-bold shadow-2xl transform hover:scale-110 transition-all duration-500 flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-red-600"
              >
                <Zap className="w-5 h-5" strokeWidth={2.5} />
                <span className="text-base tracking-wide">Watch Demo</span>
                <Send className="w-5 h-5" strokeWidth={2.5} />
              </button>

              <div className="flex items-center gap-3 pt-4">
                <div className="flex items-center gap-2 bg-white px-3 py-2 transform hover:scale-110 transition-all duration-300 shadow-md border border-orange-100 rounded-xl">
                  <Activity className="w-4 h-4 text-orange-600" strokeWidth={3} />
                  <span className="text-orange-700 font-bold text-xs">Live Demo</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-2 transform hover:scale-110 transition-all duration-300 shadow-md border border-blue-100 rounded-xl">
                  <Clock className="w-4 h-4 text-blue-600" strokeWidth={3} />
                  <span className="text-blue-700 font-bold text-xs">Preview Mode</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 rounded-3xl shadow-2xl overflow-x-hidden overflow-y-auto border border-gray-800 w-full">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 p-4 relative">
              <button
                onClick={closeDemo}
                className="absolute top-2 right-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-1 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="flex items-center gap-2">
                <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                  <FileText className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Lead Capture System</h2>
                  <p className="text-orange-100 text-xs">Instant Data Processing Demo</p>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                {steps.map((step, idx) => (
                  <div key={step.id} className="flex items-center min-w-[60px]">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                        currentStep > idx ? 'bg-green-500 border-green-500' :
                        currentStep === idx ? 'bg-orange-500 border-orange-500 animate-pulse' :
                        'bg-gray-700 border-gray-600'
                      }`}>
                        {currentStep > idx ? (
                          <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
                        ) : (
                          <span className="text-white font-bold text-sm">{idx + 1}</span>
                        )}
                      </div>
                      <p className={`text-xs mt-1 text-center ${currentStep >= idx ? 'text-white' : 'text-gray-500'}`}>
                        {step.title.split(' ')[0]}
                      </p>
                    </div>
                    {idx < steps.length - 1 && (
                      <div className={`w-12 h-1 mx-1 transition-all duration-500 ${
                        currentStep > idx ? 'bg-green-500' : 'bg-gray-700'
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                  <h3 className="text-white font-bold text-sm mb-2 flex items-center gap-1">
                    <FileText className="w-4 h-4 text-orange-400" />
                    Lead Form
                  </h3>
                  
                  <div className="space-y-2">
                    <div>
                      <label className="text-gray-400 text-xs mb-0.5 block">Full Name</label>
                      <div className="bg-gray-900 rounded-lg p-2 border border-gray-700 flex items-center gap-1">
                        <User className="w-3 h-3 text-gray-500" />
                        <input 
                          type="text" 
                          value={formData.name}
                          readOnly
                          className="bg-transparent text-white outline-none flex-1 text-xs"
                          placeholder={isTyping && formData.name === '' ? 'Typing...' : 'Enter your name'}
                        />
                        {formData.name && <Check className="w-3 h-3 text-green-500" />}
                      </div>
                    </div>

                    <div>
                      <label className="text-gray-400 text-xs mb-0.5 block">Email Address</label>
                      <div className="bg-gray-900 rounded-lg p-2 border border-gray-700 flex items-center gap-1">
                        <Mail className="w-3 h-3 text-gray-500" />
                        <input 
                          type="email" 
                          value={formData.email}
                          readOnly
                          className="bg-transparent text-white outline-none flex-1 text-xs"
                          placeholder={isTyping && formData.email === '' && formData.name !== '' ? 'Typing...' : 'Enter your email'}
                        />
                        {formData.email && <Check className="w-3 h-3 text-green-500" />}
                      </div>
                    </div>

                    <div>
                      <label className="text-gray-400 text-xs mb-0.5 block">Phone Number</label>
                      <div className="bg-gray-900 rounded-lg p-2 border border-gray-700 flex items-center gap-1">
                        <Phone className="w-3 h-3 text-gray-500" />
                        <input 
                          type="tel" 
                          value={formData.phone}
                          readOnly
                          className="bg-transparent text-white outline-none flex-1 text-xs"
                          placeholder={isTyping && formData.phone === '' && formData.email !== '' ? 'Typing...' : 'Enter your phone'}
                        />
                        {formData.phone && <Check className="w-3 h-3 text-green-500" />}
                      </div>
                    </div>

                    <div>
                      <label className="text-gray-400 text-xs mb-0.5 block">Property Type</label>
                      <div className="bg-gray-900 rounded-lg p-2 border border-gray-700 flex items-center gap-1">
                        <Home className="w-3 h-3 text-gray-500" />
                        <input 
                          type="text" 
                          value={formData.propertyType}
                          readOnly
                          className="bg-transparent text-white outline-none flex-1 text-xs"
                          placeholder="Select property type"
                        />
                        {formData.propertyType && <Check className="w-3 h-3 text-green-500" />}
                      </div>
                    </div>

                    <div>
                      <label className="text-gray-400 text-xs mb-0.5 block">Budget Range</label>
                      <div className="bg-gray-900 rounded-lg p-2 border border-gray-700 flex items-center gap-1">
                        <DollarSign className="w-3 h-3 text-gray-500" />
                        <input 
                          type="text" 
                          value={formData.budget}
                          readOnly
                          className="bg-transparent text-white outline-none flex-1 text-xs"
                          placeholder="Select budget range"
                        />
                        {formData.budget && <Check className="w-3 h-3 text-green-500" />}
                      </div>
                    </div>

                    {currentStep === 0 && formData.budget && (
                      <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-2 rounded-lg font-bold flex items-center justify-center gap-1 text-xs">
                        <Send className="w-4 h-4" />
                        Submit
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  {currentStep >= 1 && (
                    <div className="bg-gradient-to-br from-green-900 to-emerald-900 rounded-lg p-3 border border-green-700 animate-slideIn">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-green-500 bg-opacity-20 p-2 rounded-lg">
                          <Sparkles className="w-5 h-5 text-green-400" strokeWidth={2} />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-sm">Data Captured!</h3>
                          <p className="text-green-300 text-xs">Lead information secured</p>
                        </div>
                      </div>

                      {capturedData && (
                        <div className="bg-gray-900 bg-opacity-50 rounded-lg p-2 space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-400">Name:</span>
                            <span className="text-white font-semibold">{capturedData.name}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-400">Email:</span>
                            <span className="text-white font-semibold truncate">{capturedData.email}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-400">Phone:</span>
                            <span className="text-white font-semibold">{capturedData.phone}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {currentStep >= 2 && (
                    <div className="bg-gradient-to-br from-blue-900 to-cyan-900 rounded-lg p-3 border border-blue-700 animate-slideIn">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`bg-blue-500 bg-opacity-20 p-2 rounded-lg ${isSyncing ? 'animate-pulse' : ''}`}>
                          <Database className="w-5 h-5 text-blue-400" strokeWidth={2} />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-sm">
                            {isSyncing ? 'Syncing to CRM...' : 'CRM Sync Complete!'}
                          </h3>
                          <p className="text-blue-300 text-xs">
                            {isSyncing ? 'Updating database' : 'Lead added to your system'}
                          </p>
                        </div>
                      </div>

                      {isSyncing && (
                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                            <span className="text-blue-300 text-xs">Creating contact record...</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <span className="text-blue-300 text-xs">Assigning to pipeline...</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                            <span className="text-blue-300 text-xs">Triggering automations...</span>
                          </div>
                        </div>
                      )}

                      {syncComplete && !isSyncing && (
                        <div className="bg-gray-900 bg-opacity-50 rounded-lg p-2">
                          <div className="flex items-center gap-1 text-green-400 mb-1">
                            <Check className="w-3 h-3" strokeWidth={2.5} />
                            <span className="text-xs font-semibold">Contact Created</span>
                          </div>
                          <div className="flex items-center gap-1 text-green-400 mb-1">
                            <Check className="w-3 h-3" strokeWidth={2.5} />
                            <span className="text-xs font-semibold">Added to Sales Pipeline</span>
                          </div>
                          <div className="flex items-center gap-1 text-green-400">
                            <Check className="w-3 h-3" strokeWidth={2.5} />
                            <span className="text-xs font-semibold">Follow-up Scheduled</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {currentStep >= 3 && (
                    <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-lg p-3 border border-purple-700 animate-slideIn">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-purple-500 bg-opacity-20 p-2 rounded-lg">
                          <ArrowRight className="w-5 h-5 text-purple-400" strokeWidth={2} />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-sm">Process Complete!</h3>
                          <p className="text-purple-300 text-xs">Lead is now in your system</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mb-2">
                        <div className="bg-gray-900 bg-opacity-50 rounded-lg p-1.5 text-center">
                          <div className="text-base font-bold text-white">0s</div>
                          <div className="text-purple-300 text-xs">Processing Time</div>
                        </div>
                        <div className="bg-gray-900 bg-opacity-50 rounded-lg p-1.5 text-center">
                          <div className="text-base font-bold text-white">100%</div>
                          <div className="text-purple-300 text-xs">Automated</div>
                        </div>
                        <div className="bg-gray-900 bg-opacity-50 rounded-lg p-1.5 text-center">
                          <div className="text-base font-bold text-white">0</div>
                          <div className="text-purple-300 text-xs">Manual Steps</div>
                        </div>
                      </div>

                      <button
                        onClick={closeDemo}
                        className="w-full bg-white text-purple-700 py-2 rounded-lg font-bold hover:bg-gray-100 transition-all text-xs"
                      >
                        Close & Return
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.5s ease-out forwards;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
}