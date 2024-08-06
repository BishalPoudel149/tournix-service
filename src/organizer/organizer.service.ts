import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createOrganizerRequestDto } from 'src/dto/organizer.dto';
import { Organizer } from './organizer.entity';
import { MongoRepository } from 'typeorm';

@Injectable()
export class OrganizerService {

    constructor(
        @InjectRepository(Organizer)
        private organizerRepository: MongoRepository<Organizer>,
    ) { }

    async requestOrganizer(userId: string, organizerDto: createOrganizerRequestDto) {

        //create new instance of entity  and save incoming request to db
        try {
            const newOrganizer = new Organizer();
            newOrganizer.user = userId;
            newOrganizer.organizerName = organizerDto.name;
            newOrganizer.address = organizerDto.address;
            newOrganizer.contact = organizerDto.contact;
            newOrganizer.isApproved=false;

            const savedOrganizer= await this.organizerRepository.save(newOrganizer);
            return savedOrganizer;

        } catch (error) {
            throw new InternalServerErrorException(`Internal Server Error : ${error}`);
        }

    }
}
