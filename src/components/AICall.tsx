// RealEstateWidget.jsx
import React, { useState, useEffect } from "react";
import {
  Phone,
  ChevronRight,
  Check,
  Sparkles,
  Star,
  User,
  Mail,
  Globe,
  X,
  PhoneCall,
  Clock,
  PhoneIncoming,
  Volume2,
  FileText,
} from "lucide-react";
import axios from "axios";

export default function RealEstateWidget() {
  const [isHovered, setIsHovered] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCalling, setShowCalling] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+1",
  });
  const [userCountry, setUserCountry] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [callStatus, setCallStatus] = useState("preparing");
  const [quickCampId, setQuickCampId] = useState(null);
  const [callData, setCallData] = useState(null);
  const [pollingInterval, setPollingInterval] = useState(null);

  const countries = [
    { code: "+1", country: "US", flag: "🇺🇸", name: "United States" },
    { code: "+91", country: "IN", flag: "🇮🇳", name: "India" },
    { code: "+44", country: "GB", flag: "🇬🇧", name: "United Kingdom" },
    { code: "+61", country: "AU", flag: "🇦🇺", name: "Australia" },
    { code: "+86", country: "CN", flag: "🇨🇳", name: "China" },
    { code: "+49", country: "DE", flag: "🇩🇪", name: "Germany" },
    { code: "+33", country: "FR", flag: "🇫🇷", name: "France" },
    { code: "+81", country: "JP", flag: "🇯🇵", name: "Japan" },
    { code: "+7", country: "RU", flag: "🇷🇺", name: "Russia" },
    { code: "+55", country: "BR", flag: "🇧🇷", name: "Brazil" },
    { code: "+971", country: "AE", flag: "🇦🇪", name: "UAE" },
    { code: "+65", country: "SG", flag: "🇸🇬", name: "Singapore" },
  ];

  useEffect(() => {
    const getUserCountry = async () => {
      try {
        const response = await axios.get("https://ipapi.co/json/");
        const country = countries.find(
          (c) => c.country === response.data.country_code
        );
        if (country) {
          setUserCountry(country);
          setFormData((prev) => ({ ...prev, countryCode: country.code }));
        }
      } catch (error) {
        console.log("Using default country");
      }
    };
    getUserCountry();
  }, []);

  useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [pollingInterval]);

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const initiateCall = async () => {
    try {
      const payload = {
        email: formData.email,
        receiver_number: `${formData.countryCode}${formData.phone}`,
        name: formData.name,
        access_key: "testmycall",
        calling_number: "+18582520325",
        new_agent: 164,
      };

      const response = await axios.post(
        "https://app.closerx.ai/api/testcall/voizerfreeaccount/",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (
        response.data.success &&
        response.data.data &&
        response.data.data.quickcamp_id
      ) {
        setQuickCampId(response.data.data.quickcamp_id);
        return response.data.data.quickcamp_id;
      } else {
        throw new Error("Failed to initiate call");
      }
    } catch (error) {
      console.error("Error initiating call:", error);
      alert("Failed to initiate call. Please try again.");
      return null;
    }
  };

  const checkCallStatus = async (campId) => {
    try {
      const payload = {
        quick_camp_result_id: campId.toString(),
        "Company-Name": "voizerfreeaccount",
      };

      const response = await axios.post(
        "https://app.closerx.ai/api/quick-campaign-results/",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success && response.data.data) {
        setCallData(response.data.data);

        const status = response.data.data.status.toLowerCase();

        if (status === "queued" || status === "ringing") {
          setCallStatus("calling");
        } else if (status === "in-progress" || status === "answered") {
          setCallStatus("connected");
        } else if (
          status === "completed" ||
          status === "no-answer" ||
          status === "busy" ||
          status === "failed"
        ) {
          if (
            response.data.data.transcription_text ||
            response.data.data.recording_url
          ) {
            setCallStatus("completed");
            if (pollingInterval) {
              clearInterval(pollingInterval);
              setPollingInterval(null);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error checking call status:", error);
    }
  };

  const handleSubmit = async () => {
    console.log("handleSubmit called");
    setIsSubmitting(true);

    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in all fields");
      setIsSubmitting(false);
      return;
    }

    const campId = await initiateCall();

    if (campId) {
      setIsSubmitting(false);
      setShowForm(false);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        setShowCalling(true);
        startCallMonitoring(campId);
      }, 2000);
    } else {
      setIsSubmitting(false);
    }
  };

  const startCallMonitoring = async (campId) => {
    setCallStatus("calling");

    await checkCallStatus(campId);

    const interval = setInterval(() => {
      checkCallStatus(campId);
    }, 3000);

    setPollingInterval(interval);
  };

  const formatTranscription = (transcription) => {
    if (!transcription) return [];
    if (Array.isArray(transcription)) return transcription;
    try {
      return JSON.parse(transcription);
    } catch {
      return [];
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 flex items-center justify-center bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <div className="w-full max-w-sm sm:max-w-md mx-auto relative z-10">
        {showCalling && (
          <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-800">
            <div className="p-4 sm:p-8">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  {callStatus === "calling" && (
                    <>
                      <div className="absolute inset-0 -m-6 bg-orange-500 rounded-full opacity-20 animate-ping sm:-m-8"></div>
                      <div
                        className="absolute inset-0 -m-8 bg-red-500 rounded-full opacity-10 animate-ping sm:-m-12"
                        style={{ animationDelay: "0.3s" }}
                      ></div>
                    </>
                  )}

                  {callStatus === "connected" && (
                    <div className="absolute inset-0 -m-6 bg-green-500 rounded-full opacity-20 animate-ping sm:-m-8"></div>
                  )}

                  <div
                    className={`relative w-24 h-24 sm:w-32 sm:h-32 rounded-full shadow-2xl flex items-center justify-center transform transition-all duration-500 ${
                      callStatus === "connected"
                        ? "bg-gradient-to-br from-green-500 to-emerald-600"
                        : callStatus === "completed"
                        ? "bg-gradient-to-br from-blue-500 to-cyan-600"
                        : "bg-gradient-to-br from-orange-500 to-red-600"
                    }`}
                    style={{
                      animation:
                        callStatus === "calling"
                          ? "pulse 1.5s ease-in-out infinite"
                          : "none",
                    }}
                  >
                    {callStatus === "connected" ? (
                      <PhoneCall
                        className="w-12 h-12 sm:w-16 sm:h-16 text-white"
                        strokeWidth={2.5}
                      />
                    ) : callStatus === "completed" ? (
                      <Check
                        className="w-12 h-12 sm:w-16 sm:h-16 text-white"
                        strokeWidth={3}
                      />
                    ) : (
                      <PhoneIncoming
                        className="w-12 h-12 sm:w-16 sm:h-16 text-white animate-bounce"
                        strokeWidth={2.5}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-6 text-center">
                <h3 className="text-white text-xl sm:text-2xl font-bold mb-2">
                  {callStatus === "preparing" && "Preparing call..."}
                  {callStatus === "calling" && "Calling you now..."}
                  {callStatus === "connected" && "Call Connected!"}
                  {callStatus === "completed" && "Call Completed"}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm mb-4">
                  {callStatus === "calling" &&
                    `Dialing ${formData.countryCode} ${formData.phone}`}
                  {callStatus === "connected" &&
                    "Our AI agent is speaking with you"}
                  {callStatus === "completed" && "Call summary is ready"}
                </p>
              </div>

              <div className="inline-flex items-center gap-3 bg-gray-800 px-4 sm:px-6 py-2 sm:py-3 rounded-2xl mb-6 border border-gray-700 mx-auto block w-fit">
                <Phone
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${
                    callStatus === "connected"
                      ? "text-green-500"
                      : callStatus === "completed"
                      ? "text-blue-500"
                      : "text-orange-500"
                  }`}
                  strokeWidth={2.5}
                />
                <span className="text-white font-mono text-sm sm:text-lg">
                  {formData.countryCode} {formData.phone}
                </span>
              </div>

              {callStatus === "calling" && (
                <div className="bg-orange-900 bg-opacity-30 backdrop-blur rounded-2xl p-4 border border-orange-800 mb-6">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <Clock
                      className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 animate-spin"
                      strokeWidth={2.5}
                    />
                    <p className="text-orange-300 text-xs sm:text-sm font-semibold">
                      Please answer your phone
                    </p>
                  </div>
                  <div className="flex justify-center gap-1">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.15s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.3s" }}
                    ></div>
                  </div>
                </div>
              )}

              {callStatus === "connected" && (
                <div className="bg-green-900 bg-opacity-30 backdrop-blur rounded-2xl p-4 sm:p-6 border border-green-800 mb-6">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Check
                      className="w-5 h-5 sm:w-6 sm:h-6 text-green-400"
                      strokeWidth={3}
                    />
                    <p className="text-green-300 font-semibold text-sm sm:text-base">
                      Call in progress
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-1 mb-4">
                    <div
                      className="w-1 bg-green-500 rounded-full animate-pulse"
                      style={{ height: "12px", animationDelay: "0s" }}
                    ></div>
                    <div
                      className="w-1 bg-green-500 rounded-full animate-pulse"
                      style={{ height: "20px", animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-1 bg-green-500 rounded-full animate-pulse"
                      style={{ height: "16px", animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-1 bg-emerald-500 rounded-full animate-pulse"
                      style={{ height: "24px", animationDelay: "0.3s" }}
                    ></div>
                    <div
                      className="w-1 bg-emerald-500 rounded-full animate-pulse"
                      style={{ height: "18px", animationDelay: "0.4s" }}
                    ></div>
                    <div
                      className="w-1 bg-emerald-500 rounded-full animate-pulse"
                      style={{ height: "14px", animationDelay: "0.5s" }}
                    ></div>
                    <div
                      className="w-1 bg-green-400 rounded-full animate-pulse"
                      style={{ height: "20px", animationDelay: "0.6s" }}
                    ></div>
                  </div>

                  <p className="text-gray-300 text-xs sm:text-sm text-center">
                    AI agent is speaking with you on your phone
                  </p>
                </div>
              )}

              {callStatus === "completed" && callData && (
                <div className="space-y-4">
                  {callData.recording_url && (
                    <div className="bg-blue-900 bg-opacity-30 backdrop-blur rounded-2xl p-4 sm:p-6 border border-blue-800">
                      <div className="flex items-center gap-3 mb-4">
                        <Volume2
                          className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400"
                          strokeWidth={2.5}
                        />
                        <h4 className="text-blue-300 font-bold text-base sm:text-lg">
                          Call Recording
                        </h4>
                      </div>
                      <audio
                        controls
                        className="w-full"
                        src={callData.recording_url}
                      >
                        Your browser does not support the audio element.
                      </audio>
                      <a
                        href={callData.recording_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-3 text-blue-400 hover:text-blue-300 text-xs sm:text-sm"
                      >
                        <span>Download Recording</span>
                        <ChevronRight className="w-4 h-4" />
                      </a>
                    </div>
                  )}

                  {callData.transcription_text && (
                    <div className="bg-purple-900 bg-opacity-30 backdrop-blur rounded-2xl p-4 sm:p-6 border border-purple-800">
                      <div className="flex items-center gap-3 mb-4">
                        <FileText
                          className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400"
                          strokeWidth={2.5}
                        />
                        <h4 className="text-purple-300 font-bold text-base sm:text-lg">
                          Transcription
                        </h4>
                      </div>
                      <div className="bg-gray-800 bg-opacity-50 rounded-xl p-4 max-h-64 overflow-y-auto">
                        {formatTranscription(callData.transcription_text).map(
                          (item, index) => (
                            <div key={index} className="mb-3 last:mb-0">
                              <p className="text-gray-400 text-xs sm:text-sm mb-1">
                                {item.speaker || "Speaker"}
                              </p>
                              <p className="text-white text-xs sm:text-sm">
                                {item.text || item.message}
                              </p>
                            </div>
                          )
                        )}
                        {!formatTranscription(callData.transcription_text)
                          .length && (
                          <p className="text-white text-xs sm:text-sm">
                            {callData.transcription_text}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {!callData.transcription_text && !callData.recording_url && (
                    <div className="bg-gray-800 bg-opacity-50 backdrop-blur rounded-2xl p-4 sm:p-6 border border-gray-700 text-center">
                      <p className="text-gray-400 text-xs sm:text-sm">
                        AI Call demo in progress...
                      </p>
                      <p className="text-gray-500 text-xs sm:text-sm mt-2">
                        Waiting for call summary and recording
                      </p>
                    </div>
                  )}

                  {callData.call_duration > 0 && (
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-gray-800 bg-opacity-50 rounded-xl p-3 border border-gray-700">
                        <p className="text-gray-400 text-xs mb-1">Duration</p>
                        <p className="text-white text-xs sm:text-sm font-semibold">
                          {callData.call_duration}s
                        </p>
                      </div>
                      <div className="bg-gray-800 bg-opacity-50 rounded-xl p-3 border border-gray-700">
                        <p className="text-gray-400 text-xs mb-1">Status</p>
                        <p className="text-white text-xs sm:text-sm font-semibold capitalize">
                          {callData.status}
                        </p>
                      </div>
                      <div className="bg-gray-800 bg-opacity-50 rounded-xl p-3 border border-gray-700">
                        <p className="text-gray-400 text-xs mb-1">Outcome</p>
                        <p className="text-white text-xs sm:text-sm font-semibold">
                          {callData.outcome || "N/A"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {callStatus !== "completed" && callData && (
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-gray-800 bg-opacity-50 rounded-xl p-3 border border-gray-700">
                    <p className="text-gray-400 text-xs mb-1">Contact</p>
                    <p className="text-white text-xs sm:text-sm font-semibold truncate">
                      {formData.name}
                    </p>
                  </div>
                  <div className="bg-gray-800 bg-opacity-50 rounded-xl p-3 border border-gray-700">
                    <p className="text-gray-400 text-xs mb-1">Status</p>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          callStatus === "connected"
                            ? "bg-green-500"
                            : "bg-orange-500"
                        } animate-pulse`}
                      ></div>
                      <p className="text-white text-xs sm:text-sm font-semibold capitalize">
                        {callData.status}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {callStatus === "calling" && (
                <button
                  onClick={() => {
                    setShowCalling(false);
                    if (pollingInterval) {
                      clearInterval(pollingInterval);
                      setPollingInterval(null);
                    }
                  }}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-100 sm:hover:scale-105 mx-auto block"
                >
                  Cancel
                </button>
              )}

              {callStatus === "completed" && (
                <button
                  onClick={() => {
                    setShowCalling(false);
                    setCallData(null);
                    setQuickCampId(null);
                    setCallStatus("preparing");
                  }}
                  className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-100 sm:hover:scale-105 mx-auto block"
                >
                  Start New Call
                </button>
              )}
            </div>
          </div>
        )}

        {showSuccess && !showCalling && (
          <div
            className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 text-center"
            style={{
              borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            }}
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
                  Got it!
                </h2>
                <p className="text-gray-600 text-base sm:text-lg">
                  Initiating AI call to your phone...
                </p>
              </div>

              <div className="flex gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"></div>
                <div
                  className="w-3 h-3 bg-red-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.15s" }}
                ></div>
                <div
                  className="w-3 h-3 bg-pink-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.3s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {showForm && !showSuccess && !showCalling && (
          <div
            className="bg-white rounded-3xl shadow-2xl border border-gray-200 relative"
            style={{ zIndex: 1 }}
          >
            <button
              onClick={handleCloseForm}
              className="absolute -top-4 -right-4 bg-white text-gray-600 hover:text-gray-900 rounded-full p-2 sm:p-3 shadow-xl hover:shadow-2xl transition-all hover:rotate-90 duration-300 border border-gray-200"
              style={{ zIndex: 100 }}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <div className="bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 rounded-t-3xl p-6 sm:p-8 text-center relative">
              <div className="inline-flex items-center justify-center bg-white bg-opacity-20 backdrop-blur rounded-2xl p-3 sm:p-4 mb-4">
                <PhoneCall
                  className="w-8 h-8 sm:w-10 sm:h-10 text-white"
                  strokeWidth={2.5}
                />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Get a Call
              </h2>
              <p className="text-orange-50 text-sm sm:text-base">
                AI will call you in 30 seconds!
              </p>
            </div>

            <div
              className="p-6 sm:p-8 space-y-6"
              style={{ position: "relative", zIndex: 10 }}
            >
              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-bold text-gray-700 ml-1">
                  Your Name
                </label>
                <div
                  className={`relative transition-all duration-300 ${
                    focusedField === "name" ? "scale-100 sm:scale-105" : ""
                  }`}
                >
                  <div
                    className={`absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                      focusedField === "name"
                        ? "text-orange-500"
                        : "text-gray-400"
                    }`}
                  >
                    <User className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="John Doe"
                    className="w-full pl-12 sm:pl-14 pr-4 sm:pr-5 py-3 sm:py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:bg-white focus:outline-none transition-all duration-300 text-gray-900 font-medium placeholder:text-gray-400 text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-bold text-gray-700 ml-1">
                  Email Address
                </label>
                <div
                  className={`relative transition-all duration-300 ${
                    focusedField === "email" ? "scale-100 sm:scale-105" : ""
                  }`}
                >
                  <div
                    className={`absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                      focusedField === "email"
                        ? "text-orange-500"
                        : "text-gray-400"
                    }`}
                  >
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="john@example.com"
                    className="w-full pl-12 sm:pl-14 pr-4 sm:pr-5 py-3 sm:py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:bg-white focus:outline-none transition-all duration-300 text-gray-900 font-medium placeholder:text-gray-400 text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-bold text-gray-700 ml-1">
                  Phone Number
                </label>
                <div className="flex gap-3">
                  <div
                    className={`relative w-28 sm:w-36 transition-all duration-300 ${
                      focusedField === "country" ? "scale-100 sm:scale-105" : ""
                    }`}
                  >
                    <div
                      className={`absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-300 ${
                        focusedField === "country"
                          ? "text-orange-500"
                          : "text-gray-400"
                      }`}
                    >
                      <Globe
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        strokeWidth={2.5}
                      />
                    </div>
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("country")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pl-10 sm:pl-12 pr-2 sm:pr-3 py-3 sm:py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:bg-white focus:outline-none transition-all duration-300 appearance-none cursor-pointer text-gray-900 font-medium text-sm sm:text-base"
                    >
                      {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.flag} {country.code}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div
                    className={`relative flex-1 transition-all duration-300 ${
                      focusedField === "phone" ? "scale-100 sm:scale-105" : ""
                    }`}
                  >
                    <div
                      className={`absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                        focusedField === "phone"
                          ? "text-orange-500"
                          : "text-gray-400"
                      }`}
                    >
                      <Phone
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        strokeWidth={2.5}
                      />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="123 456 7890"
                      className="w-full pl-12 sm:pl-14 pr-4 sm:pr-5 py-3 sm:py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:bg-white focus:outline-none transition-all duration-300 text-gray-900 font-medium placeholder:text-gray-400 text-sm sm:text-base"
                    />
                  </div>
                </div>
                {userCountry && (
                  <p className="text-xs text-gray-500 flex items-center gap-1 ml-1 mt-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    Detected: {userCountry.name}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleSubmit();
                }}
                disabled={isSubmitting}
                style={{
                  background:
                    "linear-gradient(135deg, #f97316, #ef4444, #f97316)",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                }}
                className="w-full text-white py-4 sm:py-5 rounded-2xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-100 sm:hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-60 mt-8 text-base sm:text-lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 sm:w-6 sm:h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <PhoneCall
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      strokeWidth={2.5}
                    />
                    <span>Call Me Now</span>
                    <ChevronRight
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      strokeWidth={2.5}
                    />
                  </>
                )}
              </button>

              <p className="text-xs text-center text-gray-500 pt-2">
                🔒 Your phone number is safe and will only be used for this call
              </p>
            </div>
          </div>
        )}

        {!showForm && !showSuccess && !showCalling && (
          <div
            className="relative bg-gradient-to-br from-white via-orange-50 to-red-50 shadow-2xl p-6 sm:p-10 transform transition-all duration-700 hover:scale-100 sm:hover:scale-105 cursor-pointer"
            style={{
              borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className="absolute -top-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-400 via-red-400 to-orange-500 opacity-60 shadow-lg flex items-center justify-center"
              style={{
                borderRadius: "60% 40% 50% 50% / 50% 60% 40% 50%",
                animation: "float 4s ease-in-out infinite",
              }}
            >
              <span className="text-white text-xl sm:text-2xl font-bold">3</span>
            </div>
            <div
              className="absolute -bottom-4 -left-4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-300 via-red-400 to-orange-400 opacity-50 shadow-lg"
              style={{
                borderRadius: "50% 60% 40% 50% / 60% 50% 50% 40%",
                animation: "float 5s ease-in-out infinite",
                animationDelay: "0.5s",
              }}
            ></div>

            <div className="flex flex-col items-center text-center space-y-6 relative z-10">
              <div className="relative">
                {isHovered && (
                  <div className="absolute -inset-4 sm:-inset-5 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 rounded-full opacity-25 animate-ping"></div>
                )}

                <div
                  className="relative bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 p-6 sm:p-8 shadow-2xl transform transition-all duration-700 rounded-full"
                  style={{
                    transform: isHovered ? "scale(1.08)" : "scale(1)",
                  }}
                >
                  <PhoneCall
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
                        style={{ animation: "spin 8s linear infinite" }}
                      />
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-orange-500 tracking-tight leading-tight">
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
                  <p className="text-orange-600 font-bold text-xs tracking-widest uppercase px-4 py-1.5 bg-orange-50 rounded-full shadow-sm border border-orange-200">
                    USE CASE FOR
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
                className="relative text-white px-8 sm:px-10 py-4 sm:py-5 font-bold shadow-2xl transform hover:scale-100 sm:hover:scale-110 transition-all duration-500 flex items-center gap-3 overflow-hidden rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, #f97316, #ef4444, #f97316)",
                }}
                onClick={handleOpenForm}
              >
                <Phone
                  className="w-5 h-5 sm:w-6 sm:h-6 relative z-10"
                  strokeWidth={2.5}
                />
                <span className="relative z-10 text-base sm:text-lg tracking-wide">
                  Try Demo
                </span>
                <ChevronRight
                  className="w-5 h-5 sm:w-6 sm:h-6 relative z-10"
                  strokeWidth={2.5}
                />
              </button>

              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 pt-4">
                <div className="flex items-center gap-2 bg-white px-3 sm:px-4 py-2 sm:py-2.5 transform hover:scale-100 sm:hover:scale-110 transition-all duration-300 shadow-md border border-orange-100 rounded-xl">
                  <PhoneIncoming
                    className="w-4 h-4 text-orange-600"
                    strokeWidth={3}
                  />
                  <span className="text-orange-700 font-bold text-xs">
                    AI Calls You
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-white px-3 sm:px-4 py-2 sm:py-2.5 transform hover:scale-100 sm:hover:scale-110 transition-all duration-300 shadow-md border border-green-100 rounded-xl">
                  <Clock
                    className="w-4 h-4 text-green-600"
                    strokeWidth={3}
                  />
                  <span className="text-green-700 font-bold text-xs">
                    30 Seconds
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-12px) rotate(180deg);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
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