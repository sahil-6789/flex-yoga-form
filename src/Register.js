// Registration.jsx

import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import styles from "./Register.module.css";  // Import your CSS file for styling
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    slot: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const validateForm = () => {
    if (!user.name) {
      toast.error("Name is required");
      return false;
    }

    if (!user.email || !/^\S+@\S+\.\S+$/.test(user.email)) {
      toast.error("Valid email is required");
      return false;
    }

    if (!user.password || user.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    if (!user.age || isNaN(user.age) || user.age < 18 || user.age > 65) {
      toast.error("Age must be a number between 18 and 65");
      return false;
    }

    if (!user.gender) {
      toast.error("Gender is required");
      return false;
    }

    if (!user.contact || !/^\d{10}$/.test(user.contact)) {
      toast.error("Contact must be a 10-digit number");
      return false;
    }

    if (!user.slot) {
      toast.error("Slot timing is required");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const { name, email, password, age, gender, contact, slot} = user;
      console.log(user)
      try {
        const response = await axios.post(
          "/register",
          {
            name,
            email,
            password,
            age,
            gender,
            contact,
            slot
          },
          {
            withCredentials: true,
          }
        );

        if (response.data.error) {
          toast.error(response.data.error);
        } else {
          setUser({
            name: "",
            email: "",
            password: "",
            age: "",
            gender: "",
            contact : "",
            slot: ""
          });
          toast.success("Form submitted successfully!");
          console.log("Form submitted:", response.data);
          navigate("/", { replace: true });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (

    <div className={styles.registration}>
      <Toaster />
      <h2>Registration Form</h2>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className={styles.forms}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </div>

        <div className={styles.forms}>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>

        <div className={styles.forms}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>

        <div className={styles.forms}>
          <label>Age:</label>
          <input
            type="text"
            name="age"
            value={user.age}
            onChange={handleChange}
          />
        </div>

        <div className={styles.forms}>
          <label>Contact:</label>
          <input
            type="text"
            name="contact"
            value={user.contact}
            onChange={handleChange}
          />
        </div>

        <div className={styles.forms}>
          <label>Gender:</label>
          <select name="gender" value={user.gender} onChange={handleChange}>
            <option value="default">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className={styles.forms}>
          <label>Slot Timing:</label>
          <select name="slot" value={user.slot} onChange={handleChange}>
          <option value="default">Select Slot</option>
            <option value="6-7AM">6-7AM</option>
            <option value="7-8AM">7-8AM</option>
            <option value="8-9AM">8-9AM</option>
            <option value="5-6PM">5-6PM</option>
          </select>
        </div>

        <div className={styles.forms}>
          <button type="submit">Register and Pay 500</button>
        </div>
      </form>
      <p >
        Already have an account? <Link className={styles.link} to="/">Log In </Link>.
      </p>
    </div>
   
  );
};

export default Register;