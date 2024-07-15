import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { TournamentService } from './tournament.service';
import { GetUser } from 'src/decorator/user.decorator';
import { CreateTournamentDto } from './dto/create-tournament.dto';

@Controller('tournament')
export class TournamentController {

    constructor(private _tournamentService: TournamentService){}
    
    @UseGuards(AuthGuard)
    @Post()
    createTournament(@GetUser('_id') userId:string,@Body()dto:CreateTournamentDto){
        return this._tournamentService.createTournament(userId,dto);
   
    }

    @Get(':category')
    getTournament(@Param('category') gameCategory:string){
        return this._tournamentService.getTournament(gameCategory);
    }
}
