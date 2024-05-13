import { IUserPersistence } from "../../dataschema/IUserPersistence";
import mongoose from 'mongoose';

const User = new mongoose.Schema({
    id:{
        type: String,
        unique: true
    },
    name:{
        type: String,
        index: true
    },
    email: {
        type: String,
        required: [true, 'Please enter email'],
        lowercase: true,  
        unique: true,
        index: true,
    },
},
  { timestamps: true },
)

export default mongoose.model<IUserPersistence & mongoose.Document>('User', User)