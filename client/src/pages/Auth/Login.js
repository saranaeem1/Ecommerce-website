import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const user = urlParams.get("user");
    const redirect = urlParams.get("redirect");

    if (token && user) {
      setAuth({ ...auth, user: JSON.parse(decodeURIComponent(user)), token });

      localStorage.setItem(
        "auth",
        JSON.stringify({ user: JSON.parse(decodeURIComponent(user)), token })
      );

      navigate(redirect || "/");
      toast.success("Login Successful!");
    }
  }, [navigate, setAuth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", { email, password });
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({ ...auth, user: res.data.user, token: res.data.token });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleGoogleSignIn = () => {
    // Save the intended route in session storage
    const redirect = location.state?.from || "/dashboard/user";
    sessionStorage.setItem("redirect", redirect);

    window.open("http://localhost:8000/api/v1/auth/google", "_self");
  };



  return (
    <Layout title="Register - Ecommer App">
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN</h4>
          <div className="mb-1">
            <input
              type="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="mb-1">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="mb-2">
            <button
              type="button"
              className="btn forgot-btn"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </button>
          </div>
          <button type="submit" className="btn btn-primary mt-1 mb-2">
            LOGIN
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleGoogleSignIn}
          >
            SIGN IN WITH GOOGLE
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
