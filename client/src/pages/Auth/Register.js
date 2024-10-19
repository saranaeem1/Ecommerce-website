import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const isPhoneValid = (phone) => {
    const phoneRegex = /^\d{11}$/;
    return phoneRegex.test(phone);
  };

  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number
    if (!isPhoneValid(phone)) {
      toast.error("Phone number must be 11 digits.");
      return;
    }

    // Validate password
    if (!isPasswordValid(password)) {
      toast.error(
        "Password must be at least 8 characters long and contain both letters and numbers."
      );
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/auth/register",
        {
          name,
          email,
          password,
          phone,
          address,
          answer,
        }
      );

      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message || "Registration failed");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        toast.error(message || "Something went wrong during registration");
      } else {
        console.error(error);
        toast.error("Something went wrong");
      }
    }
  };

  const handleGoogleSignIn = () => {
    // Redirect to Google OAuth URL
    window.location.href = "http://localhost:8000/api/v1/auth/google";
  };

  return (
    <Layout title="Register - Ecommerce App">
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">REGISTER</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              placeholder="Enter Your Name"
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              placeholder="Enter Your Phone"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              placeholder="Enter Your Address"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              placeholder="Enter your favorite game."
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            REGISTER
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleGoogleSignIn}
          >
            SIGN UP WITH GOOGLE
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
