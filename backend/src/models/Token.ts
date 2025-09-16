import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { ITask } from "./Task";

export interface IUser extends Document {
    token: String
    user: Types.ObjectId
    createAt: string
}
const tokenSchema = new Schema({
    token: {
        type: String,
        required: true,
    },
    user: {
        type: Types.ObjectId,
        ref: 'User',
    },
    createAt:{
        type: Date,
        default: Date.now,
        expires:'10m'//10m - 1d
    }
})

const Token=mongoose.model('Token',tokenSchema)
export default Token