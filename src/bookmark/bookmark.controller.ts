import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from 'src/decorator/user.decorator';
import { CreateBookmarkDto } from './dto';
import { EditBookmarkDto } from './dto/edit-bookmark.dto';

@UseGuards(AuthGuard)
@Controller('bookmark')
export class BookmarkController {

    constructor(
    private bookmarkService:BookmarkService
    ){}

    @Post()
    createBookmark(
        @GetUser('_id') userId:string,
         @Body() dto:CreateBookmarkDto){
        return this.bookmarkService.createBookmark(userId,dto);
        }

    @Get()
    getBookmarks(@GetUser('_id') userId:string){
     return this.bookmarkService.getBookmarks(userId);
    }
    
    @Get(':id')
    getBookmarkById(
        @GetUser('_id') userId:string,
        @Param('id',ParseIntPipe) bookmarkId:number,
    ){
        return this.bookmarkService.getBookmarkById(userId,bookmarkId);
    }

    @Patch(':id')
    editBookmarkById(
        @GetUser('_id') userId:string,
        @Param('id',ParseIntPipe) bookmarkId:number,
        @Body()dto:EditBookmarkDto,
    ){
        return this.bookmarkService.editBookmarkById(userId,bookmarkId,dto);

    }

    @Delete(':id')
    deleteBookMarkbyId(
        @GetUser('_id') userId:string,
        @Param('id',ParseIntPipe) bookmarkId:number,
    ){
        return this.deleteBookMarkbyId(userId,bookmarkId);
    }




}
