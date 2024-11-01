import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './database/connect.js';
import cors from 'cors';
import userRouter from './routes/user.routes.js';
import propertyRouter from './routes/property.routes.js';
import axios from 'axios'
import {auth} from 'express-oauth2-jwt-bearer';
// var request = require("request");
// import request from 'request';
dotenv.config()
const app = express();

// app.use(cors());
app.use(cors({
  origin: 'http://localhost:5173',  // Frontend origin
  credentials: true,  // Allow credentials
  allowedHeaders: ['Authorization', 'Content-Type']  // Allow Authorization header
}));

// app.use(express.json({limit:"50mb"}))

const jwtCheck = auth({

  audience: 'http://localhost',
  issuerBaseURL: 'https://dev-p3yzo1q2ipqqpdii.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

app.use(jwtCheck);

// app.get('/',(req,res)=>{
//     res.send({
//         message:"hello"
//     });
// })

// app.use("/api/v1/users", userRouter);
// app.use("/api/v1/properties", propertyRouter);
app.get('/not', (req, res) => { 
  res.send('Hello from unprotected route');
});

app.get('/protected',jwtCheck, (req, res) => {
  console.log(req.headers.authorization);
  res.send('Hello from protected route');
});

app.use((err, req, res, next) => {
  console.error(err);  // This will log detailed errors
  res.status(err.status || 500).send({
    error: err.message || 'Internal Server Error',
  });
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 



