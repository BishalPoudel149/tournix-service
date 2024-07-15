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

const allowedCategories = ['PUBG', 'COD', 'FIFA', 'Fortnite', 'CounterStrike']; // Example dynamic list


  export const TournamentSchema = new Schema(
    {
      name: { type: String, required: true },
      category: {
        type: String,
        required: true,
        validate: {
          validator: function (value: string) {
            // Check if the value is in the allowed categories list
            return allowedCategories.includes(value);
          },
          message: (props: { value: string }) => `${props.value} is not a valid category!`
        }
      },
      date: { type: Date, required: true },
      time: { type: String, required: true },
      user: { type: mongoose.Types.ObjectId, ref: 'UserModel', required: true }
    },
    {
      timestamps: true, // Add createdAt and updatedAt fields
    }
  );

  export interface Tournament {
    id: string;
    name: string;
    category: 'PUBG' | 'COD' | 'FIFA' | 'Fortnite' | 'CounterStrike'; 
    date: Date; 
    time: string; 
    user: User; 
  }

