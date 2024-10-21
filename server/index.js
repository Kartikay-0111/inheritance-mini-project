import express from 'express';
import * as dotenv from 'dotenv';
import connectDB from './database/connect.js';
import cors from 'cors';
import userRouter from './routes/user.routes.js';
import propertyRouter from './routes/property.routes.js';

dotenv.config()
const app = express();

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

