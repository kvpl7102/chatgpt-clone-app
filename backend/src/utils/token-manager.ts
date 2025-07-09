import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import { COOKIE_NAME } from './constants.js';

export const createToken = (
    id: string,
    email: string,
    expiresIn: string
) => {
    const payload = { id, email };
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET is not defined");
    }

    const options: jwt.SignOptions = {};
    if (expiresIn) {
        options.expiresIn = expiresIn as jwt.SignOptions['expiresIn'];
    }

    const token = jwt.sign(payload, secret, options);
    return token;
};

export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
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