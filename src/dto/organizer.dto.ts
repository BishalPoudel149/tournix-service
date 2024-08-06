import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class createOrganizerRequestDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    @IsString()
    contact: string;

}