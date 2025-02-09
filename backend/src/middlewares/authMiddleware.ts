import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization");

  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return; // Chỉ dừng hàm, không trả về giá trị nào
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET as string);
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
    return;
  }
};

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if ((req as any).user.role !== "admin") {
    res.status(403).json({ message: "Access denied. Admins only." });
    return; // Chỉ dừng hàm, không gọi next()
  }
  next();
};
