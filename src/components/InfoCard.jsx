import React, { useState, useEffect } from 'react';

const InfoCard = ({ icon, label, value, color }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Animate the number counting up
    if (value && value > 0) {
      const duration = 1500;
      const steps = 60;
      const stepValue = value / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        setDisplayValue(Math.min(Math.floor(stepValue * currentStep), value));
        
        if (currentStep >= steps) {
          setDisplayValue(value);
          clearInterval(timer);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    } else {
      setDisplayValue(value || 0);
    }
  }, [value]);

  return (
    <div className={`transform transition-all duration-700 ease-out ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
    }`}>
      <div className="flex gap-6 bg-white p-6 rounded-2xl shadow-lg shadow-gray-100/50 border border-gray-200/50 hover:shadow-xl hover:shadow-gray-200/50 hover:border-gray-300/70 transition-all duration-500 group hover:scale-[1.02]">
        <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-lg group-hover:scale-110 group-hover:drop-shadow-xl transition-all duration-500`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h6 className="text-sm text-gray-500 mb-2 font-medium tracking-wide">{label}</h6>
          <div className="text-[22px] font-bold text-gray-800 transition-all duration-300 group-hover:text-gray-900">
            &#8377;{displayValue?.toLocaleString() || '0'}
          </div>
        </div>
        
        {/* Subtle background pattern */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Mobile responsiveness */
        @media (max-width: 640px) {
          .flex.gap-6 {
            gap: 1rem;
            padding: 1.25rem;
          }
          
          .w-14.h-14 {
            width: 3rem;
            height: 3rem;
          }
          
          .text-\\[26px\\] {
            font-size: 1.375rem;
          }
          
          .text-\\[22px\\] {
            font-size: 1.25rem;
          }
        }
        
        @media (max-width: 480px) {
          .flex.gap-6 {
            gap: 0.875rem;
            padding: 1rem;
          }
          
          .w-14.h-14 {
            width: 2.75rem;
            height: 2.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default InfoCard;