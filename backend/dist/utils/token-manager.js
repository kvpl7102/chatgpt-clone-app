import jwt from 'jsonwebtoken';
import { COOKIE_NAME } from './constants.js';
export const createToken = (id, email, expiresIn) => {
    const payload = { id, email };
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not defined");
    }
    const options = {};
    if (expiresIn) {
        options.expiresIn = expiresIn;
    }
    const token = jwt.sign(payload, secret, options);
    return token;
};
export const verifyToken = (req, res, next) => {
    const token = req.signedCookies[`${COOKIE_NAME}`];
    if (!token || token.trim() === "") {
        res.status(401).json({ message: "Token Not Received" });
        return;
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
        if (err) {
            res.status(401).json({ message: "Token Invalid" });
            return;
        }
        res.locals.jwtData = success;
        next();
    });
};
//# sourceMappingURL=token-manager.js.map