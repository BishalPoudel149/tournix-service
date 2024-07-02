import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, BookmarkSchema } from './database.schemas';

@Global()
@Module({
    imports:[
        MongooseModule.forFeature([{name:'UserModel',schema:UserSchema}]),
        MongooseModule.forFeature([{name:'BookmarkModel',schema:BookmarkSchema}])
    ],
    exports :[MongooseModule]
})
export class DatabaseModule {}
