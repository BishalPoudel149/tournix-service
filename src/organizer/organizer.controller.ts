import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetUser } from 'src/decorator/user.decorator';
import { createOrganizerRequestDto } from 'src/dto/organizer.dto';
import { OrganizerService } from './organizer.service';

@Controller('organizer')
export class OrganizerController {

    constructor(private organizerService:OrganizerService){}


    @UseGuards(AuthGuard)
    @Post('request')
    sendRequest(@GetUser('_id') userId: string, @Body() organizerDto: createOrganizerRequestDto) {
        return this.organizerService.requestOrganizer(userId,organizerDto);
    }


}
