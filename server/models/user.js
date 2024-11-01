import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    auth0Id:{type:String, require:true},
    name: { type: String, require: true },
    email: { type: String, require: true },
    avatar: {type:String, require: true},
    allproperties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],   //one user can have multiple proerties-->[]
})

export const User = mongoose.model("User", UserSchema);;


