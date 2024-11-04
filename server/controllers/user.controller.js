import { User } from "../models/user.js";
import { auth } from 'express-oauth2-jwt-bearer';
const getAllUsers = async (req,res) =>{

    
}
const createUser = async (req,res) =>{
  try{
    if (!req.auth || !req.auth.payload) {
      return res.status(400).json({ message: "Authentication payload not found" });
    }

    const {sub} = req.auth.payload;
    const {name,avatar,email} = req.body;

    let user = await User.findOne({auth0Id:sub});
    
    if (user) {
        return res.status(409).json(user);
    }
    user = new User({
      properties:[],
      auth0Id: sub,
      name: name || "Anonymous",
      email: email,
      avatar: avatar || null,
    });

    await user.save();
    
    return res.status(200).json(user);
  }
  catch(error){
    return res.status(500).json({message: error.message})
  }

}
const getUserById = async (req,res) =>{

  const id = req.params.id;
  const user = await User.findById(id);

  if(!user){
    res.status(404).json({
      "message":"user not found"
    }
    );
  }
  res.status(201).json({user});
}

export {
    getAllUsers,
    createUser,
    getUserById
}