// src/components/Login.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./context/userContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUserContext();
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post(
        "/",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(data);
      if (data.error) {
        toast.error(data.error);
      } else {
        setUser(data.user);
        setData({
          email: "",
          password: "",
        });
        toast.success("Login successfully!");
        console.log("Form");
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>.
      </p>
    </div>
  );
};

export default Login;
