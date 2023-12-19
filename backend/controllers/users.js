const User = require("../models/user.model");
const jwt = require("jsonwebtoken");



const registerUser = async (req, res) => {
  const { name, email, password, age, gender, contact, slot } = req.body;
  const updated_slot = slot
 

  try {
    // Check if email is in a valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Check if email already exists
    const exist = await User.findOne({ email });

    if (exist) {
      return res.status(400).json({
        error: "Email already taken",
      });
    }

    // Create a new user

    // console.log(newUser);

    const user = await User.create({
      name,
      email,
      password,
      age,
      gender,
      contact,
      slot,
      updated_slot
    });

    console.log(user);

    return res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if email exist
    const user = await User.findOne({ email });

    // console.log(user)

    if (!user) {
      return res.json({ error: "No user found" });
    }

    // check if passwords match

    let match = false;

    if (user.password == password) match = true;

    if (match) {
      jwt.sign(
        {
          email: user.email,
          id: user._id,
          name : user.name,
          age : user.age,
          gender : user.gender,
          contact : user.contact,
          slot : user.slot,
          updated_slot : user.updated_slot
        },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json({ user });
        }
      );
    } else {
      res.json({ error: "password do not match" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get profile

const getDashboard = async (req, res) => {
    const { token } = req.cookies;
  
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
        if (err) {
          // Handle the error, e.g., return an error response
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          console.log(user)
          res.json(user);
        }
      });
    } else {
      res.json({ error: 'No token found' });
    }
  };

  const updateSlot = async (req, res) => {
    const id = req.body.userId;
    const newSlot = req.body.updatedSlot;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(id, { updated_slot: newSlot }, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(updatedUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  
  
  
  

module.exports = {
  registerUser,
  loginUser,
  getDashboard,
  updateSlot
};
