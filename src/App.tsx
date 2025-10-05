import React from 'react';
import { Check, Calendar, FileText, Phone, MessageCircle, Monitor, ArrowRight } from 'lucide-react';

import RealEstateWidget from './components/AICall';
import AutomatedFollowUpWidget from './components/FollowUp';
import AIInfluencerWidget from './components/Influencer';
import FormCaptureWidget from './components/LeadCapture';
import WebCall from './components/WebCall';

// Define the interface for step objects
interface Step {
  number: number;
  title: string;
  description: string;
  features: string[];
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  component: React.ComponentType;
}

const App: React.FC = () => {
  const steps: Step[] = [
    {
      number: 1,
      title: "AI Influencer Runs Your Ads",
      description: "Your AI social media influencer (Maya) creates and posts engaging content across platforms, running targeted ads that drive traffic to your funnel.",
      features: [
        "Creates 30+ posts monthly",
        "Runs targeted ad campaigns", 
        "Engages with audience 24/7"
      ],
      icon: Calendar,
      component: AIInfluencerWidget,
    },
    {
      number: 2,
      title: "Prospect Fills Out Form",
      description: "Interested prospects click your ad and complete the lead form with their information. The system instantly captures and routes the data.",
      features: [
        "Instant data capture",
        "Automatic CRM sync",
        "Zero manual data entry"
      ],
      icon: FileText,
      component: FormCaptureWidget,
    },
    {
      number: 3,
      title: "AI Calls Within 3 Minutes", 
      description: "Maya calls the lead immediately, qualifies them with natural conversation, handles objections, and books a qualified appointment on your calendar.",
      features: [
        "Instant callback within 3 minutes",
        "Natural human-like conversation",
        "Books appointment automatically"
      ],
      icon: Phone,
      component: RealEstateWidget,
    },
    {
      number: 4,
      title: "Automated Follow-Up Sequence",
      description: "Maya sends personalized follow-ups via WhatsApp, SMS, and email. She nurtures leads with 12+ touchpoints until they book or opt out.",
      features: [
        "WhatsApp, SMS, Email sequences",
        "Personalized messaging", 
        "12+ touchpoints until conversion"
      ],
      icon: MessageCircle,
      component: AutomatedFollowUpWidget,
    },
    {
      number: 5,
      title: "AI Receptionist Answers Everything",
      description: "Your AI receptionist handles all incoming calls and inquiries 24/7, routes to the right department, and ensures zero missed opportunities.",
      features: [
        "24/7 call coverage",
        "Smart call routing",
        "Zero missed calls"
      ],
      icon: Monitor,
      component: WebCall,
    }
  ];

  const crmLogos: string[] = ["Salesforce", "HubSpot", "GoHighLevel", "Pipedrive"];

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-flow-cream via-flow-light-cream to-flow-dark-cream py-20 px-5 overflow-hidden lg:py-32">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute w-[1000px] h-[1000px] -top-[500px] -right-[400px] rounded-full bg-gradient-radial from-flow-orange/10 to-transparent blur-[160px] animate-float-orb" />
        <div className="absolute w-[800px] h-[800px] -bottom-[400px] -left-[300px] rounded-full bg-gradient-radial from-flow-orange/10 to-transparent blur-[160px] animate-float-orb-delayed" />
        <div className="absolute w-[600px] h-[600px] top-1/2 right-[30%] rounded-full bg-gradient-radial from-flow-orange/10 to-transparent blur-[160px] animate-float-orb-delayed-2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up lg:mb-24">
          <h2 className="font-jakarta font-black text-4xl text-flow-text-primary mb-7 tracking-tight leading-tight md:text-5xl lg:text-7xl">
            How It Works
          </h2>
          <p className="text-xl font-semibold text-flow-text-secondary max-w-4xl mx-auto leading-relaxed md:text-2xl lg:text-3xl">
            Watch your AI workforce capture, qualify, and convert leads automatically across all channels
          </p>
        </div>

        {/* Flow Steps */}
        <div className="relative max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Step Container */}
              <div
                className={`grid gap-12 items-center mb-16 animate-fade-in-up lg:grid-cols-2 lg:gap-20 lg:mb-24 ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Step Content */}
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  {/* Step Number Badge */}
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-flow-orange to-flow-dark-orange rounded-full text-3xl font-black text-white mb-7 animate-pulse-ring md:w-20 md:h-20 md:text-4xl">
                    {step.number}
                  </div>

                  {/* Title and Description */}
                  <h3 className="font-jakarta font-black text-2xl text-flow-text-primary mb-6 tracking-tight leading-tight md:text-3xl lg:text-4xl">
                    {step.title}
                  </h3>
                  <p className="text-lg font-medium text-flow-text-secondary mb-8 leading-relaxed md:text-xl">
                    {step.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3">
                    {step.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-3 p-3 bg-flow-orange/8 rounded-xl border-l-4 border-flow-orange transition-all duration-300 hover:bg-flow-orange/15 hover:translate-x-2 hover:shadow-lg hover:shadow-flow-orange/15 md:p-4"
                      >
                        <div className="flex items-center justify-center w-6 h-6 bg-flow-orange rounded-full flex-shrink-0 shadow-lg shadow-flow-orange/30">
                          <Check className="w-3 h-3 text-white stroke-[3]" />
                        </div>
                        <span className="text-base font-bold text-flow-text-primary md:text-lg">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step Visual */}
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className="group relative bg-white rounded-3xl p-10 shadow-2xl border border-black/5 min-h-[440px] flex items-center justify-center overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-flow-orange/20 hover:shadow-3xl hover:border-flow-orange/15">
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-flow-orange/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    
                    {/* Component Render */}
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                      <step.component />
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrow Connector (except for last step) */}
              {index < steps.length - 1 && (
                <div className="flex flex-col items-center absolute left-1/2 -bottom-12 transform -translate-x-1/2 z-20 lg:-bottom-20">
                  <div className="w-1 h-12 bg-gradient-to-b from-flow-orange to-flow-dark-orange rounded-full mb-2 md:h-16" />
                  <div className="w-0 h-0 border-l-[14px] border-r-[14px] border-t-[18px] border-l-transparent border-r-transparent border-t-flow-orange animate-bounce-arrow" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="relative text-center bg-gradient-to-br from-white to-flow-light-cream rounded-3xl p-16 shadow-2xl border-2 border-flow-orange/20 overflow-hidden mt-20 lg:p-20">
          {/* Rotating Background */}
          <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-radial from-flow-orange/8 to-transparent animate-rotate-slow" />
          
          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-flow-orange to-flow-dark-orange text-white px-8 py-3 rounded-full text-sm font-black uppercase tracking-wider mb-9 animate-badge-pulse">
              <span>Seamless Integration</span>
            </div>

            {/* Title and Subtitle */}
            <h3 className="font-jakarta font-black text-3xl text-flow-text-primary mb-7 tracking-tight leading-tight md:text-4xl lg:text-5xl">
              Connects With Your Favorite CRM
            </h3>
            <p className="text-xl font-semibold text-flow-text-secondary mb-14 max-w-3xl mx-auto leading-relaxed md:text-2xl">
              All data syncs automatically to your existing tools—no manual work, no switching platforms
            </p>

            {/* CRM Logos */}
            <div className="flex justify-center items-center gap-6 flex-wrap mb-14 lg:gap-12">
              {crmLogos.map((crm, index) => (
                <div
                  key={index}
                  className="group relative font-jakarta font-black text-lg text-flow-text-primary bg-white px-10 py-5 rounded-2xl shadow-xl border border-black/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-flow-orange/20 hover:shadow-2xl hover:border-flow-orange/20 md:text-xl md:px-12 md:py-6"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-flow-orange/10 to-transparent opacity-0 rounded-2xl transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="relative z-10">{crm}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <a
              href="https://myteam.ravan.ai/book"
              className="group relative inline-flex items-center gap-5 bg-gradient-to-r from-flow-orange to-flow-dark-orange text-white px-16 py-7 rounded-2xl font-jakarta text-xl font-black transition-all duration-500 hover:-translate-y-2 hover:scale-105 hover:shadow-flow-orange/70 hover:shadow-3xl overflow-hidden md:text-2xl md:px-20 md:py-8"
            >
              {/* Shimmer Effect */}
              <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-all duration-700 group-hover:left-full" />
              
              <span className="relative z-10">Book a Free Demo Call</span>
              <ArrowRight className="w-6 h-6 stroke-2 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;