// src/context1/ProfilePhotoSector.js
import React, { useRef, useState, useEffect } from "react";
import { Upload, User, Trash, Loader2 } from "lucide-react";

function ProfilePhotoSector({ image, setImage }) {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setIsLoading(true);
    
    // Simulate processing delay for better UX
    setTimeout(() => {
      setImage(file);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(URL.createObjectURL(file));
      setIsLoading(false);
    }, 500);
  };

  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setImage(null);
    setPreviewUrl(null);
  };

  const triggerFileInput = (e) => {
    e.preventDefault();
    inputRef.current?.click();
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <div 
        className={`
          relative transition-all duration-300 ease-in-out
          ${isDragging ? 'scale-105 ring-4 ring-purple-300' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {!image ? (
          <div 
            className={`
              w-20 h-20 md:w-24 md:h-24 flex items-center justify-center 
              bg-gradient-to-br from-purple-100 to-blue-100 
              rounded-full relative cursor-pointer
              transition-all duration-300 ease-in-out
              hover:shadow-lg hover:scale-105
              border-2 border-dashed border-purple-200
              ${isDragging ? 'border-purple-400 bg-purple-50' : ''}
            `}
            onClick={triggerFileInput}
            title="Click to upload or drag and drop"
          >
            {isLoading ? (
              <div className="flex flex-col items-center justify-center">
                <Loader2 className="text-purple-500 animate-spin" size={20} />
                <span className="text-xs text-purple-500 mt-1">Uploading...</span>
              </div>
            ) : (
              <>
                <User className="text-purple-500 transition-transform duration-300 hover:scale-110" size={30} />
                <button
                  onClick={triggerFileInput}
                  className="
                    w-7 h-7 md:w-8 md:h-8 flex items-center justify-center 
                    bg-gradient-to-r from-purple-600 to-blue-600 
                    text-white rounded-full absolute -bottom-1 -right-1
                    shadow-md transition-all duration-300
                    hover:shadow-lg hover:scale-110 hover:from-purple-700 hover:to-blue-700
                    active:scale-95
                  "
                >
                  <Upload size={12} className="md:size-14" />
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="relative group">
            <div className="relative">
              <img
                src={previewUrl}
                alt="Profile preview"
                className="
                  w-20 h-20 md:w-24 md:h-24 rounded-full object-cover 
                  cursor-pointer transition-all duration-300
                  group-hover:brightness-75 group-hover:scale-105
                  shadow-md group-hover:shadow-lg
                "
                onClick={triggerFileInput}
              />
              
              {/* Overlay on hover */}
              <div 
                className="
                  absolute inset-0 bg-black bg-opacity-0 
                  rounded-full transition-all duration-300
                  group-hover:bg-opacity-40 flex items-center justify-center
                  cursor-pointer
                "
                onClick={triggerFileInput}
              >
                <Upload 
                  className="
                    text-white opacity-0 transform scale-50 
                    transition-all duration-300
                    group-hover:opacity-100 group-hover:scale-100
                  " 
                  size={20} 
                />
              </div>
            </div>
            
            <button
              onClick={handleRemove}
              className="
                w-7 h-7 md:w-8 md:h-8 flex items-center justify-center 
                bg-gradient-to-r from-red-600 to-red-700
                text-white rounded-full absolute -bottom-1 -right-1
                shadow-md transition-all duration-300
                hover:shadow-lg hover:scale-110 hover:from-red-700 hover:to-red-800
                active:scale-95
                group-hover:scale-110
              "
              title="Remove photo"
            >
              <Trash size={12} className="md:size-14" />
            </button>
          </div>
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full bg-black bg-opacity-30 rounded-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
            </div>
          </div>
        )}
      </div>

      {/* Instructions text */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
        <p className="text-xs text-gray-500 text-center whitespace-nowrap">
          {!image ? "Click to upload or drag & drop" : "Click to change photo"}
        </p>
      </div>
    </div>
  );
}

export default ProfilePhotoSector;