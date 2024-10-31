// index.js
import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './routes/user.routes.js';
import propertyRouter from './routes/property.routes.js';
import  {verifyToken}  from './authMiddleware.js';
dotenv.config();
const app = express();

// Enable CORS with specific configuration
app.use(cors({
  origin: 'http://localhost:5173',  // Frontend origin
  credentials: true,  // Allow credentials
  allowedHeaders: ['Authorization', 'Content-Type']  // Allow Authorization header
}));

// Protected route example
app.get("/protected", verifyToken, (req, res) => {
  res.json({
    message: "Access granted to protected data",
    user: req.user, // Contains user's info from Google token payload
  });
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to database');
    app.listen(process.env.PORT, () => {
      console.log('Listening for requests on port', process.env.PORT);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// Register routes
app.use('/users', userRouter);
app.use('/properties', propertyRouter);

export default app;
