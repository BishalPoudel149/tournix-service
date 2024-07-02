import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';

@Module({
    imports:[],
    controllers:[UserController]
})
export class UserModule {}
