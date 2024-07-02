import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/database/database.schemas";
import { lookup } from "dns";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(
        @InjectModel('UserModel') private readonly userModel:Model<User>,
        private jwtService: JwtService,
        private config:ConfigService
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean>  {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        const secret= this.config.get('JWT_SECRET');

        if(!token){
            throw new UnauthorizedException();
        }
        try{
            const payload = await this.jwtService.verifyAsync(
              token,
              {
                  secret:secret
              }
            );

            // assigning the payload to the request object
            // so that it can be accessed in the route handlers 
            const loggedUser= await this.userModel.findById(payload.sub);

            const loggedUserObject = loggedUser.toObject();
            delete loggedUserObject.passwordHash;
            request['user'] =loggedUserObject;

        }catch{
            throw new UnauthorizedException();
        }

        return true;
    }
    private extractTokenFromHeader(request: Request):string | undefined {
        const [type,token] = request.headers.authorization?.split(' ')??[]
        return type === 'Bearer' ? token: undefined
    }
    
}