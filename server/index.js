import express from 'express';
import * as dotenv from 'dotenv';
import connectDB from './database/connect.js';
import cors from 'cors';
import userRouter from './routes/user.routes.js';
import propertyRouter from './routes/property.routes.js';
import axios from 'axios';
import jwtCheck from './middleware/jwtcheck.js';

dotenv.config()
const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',  // Frontend origin
  credentials: true,  // Allow credentials
  allowedHeaders: ['Authorization', 'Content-Type']  // Allow Authorization header
}));
app.use(express.urlencoded({ extended: true }));

app.use(jwtCheck);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/properties",propertyRouter);

// app.get('/protected',jwtCheck, (req, res) => {
//   console.log(req.headers.authorization);
//   res.send('Hello from protected route');
// });


try{
  connectDB(process.env.MONGODB_URI)
  app.listen(process.env.PORT,()=>{
  console.log(`server running on ${process.env.PORT}` )
})
}
catch(e){
  console.log(e);
}

