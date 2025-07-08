import { Router } from 'express';
import { verifyToken } from '../utils/token-manager.js';
// Protected API
const chatRouter = Router();
chatRouter.post("/new-chat", (req, res, next) => {
    verifyToken(req, res, next).catch(next);
});
export default chatRouter;
//# sourceMappingURL=chatRouter.js.map