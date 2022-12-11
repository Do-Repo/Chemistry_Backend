require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import config from 'config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './src/utils/connectDB';
import userRouter from './src/routes/user.routes';
import authRouter from './src/routes/auth.routes';
import courseRouter from './src/routes/courses.routes';
import tagRouter from './src/routes/tags.routes';
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
export const io = new Server(httpServer, { /* options */ });


// 1. Body Parser
app.use(express.json())

// 2. Cookie Parser
app.use(cookieParser());

// 3. Logger
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// 4. Cors
app.use(
  cors({
    origin: config.get<string>('origin'),
    credentials: true,
  })
);

// 5. Routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/course', courseRouter);
app.use('/api/tags', tagRouter);

// UnKnown Routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;
  console.log(err.message)
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});


const port = config.get<number>('port');
const host = '0.0.0.0';

app.listen(port , host ,() => {
  console.log(`Server started on port: ${port}`);
  connectDB();
});

httpServer.listen(3002, () => {
  console.log('Socket server started on port: 3002');
});

var handleEvents = require('./src/utils/socketEvents');
io.on("connection", (socket) => {
  handleEvents(socket);
});
