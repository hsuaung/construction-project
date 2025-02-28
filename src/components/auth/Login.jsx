import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/styles/login.scss";
import Logo from "../../assets/images/logo.png";
const Login = () => {
  localStorage.clear();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [apiEmailError, setApiEmailError] = useState("");
  const [apiPasswordError, setApiPasswordError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setApiEmailError("");
    setApiPasswordError("");

    let hasError = false;

    // Validate email
    if (!email) {
      setEmailError("Email is required");
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format");
      hasError = true;
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      hasError = true;
    }

    // Stop if there are errors
    if (hasError) return;

    console.log("EMAIL", email);
    console.log("Password", password);
    try {
      const response = await axios.post("http://localhost:8383/auth/login", {
        email,
        password,
      });

      const { accessToken, refreshToken, user } = response.data;

      if (!user || !user.role) {
        console.error("User role is undefined or missing!");
        return;
      }
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("role", user.role);
      localStorage.setItem("id", user.id);

      console.log("Successfully Login:", response.data);
      console.log("ROLE", user.role);

      // Navigate based on role
      if (localStorage.getItem("role") === "admin") {
        console.log("admin dash");
        navigate("/");
      } else if (localStorage.getItem("role") === "staff") {
        console.log("staff dash");
        navigate("/staffDashboard");
      } else {
        navigate("/no");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          const errorMessage = error.response.data.message;
          if (errorMessage === "User doesn't exist") {
            setApiEmailError(errorMessage);
          } else setApiPasswordError(errorMessage);
        } else {
          console.log("Error:", error.response.data);
          alert("An error occurred. Please try again later.");
        }
      } else if (error.request) {
        console.log("Error request:", error.request);
        alert("No response from server. Please check your connection.");
      } else {
        console.log("Error message:", error.message);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="loginContainer">
      <form onSubmit={handleLogin} className="loginBox">
        <img src={Logo} alt="Logo" width={180} height={150} />
        <div>
          <label htmlFor="email">Email *</label>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="39"
              viewBox="0 0 40 39"
              fill="none"
            >
              <path
                d="M11.437 25.026C9.15535 26.385 3.17297 29.1611 6.81722 32.636C8.59581 34.3323 10.5776 35.546 13.0689 35.546H27.2879C29.7808 35.546 31.7626 34.3323 33.5412 32.636C37.1854 29.1611 31.2031 26.385 28.9214 25.026C26.2733 23.4602 23.254 22.6343 20.1784 22.6343C17.1028 22.6343 14.0851 23.4602 11.437 25.026ZM27.4363 10.5292C27.4363 12.4555 26.6718 14.3028 25.311 15.6649C23.9501 17.027 22.1045 17.7922 20.18 17.7922C18.2555 17.7922 16.4099 17.027 15.0491 15.6649C13.6883 14.3028 12.9238 12.4555 12.9238 10.5292C12.9238 8.60298 13.6883 6.75562 15.0491 5.39356C16.4099 4.0315 18.2555 3.2663 20.18 3.2663C22.1045 3.2663 23.9501 4.0315 25.311 5.39356C26.6718 6.75562 27.4363 8.60298 27.4363 10.5292Z"
                stroke="#F27D14"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <input
              type="text"
              placeholder="Enter Your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            {emailError ? (
              <p style={{ color: "red" }}>{emailError}</p>
            ) : (
              <p style={{ opacity: "0" }}>hee</p>
            )}
            {apiEmailError ? (
              <p style={{ color: "red" }}>{apiEmailError}</p>
            ) : (
              <p style={{ opacity: "0" }}>hee</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="password">Password *</label>
          <div>
            <svg>
              <path
                d="M12 0.65625C7.43406 0.65625 3.6875 4.50141 3.6875 9.1875V12.6914C2.5603 13.8225 1.66454 15.1732 1.05279 16.6644C0.441034 18.1555 0.125603 19.7571 0.125 21.375C0.125 28.0903 5.45687 33.5625 12 33.5625C18.5431 33.5625 23.875 28.0903 23.875 21.375C23.8744 19.7571 23.559 18.1555 22.9472 16.6644C22.3355 15.1732 21.4397 13.8225 20.3125 12.6914V9.1875C20.3125 4.50141 16.5659 0.65625 12 0.65625ZM12 3.09375C15.2716 3.09375 17.9375 5.82984 17.9375 9.1875V10.8633C16.1859 9.81516 14.1684 9.1875 12 9.1875C9.83163 9.1875 7.81406 9.81637 6.0625 10.8633V9.1875C6.0625 5.82984 8.72844 3.09375 12 3.09375ZM12 11.625C17.2606 11.625 21.5 15.9759 21.5 21.375C21.5 26.7741 17.2606 31.125 12 31.125C6.73938 31.125 2.5 26.7741 2.5 21.375C2.5 15.9759 6.73938 11.625 12 11.625ZM12 18.9375C11.3701 18.9375 10.766 19.1943 10.3206 19.6514C9.87522 20.1085 9.625 20.7285 9.625 21.375C9.625 22.2769 10.1036 23.0483 10.8125 23.4712V27.4688H13.1875V23.4712C13.8964 23.0483 14.375 22.2769 14.375 21.375C14.375 20.7285 14.1248 20.1085 13.6794 19.6514C13.234 19.1943 12.6299 18.9375 12 18.9375Z"
                fill="#F27D14"
              />
            </svg>

            <input
              type="password"
              placeholder="Enter Your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            {passwordError ? (
              <p style={{ color: "red" }}>{passwordError}</p>
            ) : (
              <p style={{ opacity: "0" }}>hee</p>
            )}

            {apiPasswordError ? (
              <p style={{ color: "red" }}>{apiPasswordError}</p>
            ) : (
              <p style={{ opacity: "0" }}>hee</p>
            )}
          </div>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
