import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import authBg from "assets/images/auth-bg.jpg";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("login");

  const switchToLogin = () => {
    setActiveTab("login");
  };

  return (
    <>
      <Navbar />
      <div
        className="min-h-[700px] bg-gray-100 flex justify-center items-center"
        style={{
          backgroundImage: `url(${authBg})`,
        }}
      >
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          {/* Tabs for switching between Login and Signup */}
          <div className="flex justify-between mb-6">
            <button
              onClick={() => setActiveTab("login")}
              className={`text-lg font-bold px-4 py-2 ${activeTab === "login"
                  ? "text-[#9d1111] border-b-4 border-[#9d1111]"
                  : "text-gray-500"
                }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={`text-lg font-bold px-4 py-2 ${activeTab === "signup"
                  ? "text-[#9d1111] border-b-4 border-[#9d1111]"
                  : "text-gray-500"
                }`}
            >
              Signup
            </button>
          </div>

          {/* Conditional Form Display */}
          {activeTab === "login" ? (
            <LoginForm />
          ) : (
            <SignupForm switchToLogin={switchToLogin} />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage or cookies
        localStorage.setItem("token", data.token);
        // Store some user data in localStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        // Redirect to dashboard
        if (data.user.role === "admin") {
          navigate("/dashboard/admin");
        } else {
          navigate("/dashboard");
        }
      } else {
        // Handle errors (display error message)
        Swal.fire("Error", data.error || "Login failed!", "error");
      }
    } catch (error) {
      console.error("Login Error:", error);
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9d1111]"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9d1111]"
        />
      </div>
      <div className="flex justify-between items-center mb-6">
        <a href="/#" className="text-sm text-[#9d1111] hover:underline">
          Forgot Password?
        </a>
      </div>
      <button className="w-full bg-[#9d1111] text-white py-2 rounded-md hover:bg-red-700 transition duration-300">
        Login
      </button>
    </form>
  );
};

const SignupForm = ({ switchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire("Error", "Passwords do not match!", "error");
      return;
    }

    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Show success message using SweetAlert
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: data.message,
          confirmButtonText: "Proceed to Login",
        }).then(() => {
          // Switch to Login tab after success
          switchToLogin();
        });
      } else {
        // Handle errors (display error message)
        Swal.fire("Error", data.error || "Signup failed!", "error");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <div className="mb-4">
        <label className="block text-gray-700">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9d1111]"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9d1111]"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9d1111]"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9d1111]"
        />
      </div>
      <button className="w-full bg-[#9d1111] text-white py-2 rounded-md hover:bg-red-700 transition duration-300">
        Signup
      </button>
    </form>
  );
};

export default AuthPage;
