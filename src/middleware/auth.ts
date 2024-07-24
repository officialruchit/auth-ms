import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
  role: string;
}

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
    role?: string;
  }
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const header = req.header("Authorization");
  const token = header && header.split(" ")[1];
  if (token == null) {
    res.status(401).json({ error: "Unauthorized: No token provided" });
  }
  try {
    const decode = Jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    req.userId = decode.userId;
    req.role = decode.role;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export default auth;