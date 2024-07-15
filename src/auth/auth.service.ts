import { ConflictException, ForbiddenException, HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { constrainedMemory } from "process";
import { User } from "src/database/database.schemas";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { JwtService } from "@nestjs/jwt";
import { UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService{

  constructor(
    //injecting the uerModel to use /play with model
    @InjectModel('UserModel') private readonly userModel:Model<User>,

    
    private jwtService:JwtService,
    private config:ConfigService,

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

    return this.signToken(savedUser.id,savedUser.email);
    
  } catch (error) {
   if(error.code === 11000 ){
    throw new ConflictException ('Email Already Exist , Try Logging in ')
   }
   else
   throw new InternalServerErrorException('Internal Server Error');
  };

}

    async signin(dto:AuthDto):Promise<{ access_token: string }>{
      const user = await this.userModel.findOne({email:dto.email});
      if(!user)
        throw new ForbiddenException('Username Not found')
  
         const enteredPassword = await argon.verify(user.passwordHash,dto.password);
         if(!enteredPassword){
          throw new ForbiddenException('Invalid Credentials');
         }

   // create the jwt and return token
    return this.signToken(user.id,user.email);
   
    };

    async signToken( userId:string,email:string):Promise<{ email:string,access_token: string }>{
      const payload ={sub:userId,useremail:email};
      const secret =this.config.get('JWT_SECRET');
      const token = await this.jwtService.signAsync(payload,{ expiresIn:'15m',secret:secret} )

      return {email:email ,
        access_token:token}
     

    }

   
}