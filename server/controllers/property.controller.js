import {User} from "../models/user.js";
import {Property} from "../models/property.js";
import * as dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';
import mongoose from "mongoose";
import multer from "multer";
import stream from "stream";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllproperties = async (req, res) => {}
const getPropertyBydetail = async (req, res) => {}

const createProperty = async (req, res) => {
 // Store files in memory (temporary)
    try{     
        if (!req.auth || !req.auth.payload) {
            return res.status(400).json({ message: "Authentication payload not found" });
          }
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // // Upload to Cloudinary
        // const photoUrl = await cloudinary.uploader.upload_stream(req.file.buffer, { resource_type: 'auto' });

        const {title,description,propertyType,location,price} = req.body;
        const auth0Id = req.auth.payload.sub;
        const photoFile = req.file; 
        
        //start a new session
        const session = await mongoose.startSession();
        session.startTransaction();
        // Access the file from the request
        // if (!photoFile) {
        //     throw new Error("Photo file not found");
        // }
       

        const user = await User.findOne({auth0Id}).session(session);
        
        if(!user) throw new Error("user not found");

        const photoUpload = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: 'auto' },
                (error, result) => {
                    if (error) {
                        reject(error); // Reject the promise on error
                    } else {
                        resolve(result); // Resolve the promise with the upload result
                    }
                }
            );
            const bufferStream = new stream.PassThrough();
            bufferStream.end(req.file.buffer); // Pass the buffer into the stream
            bufferStream.pipe(uploadStream); // Pipe the file stream to Cloudinary
        });
        const photoUrl = photoUpload.secure_url;
    
        // const photoUrl = await cloudinary.uploader.upload(photo);
    
        const newProperty = await Property.create({
            title,
            description,
            propertyType,
            location,
            price,
            photo: photoUrl,
            creator: user._id,
        })
        user.allproperties.push(newProperty._id);
        await user.save({session});
        
        await session.commitTransaction();
    
        res.status(200).json({message: 'Property craetes succesfully'});    
    }
    catch(error){
        res.status(500).json({ message: error.message});
    }
   
}
const updateProperty = async (req, res) => {}
const deleteProperty = async (req, res) => {}

export{
    getAllproperties,getPropertyBydetail,createProperty,updateProperty,deleteProperty,
}