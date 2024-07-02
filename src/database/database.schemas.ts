import mongoose, { Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    passwordHash : {type: String,required:true},
    firstname: { type: String,required:false,default:null},
    lastname: { type: String,required:false,default:null },
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BookmarkModel' }],
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
    bookmarks?:Bookmark[]
}



export const BookmarkSchema = new Schema(
  {
  title:{type:String,required:true},
  description:{type:String,required:false},
  link:{type:String,requiredL:true},
  user :{type:mongoose.Types.ObjectId,ref:'UserModel',required:true}
},
{
  timestamps:true,
},

);



export interface Bookmark{
  id:string,
  title:string,
  description?:string,
  link:string,
  user:User
}
