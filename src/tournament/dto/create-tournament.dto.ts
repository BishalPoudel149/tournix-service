import { IsEnum, IsNotEmpty, IsString, isString } from "class-validator"
import {TournamentCategory} from '../../enum/tournamentCategory.enum'

export class CreateTournamentDto{

    @IsString()
    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    date:Date

    @IsNotEmpty()
    @IsEnum(TournamentCategory,{ message: 'Category must be one of: PUBG, COD, FIFA, Fortnite, CounterStrike' })
    category:TournamentCategory

    @IsNotEmpty()
    time:string

}