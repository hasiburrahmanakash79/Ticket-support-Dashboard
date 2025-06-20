import { useState, useRef } from "react";
import logo from "../../assets/logo/logo.png";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import apiClient from "../../lib/api-client";
import { setCookie } from "../../lib/cookie-utils";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const lastSubmitTimeRef = useRef(0); // for debounce

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    const now = Date.now();
    if (now - lastSubmitTimeRef.current < 2000) {
      // ⛔ Prevent multiple rapid submissions
      return;
    }
    lastSubmitTimeRef.current = now;

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await apiClient.post("/auth/login", data);

      if (res?.data?.data?.accessToken) {
        const accessToken = res.data.data.accessToken;
        const refreshToken = res.data.data.refreshToken;

        setCookie("accessToken", accessToken, { maxAge: 30 * 60 }); // 30 mins
        setCookie("refreshToken", refreshToken, { maxAge: 7 * 24 * 60 * 60 }); // 7 days

        navigate("/");
      } else {
        setErrorMsg("Invalid response from server.");
      }
    } catch (err) {
      console.log(err);
      if (err.response?.status === 429) {
        setErrorMsg("Too many attempts. Please wait a moment and try again.");
      } else if (err.response?.data?.message) {
        setErrorMsg(err.response.data.message);
      } else {
        setErrorMsg("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Prevent form submission on Enter if loading
  const handleKeyDown = (e) => {
    if (loading && e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side */}
      <div className="w-1/2 bg-blue-500 flex items-center justify-center p-8">
        <img src={logo} alt="Logo" className="w-44" />
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="max-w-xl w-full p-20 relative">
          <p className="text-center text-sm text-gray-700 mb-2">Welcome</p>
          <h2 className="text-center text-3xl font-semibold mb-6 text-gray-800">
            Sign in Your Account
          </h2>

          {errorMsg && (
            <p className="text-red-600 text-center text-sm mb-4">{errorMsg}</p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown} className="space-y-4">
            {/* Email */}
            <input
              type="email"
              placeholder="Enter Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-4 py-2 rounded-md border border-blue-200 outline-none"
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email.message}</p>
            )}

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                })}
                placeholder="Enter your Password"
                className="w-full px-4 py-2 rounded-md border border-blue-200 outline-none"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-gray-300"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}

            {/* Forgot Password
            <div className="flex items-center justify-end text-sm">
              <a
                href="/forgot-password"
                className="text-blue-500 hover:underline text-end"
              >
                Forgot Password?
              </a>
            </div> */}

            {/* Submit */}
            <button
              type="submit"
              className={`w-full bg-blue-500 hover:shadow-xl duration-500 text-white font-semibold py-2 rounded-md ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
