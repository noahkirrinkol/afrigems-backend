import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
dotenv.config();

import User from "../models/user";
import { AuthenticatedRequest } from "../middlewares/verifyToken";

const secretKey = process.env.JWT_SECRET_KEY;

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      res
        .status(400)
        .json({ status: false, message: "All fields are required" });
    }

    const usernameExists = await User.findOne({
      username: username,
    });

    const emailExists = await User.findOne({ email: email });

    if (usernameExists) {
      return res.status(409).json({
        success: false,
        message: "User with that username already exists.",
      });
    }

    if (emailExists) {
      return res.status(409).json({
        success: false,
        message: "User with that email already exists.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    if (!secretKey) {
      throw new Error("JWT secret key is not defined.");
    }

    const token = jwt.sign({ id: newUser._id }, secretKey);

    return res.status(201).json({
      success: true,
      message: "User created successfully.",
      token: token,
    });
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).json({
        status: false,
        message: "Email and password are required",
      });
    }

    const userExists = await User.findOne({ email: email });

    if (!userExists) {
      res.status(401).json({
        success: false,
        message: "No user with the provided email found.",
      });
    } else {
      const passwordMatch = await bcrypt.compare(password, userExists.password);

      if (passwordMatch) {
        if (!secretKey) {
          throw new Error("JWT secret key is not defined.");
        }

        const token = jwt.sign({ id: userExists._id }, secretKey);

        res.status(200).json({
          success: true,
          message: "User logged in successfully",
          token: token,
        });
      } else {
        res.status(401).json({ success: false, message: "Invalid password" });
      }
    }
  } catch (error: any) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const users = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    res.status(200).json({ success: true, data: users });
  } catch (error: any) {
    console.error("Error getting in users:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const userProfile = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user.id;

  try {
    const user = await User.findOne({ _id: userId });
    res.status(200).json({ success: true, data: user });
  } catch (error: any) {
    console.error("Error getting in user profile:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
