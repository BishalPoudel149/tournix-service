import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './database.schemas';

@Global()
@Module({
    imports:[
        MongooseModule.forFeature([{name:'UserModel',schema:UserSchema}]),
    ],
    exports :[MongooseModule],
    providers: []
})
export class DatabaseModule {}
