// src/pages/Signup.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { assets } from "../assets/assets";
import { validateEmail } from "../Util/validateEmail";
import axiosConfig from "../Util/axiosConfig";
import { toast } from "react-hot-toast";
import { API_ENDPOINTS } from "../Util/apiEndpoints";
import { LoaderCircle, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import  '../pagesCSS/signup.css'
import ProfilePhotoSector from "../context1/ProfilePhotoSector";
import uploadProfileImage from "../Util/uploadProfileImage";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!fullName.trim()) {
      setError("Please enter your full name");
      setIsLoading(false);
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      setIsLoading(false);
      return;
    }
    if (!password.trim()) {
      setError("Please enter a password");
      setIsLoading(false);
      return;
    }

    setError("");

    try {
      let profileImageUrl = "";
      if (profilePhoto) {
        const uploadedUrl = await uploadProfileImage(profilePhoto);
        profileImageUrl = uploadedUrl || "";
      }

      const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });

      if (response.status === 201) {
        setIsSuccess(true);
        setTimeout(() => {
          toast.success("Profile created successfully");
          navigate("/login");
        }, 1500);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Error in signup:", err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="relative z-10 w-full max-w-md px-6">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center animate-scale-in">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Account Created Successfully!
            </h3>
            <p className="text-gray-600 mb-6">
              Welcome to our community! Redirecting you to login...
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full animate-progress"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl px-6">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto animate-slide-up">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
              Join Our Community
            </h3>
            <p className="text-gray-600 text-lg">
              Start your financial journey with us today
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Illustration */}
            <div className="hidden lg:block">
              <div className="relative">
                <img
                  src={assets.login_bg}
                  alt="Signup Illustration"
                  className="w-full h-96 object-cover rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h4 className="text-xl font-semibold mb-2">
                    Smart Spending Starts Here
                  </h4>
                  <p className="text-sm opacity-90">
                    Track, analyze, and optimize your expenses effortlessly
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Profile Photo */}
                <div className="flex justify-center mb-6">
                  <ProfilePhotoSector
                    image={profilePhoto}
                    setImage={setProfilePhoto}
                  />
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    label="Full Name"
                    type="text"
                    icon="user"
                    required
                  />
                  
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    label="Email Address"
                    type="email"
                    icon="mail"
                    required
                  />
                  
                  <div className="relative">
                    <Input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a strong password"
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      icon="lock"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-10 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="animate-shake bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-red-700 text-sm font-medium text-center">
                      {error}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  disabled={isLoading}
                  className={`
                    w-full py-4 px-6 rounded-xl font-semibold text-lg
                    bg-gradient-to-r from-blue-600 to-purple-600
                    hover:from-blue-700 hover:to-purple-700
                    transform hover:scale-105 transition-all duration-200
                    shadow-lg hover:shadow-xl
                    flex items-center justify-center gap-3
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                    text-white
                  `}
                  type="submit"
                >
                  {isLoading ? (
                    <>
                      <LoaderCircle className="animate-spin w-6 h-6" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Create Account
                    </>
                  )}
                </button>

                {/* Login Link */}
                <p className="text-center text-gray-600 mt-6">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-blue-600 hover:text-blue-700 underline transition-colors duration-200"
                  >
                    Sign In
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;