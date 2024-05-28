import { IBoardPersistence } from "../../dataschema/IBoardPersistence";
import mongoose from 'mongoose';

const Board = new mongoose.Schema(
    {
        domainId: { 
            type: String,
            unique: true
          },
          boardOwner: {
            type: String,
            required: [true, 'Please enter board owner'],
            index: true,
          },
          boardTitle: {
            type: String,
            required: [true, 'Please enter board title'],
            index: true,
          },
          boardEntries: {
            type: [String],
            required: [true, 'Please board entries'],
            index: true,
          },
          boardNRow: {
            type: Number,
            required: [true, 'Please enter board row'],
            index: true,
          },
          boardNCol: {
            type: Number,
            required: [true, 'Please enter board column'],
            index: true,
          },
          boardPermissions: {
            type: [String],
            default: []
          },                              
    },
    { timestamps: true },
);

export default mongoose.model<IBoardPersistence & mongoose.Document>('Board', Board)