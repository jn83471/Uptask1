import mongoose, { Schema, Document, PopulatedDoc,Types } from "mongoose";
import { ITask } from "./Task";

export interface IUser extends Document {
    email: String
    password: string
    name: string
    confirmed: boolean

}

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase:true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    confirmed:{
        type: Boolean,
        default: false
    }
},{
    timestamps:true
})

const User = mongoose.model<IUser>('User',UserSchema)
export default User