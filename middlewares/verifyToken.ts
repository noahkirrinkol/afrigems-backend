import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;

export interface AuthenticatedRequest extends Request {
  user?: any;
}

const verifyToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization)
      return res
        .status(401)
        .json({ success: false, message: "Please send a token." });

    const token = req.headers.authorization.split(" ")[1];

    if (!secretKey) {
      throw new Error("JWT secret key is not defined.");
    }

    jwt.verify(token, secretKey, (err, decoded) => {
      if (decoded) {
        req.user = decoded;
        next();
      } else {
        return res
          .status(401)
          .json({ success: false, message: "Invalid token" });
      }
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default verifyToken;
