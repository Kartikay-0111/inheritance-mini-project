import express from 'express';
import { config } from 'dotenv';
import connectDB from './database/connect.js';
import cors from 'cors';
import userRouter from './routes/user.routes.js';
import propertyRouter from './routes/property.routes.js';

const app = express();
config({
    path:"./data/config.env"
});

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

