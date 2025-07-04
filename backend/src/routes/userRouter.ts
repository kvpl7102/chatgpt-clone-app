import { Router, Request, Response, NextFunction } from 'express';
import { getAllUsers, userLogin, userSignup } from '../controllers/userController.js';
import { signupValidator, loginValidator, validate } from '../utils/validators.js';

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










export default userRouter;