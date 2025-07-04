import User from "../models/User.js";
export const getAllUsers = async (req, res, next) => {
    try {
        // Get all users from the database
        const users = await User.find();
        return res.status(200).json({ message: "Users fetched successfully", users });
    }
    catch (error) {
        console.log("Error fetching users:", error);
        return res.status(500).json({
            message: "Internal server error",
            cause: error.message
        });
    }
};
//# sourceMappingURL=controller-user.js.map