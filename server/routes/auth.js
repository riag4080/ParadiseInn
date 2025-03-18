const express = require("express");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

/* USER REGISTER */
router.post("/register", async (req, res) => {
  try {
    /* Take all information from the form */
    const { firstName, lastName, email, password } = req.body;

    // ✅ Input Validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    /* The uploaded file is available as req.file */
    // const profileImage = req.file;

    // if (!profileImage) {
    //   return res.status(400).send("No file uploaded");
    // }

    // /* path to the uploaded profile photo */
    // const profileImagePath = profileImage.path;

    /* Check if user exists */
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists!" });
    }

    /* Hash the password */
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    /* Create a new User */
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    /* Save the new User */
    await newUser.save();

    /* Send a successful message */
    res.status(200).json({ message: "User registered successfully!", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Registration failed!", error: err.message });
  }
});

/* USER LOGIN */
router.post("/login", async (req, res) => {
  try {
    /* Take the information from the form */
    const { email, password } = req.body;

    // ✅ Input Validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required!" });
    }

    /* Check if user exists */
    const user = await User.findOne({ email });
    console.log("Fetched user from DB:", user); // ➡️ Add this to check if the user is found

    if (!user) {
      return res.status(404).json({ message: "User doesn't exist!" });
    }

    /* Compare the password with the hashed password */
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    /* Generate JWT token */
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: "Login failed!", error: err.message });
  }
});

module.exports = router;