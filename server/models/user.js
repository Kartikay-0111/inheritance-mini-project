import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    allproperties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],   //one user can have multiple proerties-->[]
})

export const User = mongoose.model("User", UserSchema);;


