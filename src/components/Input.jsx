import { Eye, EyeOff, ChevronDown } from "lucide-react";
import React, { useState } from "react";

function Input({
  label,
  value,
  onChange,
  placeholder,
  type,
  name,
  isSelect,
  options,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="mb-6">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      <div className="relative">
        {isSelect ? (
          <div className="relative">
            <select
              value={value}
              onChange={(e) => onChange(e)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={`w-full bg-white outline-none border border-gray-300 rounded-xl py-3 px-4 text-gray-800 transition-all duration-300 appearance-none cursor-pointer
                ${isFocused ? 'border-purple-500 ring-4 ring-purple-100 shadow-sm' : 'hover:border-gray-400'}
                focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100`}
            >
              <option value="" disabled className="text-gray-400">
                Select an option
              </option>

              {options.map((option) => (
                <option key={option.value} value={option.value} className="text-gray-800">
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown 
              size={18} 
              className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none transition-transform duration-300 ${
                isFocused ? 'rotate-180 text-purple-600' : ''
              }`} 
            />
          </div>
        ) : (
          <div className="relative">
            <input
              id={name}
              name={name}
              type={inputType}
              value={value}
              onChange={onChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholder}
              className={`w-full bg-white border border-gray-300 rounded-xl py-3 px-4 text-gray-800 transition-all duration-300
                ${isFocused ? 'border-purple-500 ring-4 ring-purple-100 shadow-sm' : 'hover:border-gray-400'}
                focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100
                placeholder:text-gray-400 placeholder:text-sm`}
            />
          </div>
        )}

        {type === "password" && (
          <button
            type="button"
            className={`absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-all duration-300 cursor-pointer
              ${isFocused ? 'text-purple-600 bg-purple-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
            onClick={toggleShowPassword}
          >
            {showPassword ? (
              <Eye size={20} className="transition-transform duration-300 hover:scale-110" />
            ) : (
              <EyeOff size={20} className="transition-transform duration-300 hover:scale-110" />
            )}
          </button>
        )}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        /* Custom select arrow hiding for modern browsers */
        select {
          background-image: none;
        }
        
        select::-ms-expand {
          display: none;
        }
        
        /* Mobile responsiveness */
        @media (max-width: 640px) {
          .rounded-xl {
            border-radius: 12px;
          }
          
          .py-3 {
            padding-top: 0.875rem;
            padding-bottom: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Input;