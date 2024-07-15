import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { TournamentModule } from './tournament/tournament.module';

@Module({
  imports: [
    AuthModule, 
    UserModule, 
    BookmarkModule,
    MongooseModule.forRoot('mongodb://localhost:27017/mymongodb'),
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TournamentModule,
  ],
})
export class AppModule {}
