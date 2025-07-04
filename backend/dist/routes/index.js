import { Router } from 'express';
import userRouter from './userRouter.js';
import chatRouter from './chatRouter.js';
const appRouter = Router();
// Middlewares
appRouter.use("/user", userRouter); //domain.com/api/v1/user
appRouter.use("/chats", chatRouter); //domain.com/api/v1/chats
export default appRouter;
//# sourceMappingURL=index.js.map