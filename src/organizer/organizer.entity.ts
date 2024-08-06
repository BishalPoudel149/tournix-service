import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from "typeorm";

@Entity('organizer')
export class Organizer {

    @ObjectIdColumn()
    _id: string;

    @IsNotEmpty()
    @IsString()
    @Column()
    organizerName: string;

    @IsNotEmpty()
    @IsString()
    @Column()
    address: string;

    @IsNotEmpty()
    @IsString()
    @Column()
    contact: string;

    @IsNotEmpty()
    @Column()
    user: string;

    @IsNotEmpty()
    @Column()
    isApproved: boolean;

    @Column()
    approvedBy: string;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;


}