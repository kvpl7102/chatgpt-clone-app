import { Router } from 'express';
import { verifyToken } from '../utils/token-manager.js';
import { chatValidator, validate } from '../utils/validators.js';
import { deleteChats, generateChatCompletion, sendChatsToUser } from '../controllers/chatController.js';
// Protected API
const chatRouter = Router();
/*---------------------------Routes---------------------------*/
// Generate chat completion
chatRouter.post("/new-chat", validate(chatValidator), verifyToken, generateChatCompletion);
// Send chats to user
chatRouter.get("/all-chats", verifyToken, sendChatsToUser);
// Delete chats
chatRouter.delete("/delete-chats", verifyToken, deleteChats);
export default chatRouter;
//# sourceMappingURL=chatRouter.js.map