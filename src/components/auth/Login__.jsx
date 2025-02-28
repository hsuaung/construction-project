import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import API from "../utils/axios"; // Axios instance for API calls
import API from "../../utils/axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("EMAIL", email);
    console.log("Password", password);
    try {
      const response = await axios.post("http://localhost:8383/auth/login", {
        email,
        password,
      });
      const { token, user } = response.data;
      localStorage.clear();
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("id", user.id);
      if (user.role === "admin") {
        navigate("/");
      } else if (user.role === "staff") {
        navigate("/site");
      } else {
        navigate("/ui");
      }

      console.log("Successfully Login:", response.data);
      console.log("ROLE", response.data.user.role);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          const errorMessage = error.response.data.message;
          setError(errorMessage);
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

  // try {
  //   const { data } = await API.post("/auth/login", { email, password });
  //   localStorage.setItem("token", data.token);
  //   console.log("SUUS");
  //   // navigate("/ui"); // Redirect after login
  // } catch (error) {
  //   alert("Login failed: " + error.response.data.message);
  // }
  return (
    <div>
      {error}
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
