import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import dotenv from "dotenv";
import { generateTokens } from '../utils/generateToken.js';
dotenv.config();



export const registerUser = async (req, res) => {
  try {
    const { email, password, ...rest } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...rest, email, password: hashed });
    res.status(201).json({ message: 'User registered', user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    const payload = { id: user.User_id };
    const { accessToken, refreshToken } = generateTokens(payload);

    // Save refresh token to DB
    user.refresh_token = refreshToken;
    await user.save();

    // Cookie options
    const options = {
      httpOnly: true,
      secure: false,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        message: "Login successful",
        user: {
          id: user.User_id,
          email: user.email,
          name: `${user.first_name} ${user.last_name}`,
        },
        accessToken,
        refreshToken
      });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    console.log("Cookies received on logout:", req.cookies);

    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token missing" });
    }

    const user = await User.findOne({ where: { refresh_token: refreshToken } });
    if (!user) {
      return res.status(403).json({ message: "Invalid token or already logged out" });
    }

    user.refresh_token = null;
    await user.save();

    const options = {
      httpOnly: true,
      secure: false,
      sameSite: "None", 
    };

    res.clearCookie("accessToken", options);
    res.clearCookie("refreshToken", options);

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

