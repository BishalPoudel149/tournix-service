import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { TournamentModule } from './tournament/tournament.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizerModule } from './organizer/organizer.module';

@Module({
  imports: [
    AuthModule, 
    UserModule, 
    MongooseModule.forRoot('mongodb://localhost:27017/mymongodb'),
    //also using the typeorm for certain objects in the application 

    TypeOrmModule.forRoot({
        type:'mongodb',
        host:'localhost',
        port:27017,
        database:'mymongodb',
        entities:[],


        autoLoadEntities:true

    }),
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TournamentModule,
    OrganizerModule,
  ],
})
export class AppModule {}
