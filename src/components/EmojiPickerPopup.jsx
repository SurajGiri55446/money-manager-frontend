import EmojiPicker from "emoji-picker-react";
import { Image, X, Smile } from "lucide-react";
import React, { useState } from "react";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmojiClick = (emojiData) => {
    onSelect(emojiData?.imageUrl || ""); // this depends on the emoji picker version
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
      <div
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-4 cursor-pointer group transition-all duration-300"
      >
        <div className="w-14 h-14 flex items-center justify-center text-2xl bg-gradient-to-br from-purple-50 to-blue-50 text-purple-500 rounded-xl border border-purple-200 shadow-sm group-hover:shadow-md group-hover:scale-105 group-hover:border-purple-300 transition-all duration-300">
          {icon ? (
            <img src={icon} alt="Icon" className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
          ) : (
            <Smile size={24} className="transition-transform duration-300 group-hover:scale-110" />
          )}
        </div>
        <div>
          <p className="font-medium text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
            {icon ? "Change icon" : "Pick Icon"}
          </p>
          <p className="text-sm text-gray-500 mt-1">Click to select an emoji</p>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 animate-scaleIn">
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white rounded-t-2xl">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <Smile size={18} className="text-purple-500" />
                Choose an Emoji
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center bg-white hover:bg-gray-100 border border-gray-200 hover:border-gray-300 rounded-full transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md hover:scale-105 active:scale-95 text-gray-500 hover:text-gray-700"
              >
                <X size={16} />
              </button>
            </div>
            
            <div className="p-2">
              <EmojiPicker 
                onEmojiClick={handleEmojiClick}
                width={350}
                height={400}
              />
            </div>
            
            <div className="p-3 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
              <p className="text-xs text-gray-500 text-center">
                Click on any emoji to select it
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }
        
        /* Mobile responsiveness */
        @media (max-width: 640px) {
          .flex-col.md\\:flex-row {
            gap: 1rem;
          }
          
          .w-14.h-14 {
            width: 3.5rem;
            height: 3.5rem;
          }
          
          .EmojiPickerReact {
            width: 100% !important;
            max-width: 320px;
          }
        }
        
        @media (max-width: 480px) {
          .fixed.inset-0 {
            padding: 1rem;
          }
          
          .relative.bg-white {
            max-width: 95vw;
          }
          
          .EmojiPickerReact {
            height: 350px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default EmojiPickerPopup;