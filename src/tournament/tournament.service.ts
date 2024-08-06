import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/database/database.schemas';
import { InjectModel, ModelDefinition } from '@nestjs/mongoose';
import { retry } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from './tournament.entity';
import { MongoRepository } from 'typeorm';
import { ObjectID, ObjectId } from 'mongodb';

@Injectable()
export class TournamentService {

    constructor(
        @InjectModel('UserModel') private readonly userModel:Model<User>,

        @InjectRepository(Tournament)
        private tournamentRepository:MongoRepository<Tournament>,
    ){}

  
    async createTournament(userId:string,dto:CreateTournamentDto){

       try{
    const newTournament = new Tournament();
       newTournament.name=dto.name;
       newTournament.category=dto.category;
       newTournament.date=dto.date;
       newTournament.time=dto.time;
       newTournament.isActive=true;
       newTournament.user= userId;
       
      
    
     const savedTour= await this.tournamentRepository.save(newTournament);
     return savedTour;

    }catch(error){
        throw new InternalServerErrorException(`Internal Server Error : ${error}`);

    }
    }


    async getTournament(gameCategory:string){
        try{
            gameCategory=gameCategory.toUpperCase();
            const tournaList = await this.tournamentRepository.find({category:gameCategory});
            return tournaList;
        }catch(error){
            throw new InternalServerErrorException(`Internal Server Error : ${error}`);

        }
    }

    // async deactivateTournament(id:string){
    //    const tourn= await this.tournamentRepository.findOne({where: {_id:new ObjectID(id)} });
    //    if(tourn){
    //            tourn.isActive=false;
    //            await this.tournamentRepository.save(tourn);
    //            return tourn;
    //    }
    //    else
    //    return `Coudn't find the tournament with id ${id}`

    // }


    async deactivateTournament(id:string){
        try{
            const tourn= await this.tournamentRepository
                                    .updateOne({_id:new ObjectId(id)},
                                        {
                                          $set :{
                                                isActive:false,
                                          },
                                        }
                                    );

                                    return tourn;
                                    
	// "acknowledged": true,
	// "modifiedCount": 0,
	// "upsertedId": null,
	// "upsertedCount": 0,
	// "matchedCount": 1


        }catch(error){
            throw new InternalServerErrorException(`Internal Server Error : ${error}`);
        }
 
     }



}
