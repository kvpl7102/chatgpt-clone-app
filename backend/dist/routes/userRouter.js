import { Router } from 'express';
import { getAllUsers, userLogin, userSignup } from '../controllers/userController.js';
import { signupValidator, loginValidator, validate } from '../utils/validators.js';
import { verifyToken } from '../utils/token-manager.js';
import { verifyUser } from '../controllers/userController.js';
const userRouter = Router();
/*---------------------------Routes---------------------------*/
userRouter.get("/", (req, res, next) => {
    getAllUsers(req, res, next).catch(next);
});
userRouter.post("/signup", validate(signupValidator), (req, res, next) => {
    userSignup(req, res, next).catch(next);
});
userRouter.post("/login", validate(loginValidator), (req, res, next) => {
    userLogin(req, res, next).catch(next);
});
userRouter.get("/auth-status", (req, res, next) => {
    verifyToken(req, res, next).catch(next);
}, (req, res, next) => {
    verifyUser(req, res, next).catch(next);
});
export default userRouter;
//# sourceMappingURL=userRouter.js.map