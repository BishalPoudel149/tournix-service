import mongoose, { Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    passwordHash : {type: String,required:true},
    firstname: { type: String,required:false,default:null},
    lastname: { type: String,required:false,default:null },
    role:{
      type:String,enum:['superadmin','admin','organizer','player'], required:true
    }
  },
  {
    timestamps: true,
  },
);

export interface User{
    id:string,
    email:string,
    passwordHash:string,
    firstname?:string,
    lastname?:string,
    role:string
}






 

