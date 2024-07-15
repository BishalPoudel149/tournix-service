import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, BookmarkSchema,TournamentSchema } from './database.schemas';

@Global()
@Module({
    imports:[
        MongooseModule.forFeature([{name:'UserModel',schema:UserSchema}]),
        MongooseModule.forFeature([{name:'BookmarkModel',schema:BookmarkSchema}]),
        MongooseModule.forFeature([{name:'TournamentModel',schema:TournamentSchema}])
    ],
    exports :[MongooseModule],
    providers: []
})
export class DatabaseModule {}
