import { IsDate, IsIn, IsNotEmpty, IsString, isString } from "class-validator";
import { ObjectId } from "mongodb";
import { Entity,Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";


const allowedCategories = ['PUBG', 'COD', 'FIFA', 'Fortnite', 'CounterStrike']; // Example dynamic list


@Entity('tournament')
export class Tournament{

    @ObjectIdColumn()
    _id:string;

    @Column()
    @IsString()
    @IsNotEmpty()
    name:string;

    @Column()
    @IsString()
    @IsNotEmpty()
    @IsIn(allowedCategories,{
        message: (args: any) => `${args.value} is not a valid category!`
    })
    category:string;

    @Column()
    @IsString()
    @IsNotEmpty()
    date: string;
  
    @Column()
    @IsString()
    @IsNotEmpty()
    time: string;

    @Column({default:true})
    @IsNotEmpty()
    isActive:boolean


    @Column()
    @IsString()
    @IsNotEmpty()
    user:string
    

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;


}