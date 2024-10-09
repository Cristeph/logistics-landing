import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "components/Navbar";
import * as VscIcon from "react-icons/vsc";
import authBg from "assets/images/auth-bg.jpg";

const AuthPage = () => {

  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () =>{
    setShowPassword(!showPassword)
  }
  const [activeTab, setActiveTab] = useState("login");

  const switchToLogin = () => {
    setActiveTab("login"); 
  };

  return (
    <>
      <Navbar />
      <div
        className="min-h-[700px] bg-gray-100 flex justify-center items-center fullbodyAuth"
        style={{
          backgroundImage: `url(${authBg})`,
        }}
      >
        <div className="  rounded-lg p-8 max-w-md w-full formThing">
          {/* Tabs for switching between Login and Signup */}
          <div className="flex justify-between tabContAuth">
            <div        className={`tabContAuthafter ${
                  activeTab === "login" ? "tableft" : "tabright"
                }`}></div>

            <div  className="flex justify-between innerTabs">
              <button
                onClick={() => setActiveTab("login")}
                className={`tabBtn ${
                  activeTab === "login" ? "tabActive" : "tabstine"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setActiveTab("signup")}
                className={`tabBtn ${
                  activeTab === "signup" ? "tabActive" : "tabstine"
                }`}
              >
                Signup
              </button>
            </div>
          </div>

          {/* Conditional Form Display */}
          {activeTab === "login" ? (
            <LoginForm  togglePasswordVisibility={togglePasswordVisibility} showPassword={showPassword} setShowPassword={setShowPassword} />
          ) : (
            <SignupForm togglePasswordVisibility={togglePasswordVisibility} showPassword={showPassword} setShowPassword={setShowPassword} switchToLogin={switchToLogin} />
          )}
        </div>
      </div>
    </>
  );
};

 
const LoginForm = ({showPassword, setShowPassword, togglePasswordVisibility  }) => {
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
        <label className="block chrisInputLabel">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-md chrisInput"
        />
      </div>
      <div className="mb-4 passInput">
        <label className="block chrisInputLabel">Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md chrisInput"
        />

<div className="passsIcon" onClick={togglePasswordVisibility} >
   {showPassword ? <VscIcon.VscEyeClosed /> :   <VscIcon.VscEye />}   

        </div>
      </div>
      <div className="flex justify-between items-center mb-6">
        <a href="/#" className="text-sm forgot hover:underline">
          Forgot Password?
        </a>
      </div>
      <button className="w-full bg-[#9d1111] text-white py-2 rounded-md hover:bg-red-700 transition duration-300 subBtn">
        Login
      </button>
    </form>
  );
};

const SignupForm = ({ switchToLogin, showPassword, setShowPassword, togglePasswordVisibility }) => {
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
        <label className="block chrisInputLabel">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded-md chrisInput"
        />
      </div>
      <div className="mb-4">
        <label className="block chrisInputLabel">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-md chrisInput"
        />
      </div>
      <div className="mb-4 passInput">
        <label className="block chrisInputLabel">Password</label>

        <div  className="passsIcon" onClick={togglePasswordVisibility} >
   {showPassword ? <VscIcon.VscEyeClosed /> :   <VscIcon.VscEye />}   

        </div>
     
      
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md chrisInput"
        />
      </div>
      <div className="mb-4">
        <label className="block chrisInputLabel">Confirm Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md chrisInput"
        />
      </div>
      <button className="w-full bg-[#9d1111] text-white py-2 rounded-md hover:bg-red-700 transition duration-300 subBtn">
        Signup
      </button>
    </form>
  );
};

export default AuthPage;
