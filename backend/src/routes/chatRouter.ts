import { Router, Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/token-manager.js';
import { chatValidator, validate } from '../utils/validators.js';
import { deleteChats, generateChatCompletion, sendChatsToUser } from '../controllers/chatController.js';

// Protected API
const chatRouter = Router();

/*---------------------------Routes---------------------------*/
// Generate chat completion
chatRouter.post("/new-chat", validate(chatValidator), 
	(
	req: Request, 
	res: Response, 
	next: NextFunction
) => {
	verifyToken(req, res, next).catch(next);
}, (
	req: Request, 
	res: Response, 
	next: NextFunction
) => {
	generateChatCompletion(req, res, next).catch(next);
});

// Send chats to user
chatRouter.get("/all-chats",  
	(
	req: Request, 
	res: Response, 
	next: NextFunction
) => {
	verifyToken(req, res, next).catch(next);
}, (
	req: Request, 
	res: Response, 
	next: NextFunction
) => {
	sendChatsToUser(req, res, next).catch(next);
});

// Delete chats
chatRouter.delete("/delete-chats",  
	(
	req: Request, 
	res: Response, 
	next: NextFunction
) => {
	verifyToken(req, res, next).catch(next);
}, (
	req: Request, 
	res: Response, 
	next: NextFunction
) => {
	deleteChats(req, res, next).catch(next);
});

export default chatRouter;