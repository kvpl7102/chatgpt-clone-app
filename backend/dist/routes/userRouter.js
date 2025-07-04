import { Router } from 'express';
import { getAllUsers, userLogin, userSignup } from '../controllers/userController.js';
import { signupValidator, loginValidator, validate } from '../utils/validators.js';
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
export default userRouter;
//# sourceMappingURL=userRouter.js.map