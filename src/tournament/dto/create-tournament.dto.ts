import { IsDateString, IsEnum, IsIn, IsNotEmpty, IsString, isString } from "class-validator"
import {TournamentCategory} from '../../enum/tournamentCategory.enum'

const allowedCategories = ['PUBG', 'COD', 'FIFA', 'Fortnite', 'CounterStrike'];


export class CreateTournamentDto{

    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsNotEmpty()
    @IsIn(allowedCategories, {
      message: (args: any) => `${args.value} is not a valid category!`
    })
    category: string;
  
    @IsDateString()
    @IsNotEmpty()
    date: string;
  
    @IsString()
    @IsNotEmpty()
    time: string;

}