import { Router, Request, Response, NextFunction } from 'express';
import { getAllUsers, userLogin, userLogout, userSignup } from '../controllers/userController.js';
import { signupValidator, loginValidator, validate } from '../utils/validators.js';
import { verifyToken } from '../utils/token-manager.js';
import { verifyUser } from '../controllers/userController.js';

const userRouter = Router();

/*---------------------------Routes---------------------------*/
userRouter.get("/", (
	req: Request, 
	res: Response, 
	next: NextFunction
) => {
	getAllUsers(req, res, next).catch(next);
});

userRouter.post("/signup", validate(signupValidator),
	(
	req: Request, 
	res: Response, 
	next: NextFunction
) => {
	userSignup(req, res, next).catch(next);
});

userRouter.post("/login", validate(loginValidator),
	(
	req: Request, 
	res: Response, 
	next: NextFunction
) => {
	userLogin(req, res, next).catch(next);
});

userRouter.get("/logout",
	(
	req: Request, 
	res: Response, 
	next: NextFunction
) => {
	verifyToken(req, res, next);
}, (
	req: Request, 
	res: Response, 
	next: NextFunction
) => {
	userLogout(req, res, next);
});

userRouter.get("/auth-status",
	(
	req: Request, 
	res: Response, 
	next: NextFunction
) => {
	verifyToken(req, res, next);
}, (
	req: Request, 
	res: Response, 
	next: NextFunction
) => {
	verifyUser(req, res, next).catch(next);
});

export default userRouter;