import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Đọc biến môi trường từ file .env
dotenv.config();

const app: Application = express();

// Dùng middleware
app.use(cors());
app.use(express.json());

// Demo route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express + TypeScript!');
});

// Middleware bắt lỗi cuối cùng (tuỳ chọn)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send({
    message: 'Something went wrong!',
  });
});

export default app;
