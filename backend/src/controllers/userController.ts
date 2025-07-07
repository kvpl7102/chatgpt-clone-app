import { Request, Response, NextFunction } from "express";
import { hash, compare } from "bcrypt";
import User from "../models/User.js";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    try {
        // Get all users from the database
        const users = await User.find();
        return res.status(200).json({
            message: "Users fetched successfully", 
            users});
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "ERROR",
            cause: error.message
        });
    }
}

export const userSignup = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    try {
        
        const { name, email, password } = req.body;

        // Check if user already exists with the provided email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "An user already exists with this email."
            });
        }

        // User signup logic
        const user = new User({ name, email, password: await hash(password, 10) });
        await user.save();

        // Create token and store cookie
        // Clear the previous cookie 
        res.clearCookie(COOKIE_NAME,{
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true,
            
        });
        // Create new token and cookie for user
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie("auth_token", token, {
            path: "/", 
            domain: "localhost", 
            expires,
            httpOnly: true,
            signed: true,
        });
    
        return res.status(201).json({
            message: "User signed up successfully!", 
            name: user.name,
            email: user.email
        });

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            message: "ERROR",
            cause: error.message
        });
    }
}

export const userLogin = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    try {
        const { email, password } = req.body;
        
        // User login logic
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "User not found with this email."
            });
        } 

        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).json({
                message: "Incorrect password."
            });
        };

        // Clear the previous cookie 
        res.clearCookie(COOKIE_NAME,{
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true,
            
        });
        // Create new token and cookie for user
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie("auth_token", token, {
            path: "/", 
            domain: "localhost", 
            expires,
            httpOnly: true,
            signed: true,
        });

        return res.status(200).json({
            message: "Logged in successfully! Hello " + user.name, 
            name: user.name,
            email: user.email
        });

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            message: "ERROR",
            cause: error.message
        });
    }
}

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};