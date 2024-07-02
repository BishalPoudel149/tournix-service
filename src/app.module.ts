import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule, 
    UserModule, 
    BookmarkModule,
    MongooseModule.forRoot('mongodb://localhost:27017/mymongodb'),
    DatabaseModule
  ],
})
export class AppModule {}
