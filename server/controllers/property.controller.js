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

const getAllproperties = async (req, res) => {
    try{
    const properties = await Property.find({});
    if(!properties) return res.status(400).json({message:"no properties"})
    res.status(200).json(properties);
    }
    catch(err){
        return res.status(404).json({message: 'Failed to fetch properties', error: error.message})
    }


}
const getPropertyBydetail = async (req, res) => {
    try{
    // console.log(req.params.id);
    const {id} = req.params;
    const property = await Property.findById(id);  //this is the unique db id
    if(!property) return res.status(400).json({message:'property not found'});

    res.status(200).json(property);
    }
    catch(err){
        return res.status(404).json({message: 'Failed to fetch properties', error: err.message})
    }
}

const createProperty = async (req, res) => {

    try{     
        if (!req.auth || !req.auth.payload) {
            return res.status(400).json({ message: "Authentication payload not found" });
          }
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // // Upload to Cloudinary
        // const photoUrl = await cloudinary.uploader.upload_stream(req.file.buffer, { resource_type: 'auto' });

        const {title,description,type,location,price} = req.body;
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

        const photoUpload = await new Promise((resolve, reject) => {  //upload to cloudinary
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
            propertyType:type,
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

const updateProperty = async (req, res) => {
    const { id } = req.params;
    const { title, description, type, price, location } = req.body;
    const { file } = req;

    try {
        const property = await Property.findById(id);
        if (!property) return res.status(404).json({ message: 'Property not found' });

        // Update the image if a new file is uploaded
        if (file) {
            const uploadResult = await cloudinary.uploader.upload(file.path, { resource_type: 'auto' });
            property.image = uploadResult.secure_url;
        }

        // Update other fields
        property.title = title || property.title;
        property.description = description || property.description;
        property.type = type || property.type;
        property.price = price || property.price;
        property.location = location || property.location;

        await property.save();
        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({ message: 'Error updating property', error: error.message });
    }

}
const deleteProperty = async (req, res) => {
   try{
    const {id} = req.params;

    const property = await Property.findById(id);
    if (!property) return res.status(404).json({ message: 'Property not found' });

    // Get the user associated with this property
    const userId = property.creator.toString();
    
    await property.deleteOne();

    // Find the user and update their properties list or count
    const user = await User.findById(userId);
    if (user) {
        // deleting the property frm user properties
        user.allproperties = user.allproperties.filter((propertyId) => propertyId.toString() !== id);

        await user.save();

    }
    res.status(200).json({ message: 'Property deleted successfully' });
}
    catch(error){
        res.status(500).json({ message: 'Error deleting property', error: error.message });
    }
}

export{
    getAllproperties,getPropertyBydetail,createProperty,updateProperty,deleteProperty,
}