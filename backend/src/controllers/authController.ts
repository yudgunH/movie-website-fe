import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import dotenv from "dotenv";

dotenv.config();

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { full_name, email, password, role } = req.body;

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        full_name,
        email,
        password: hashedPassword,
        role: role || "user",
      } as User);

      res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error: unknown) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const secretKey: string = process.env.JWT_SECRET || "defaultSecretKey";
      const expiresInSeconds: number = parseInt(process.env.TOKEN_EXPIRES_IN || "86400", 10); 

      const token = jwt.sign(
        { id: user.id, role: user.role },
        secretKey,
        { expiresIn: expiresInSeconds }
      );

      res.json({ message: "Login successful", token });
    } catch (error: unknown) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}
