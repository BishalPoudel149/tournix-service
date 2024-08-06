import { Module } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { TournamentController } from './tournament.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from './tournament.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Tournament])],
    controllers: [TournamentController],
    providers: [TournamentService],
    exports:[TypeOrmModule]
    
})
export class TournamentModule {}
