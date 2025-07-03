import { Router } from 'express';
import { getAllUsers } from '../controllers/controller-user.js';

const userRouter = Router();

/*---------------------------Routes---------------------------*/
userRouter.get("/", getAllUsers);
export default userRouter;