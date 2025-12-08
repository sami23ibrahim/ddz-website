import React, { useState, useEffect } from 'react';

const WelcomePopup = ({ showOnce = true }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (showOnce) {
      const hasSeenPopup = localStorage.getItem('hasSeenWelcomePopup');
      if (!hasSeenPopup) {
        const timer = setTimeout(() => setIsVisible(true), 500);
        return () => clearTimeout(timer);
      }
    } else {
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, [showOnce]);

  const handleClose = () => {
    setIsVisible(false);
    if (showOnce) {
      localStorage.setItem('hasSeenWelcomePopup', 'true');
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-fadeIn"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Popup */}
      <div className="relative animate-scaleIn max-w-[95vw] md:max-w-[85vw] lg:max-w-[70vw]">
        {/* Close button - Bold X */}
        <button 
          onClick={handleClose}
          className="absolute -top-4 -right-4 md:-top-5 md:-right-5 z-10 bg-white hover:bg-red-500 hover:text-white text-black rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-xl transition-all duration-200 border-2 border-gray-200 hover:border-red-500"
          aria-label="Close popup"
        >
          <span className="text-2xl md:text-3xl font-black leading-none">✕</span>
        </button>

        {/* Image */}
        <img 
          src="/Assets/Open-time-xmas.png" 
          alt="Christmas Opening Times"
          className="w-full max-h-[80vh] md:max-h-[85vh] object-contain rounded-lg shadow-2xl"
        />
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { 
            opacity: 0; 
            transform: scale(0.9); 
          }
          to { 
            opacity: 1; 
            transform: scale(1); 
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default WelcomePopup;

