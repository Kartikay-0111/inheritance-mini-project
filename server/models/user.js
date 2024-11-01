import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
<<<<<<< Updated upstream
    name: { type:String, require:true },
    email:{ type:String, require:true },
    password:{ type:String, require:true },
    allproperties:[{type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],   //one user can have multiple proerties-->[]
=======
    auth0Id:{type:String, require:true},
    name: { type: String, require: true },
    email: { type: String, require: true },
    avatar: {type:String, require: true},
    allproperties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],   //one user can have multiple proerties-->[]
>>>>>>> Stashed changes
})

export const User = mongoose.model("User", UserSchema);;


