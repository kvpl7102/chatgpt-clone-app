import { hash, compare } from "bcrypt";
import User from "../models/User.js";
export const getAllUsers = async (req, res, next) => {
    try {
        // Get all users from the database
        const users = await User.find();
        return res.status(200).json({
            message: "Users fetched successfully",
            users
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "ERROR",
            cause: error.message
        });
    }
};
export const userSignup = async (req, res, next) => {
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
        return res.status(201).json({
            message: "User signed up successfully!",
            id: user._id.toString()
        });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({
            message: "ERROR",
            cause: error.message
        });
    }
};
export const userLogin = async (req, res, next) => {
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
        }
        return res.status(200).json({
            message: "Logged in successfully! Hello " + user.name,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({
            message: "ERROR",
            cause: error.message
        });
    }
};
//# sourceMappingURL=userController.js.map