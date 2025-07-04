import { Router } from 'express';
import { getAllUsers } from '../controllers/controller-user.js';
const userRouter = Router();
/*---------------------------Routes---------------------------*/
userRouter.get("/", (req, res, next) => {
    getAllUsers(req, res, next).catch(next);
});
export default userRouter;
//# sourceMappingURL=routes-user.js.map