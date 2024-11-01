import express from 'express';
import * as dotenv from 'dotenv';
import connectDB from './database/connect.js';
import cors from 'cors';
import userRouter from './routes/user.routes.js';
import propertyRouter from './routes/property.routes.js';
<<<<<<< Updated upstream
=======
import axios from 'axios'
import {auth} from 'express-oauth2-jwt-bearer';
import jwtCheck from './middleware/jwtcheck.js';

>>>>>>> Stashed changes

dotenv.config()
const app = express();

<<<<<<< Updated upstream
app.use(cors());
app.use(express.json({limit:"50mb"}))

app.get('/',(req,res)=>{
    res.send({
        message:"hello"
    });
})

app.use("/api/v1/users", userRouter);
app.use("/api/v1/properties", propertyRouter);

const startServer = async () =>{
    try{
        connectDB(process.env.MONGODB_URI);
        app.listen(5000,()=>{
            console.log("server running on port")
        })
    }
    catch(e){
        console.log(e);
    }
}
startServer();
=======
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:5173',  // Frontend origin
  credentials: true,  // Allow credentials
  allowedHeaders: ['Authorization', 'Content-Type']  // Allow Authorization header
}));
app.use(express.json())


app.get('/not', (req, res) => { 
  res.send('Hello from unprotected route');
});

app.use(jwtCheck);
app.use("/api/v1/users", userRouter);

app.use("/api/v1/properties", propertyRouter);

// app.get('/',(req,res)=>{
//     res.send({
//         message:"hello"
//     });
// })

app.use((err, req, res, next) => {
  console.error(err);  // This will log detailed errors
  res.status(err.status || 500).send({
    error: err.message || 'Internal Server Error',
  });
});

>>>>>>> Stashed changes

try{
  connectDB(process.env.MONGODB_URI)
  app.listen(process.env.PORT,()=>{
  console.log(`server running on ${process.env.PORT}` )
})
}
catch(e){
  console.log(e);
}
