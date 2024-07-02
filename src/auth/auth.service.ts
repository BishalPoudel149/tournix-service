import { ConflictException, ForbiddenException, HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { constrainedMemory } from "process";
import { User } from "src/database/database.schemas";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";

@Injectable()
export class AuthService{

  constructor(
    @InjectModel('UserModel') private readonly userModel:Model<User>
  ){}

 async signup(dto:AuthDto){

  //Generate the password hash 
  // save new user to the db
  const hash= await argon.hash(dto.password);

  try {
    const newUser = new this.userModel({
      email: dto.email,
      passwordHash: hash,
    });
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
   if(error.code === 11000 ){
    throw new ConflictException ('Email Already Exist , Try Logging in ')
   }
   else
   throw new InternalServerErrorException('Internal Server Error');
  };

}

    async signin(dto:AuthDto){
      const user = await this.userModel.findOne({email:dto.email});
      if(!user)
        throw new ForbiddenException('Username Not found')
  
         const enteredPassword = await argon.verify(user.passwordHash,dto.password);
         if(!enteredPassword){
          throw new ForbiddenException('Invalid Credentials');
         }

    // Convert Mongoose document to plain object
    const userObj = user.toObject();
    delete userObj.passwordHash;

    // Return user object without passwordHash
    return userObj;
    
  
    };

   
}