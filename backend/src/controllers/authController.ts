import { Request, Response } from "express";
import { AuthService } from "../services/authService";

export class AuthController {
  static async registerUser(req: Request, res: Response) {
    try {
      const { full_name, email, password } = req.body;
      const newUser = await AuthService.registerUser(full_name, email, password);
      res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error: unknown) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  static async registerAdmin(req: Request, res: Response) {
    try {
      const { full_name, email, password } = req.body;
      const newAdmin = await AuthService.registerAdmin(full_name, email, password);
      res.status(201).json({ message: "Admin registered successfully", admin: newAdmin });
    } catch (error: unknown) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { user, token } = await AuthService.login(email, password);
      res.status(200).json({ message: "Login successful", token });
    } catch (error: unknown) {
      res.status(401).json({ message: (error as Error).message });
    }
  }
}
