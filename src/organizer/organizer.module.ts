import { Module } from '@nestjs/common';
import { OrganizerController } from './organizer.controller';
import { OrganizerService } from './organizer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organizer } from './organizer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Organizer])
  ],
  controllers: [OrganizerController],
  providers: [OrganizerService],
  exports: [TypeOrmModule]
})
export class OrganizerModule { }
