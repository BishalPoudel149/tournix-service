import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { Model } from 'mongoose';
import { Tournament, User } from 'src/database/database.schemas';
import { InjectModel, ModelDefinition } from '@nestjs/mongoose';
import { retry } from 'rxjs';

@Injectable()
export class TournamentService {

    constructor(
        @InjectModel('UserModel') private readonly userModel:Model<User>,
        @InjectModel('TournamentModel') private readonly tournamentModel:Model<Tournament>
    ){}

  
    async createTournament(userId:string,dto:CreateTournamentDto){

       try{
     const newTournament= new this.tournamentModel({
       name:dto.name,
       category:dto.category,
       date:dto.date,
       time:dto.time,
       user:userId
     })

     const savedTour= await newTournament.save();
     return savedTour;

    }catch(error){
        throw new InternalServerErrorException(`Internal Server Error : ${error}`);

    }


    }


    async getTournament(gameCategory:string){
        try{
            gameCategory=gameCategory.toUpperCase();
            const tournaList = await this.tournamentModel.find({category:gameCategory})
            return tournaList;
        }catch(error){
            throw new InternalServerErrorException(`Internal Server Error : ${error}`);

        }
    }

}
