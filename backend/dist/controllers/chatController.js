import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
export const generateChatCompletion = async (req, res, next) => {
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            res
                .status(401)
                .json({ message: "User not registered OR Token malfunctioned" });
            return;
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            res.status(401).send("Permissions didn't match");
            return;
        }
        // grab chats of user
        const chats = user.chats.map(({ role, content }) => ({
            role,
            content,
        }));
        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" });
        // send all chats with new one to openAI API
        const openai = configureOpenAI();
        // get latest response
        const chatResponse = await openai.chat.completions.create({
            messages: chats,
            model: "gpt-4o",
        });
        user.chats.push(chatResponse.choices[0].message);
        await user.save();
        res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
export const sendChatsToUser = async (req, res, next) => {
    try {
        //user token check
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            res.status(401).send("User not registered OR Token malfunctioned");
            return;
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            res.status(401).send("Permissions didn't match");
            return;
        }
        res.setHeader('Cache-Control', 'no-cache');
        res.status(200).json({ message: "Chats sent to user!", chats: user.chats });
    }
    catch (error) {
        console.log(error);
        res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const deleteChats = async (req, res, next) => {
    try {
        //user token check
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            res.status(401).send("User not registered OR Token malfunctioned");
            return;
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            res.status(401).send("Permissions didn't match");
            return;
        }
        //@ts-ignore
        user.chats = [];
        await user.save();
        res.status(200).json({ message: "Chats deleted!" });
    }
    catch (error) {
        console.log(error);
        res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=chatController.js.map