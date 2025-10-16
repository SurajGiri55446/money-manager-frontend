import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import Input from "../components/Input"; 
import { assets } from "../assets/assets";
import { validateEmail } from "../Util/validateEmail";
import { API_ENDPOINTS } from "../Util/apiEndpoints";
import axiosConfig from "../Util/axiosConfig";
import { AppContext } from "../context1/AppContext";
import { LoaderCircle, Eye, EyeOff, LogIn, Mail, Lock } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { setUser } = useContext(AppContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password");
      setIsLoading(false);
      return;
    }

    setError("");

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

      if (token) {
        setIsSuccess(true);
        setTimeout(() => {
          localStorage.setItem("token", token);
          setUser(user);
          navigate("/dashboard");
        }, 1500);
      }

    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        console.error('Something went wrong', error.message);
        setError("Unable to connect to server. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="relative z-10 w-full max-w-md px-6">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center animate-scale-in">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
                <LogIn className="w-12 h-12 text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Login Successful!
            </h3>
            <p className="text-gray-600 mb-6">
              Welcome back! Redirecting to your dashboard...
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Welcome Section */}
            <div className="hidden lg:block">
              <div className="relative group">
                <img
                  src={assets.login_bg}
                  alt="Login Illustration"
                  className="w-full h-96 object-cover rounded-2xl shadow-lg transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h4 className="text-xl font-semibold mb-2">
                    Welcome Back!
                  </h4>
                  <p className="text-sm opacity-90">
                    Continue your financial journey with us
                  </p>
                </div>
              </div>
              
              {/* Features List */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Track your expenses seamlessly</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Analyze spending patterns</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm">Achieve your financial goals</span>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div>
              {/* Header */}
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                  Welcome Back
                </h3>
                <p className="text-gray-600 text-lg">
                  Sign in to continue your journey
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-4">
                  <div className="relative">
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      label="Email Address"
                      type="email"
                      required
                    />
                  
                  </div>

                  {/* Password Field */}
                  <div className="relative">
                    <Input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      required
                    />
                  
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                    </button>
                  </div>
                </div>

               

                {/* Error Message */}
                {error && (
                  <div className="animate-shake bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-red-700 text-sm font-medium text-center">
                     Account is not active. Please activate your account via the email!
                    </p>
                  </div>
                )}

                {/* Login Button */}
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
                    ${isLoading ? 'animate-pulse' : ''}
                  `}
                  type="submit"
                >
                  {isLoading ? (
                    <>
                      <LoaderCircle className="animate-spin w-6 h-6" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5" />
                      Sign In
                    </>
                  )}
                </button>

                {/* Sign Up Link */}
                <p className="text-center text-gray-600 mt-6">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-semibold text-blue-600 hover:text-blue-700 underline transition-colors duration-200"
                  >
                    Create Account
                  </Link>
                </p>

                {/* Quick Demo Info */}
                <div className="text-center">
                  <p className="text-xs text-gray-500 mt-4">
                    Demo: Use any registered credentials to test the login
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;