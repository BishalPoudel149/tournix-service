import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bookmark, User } from 'src/database/database.schemas';
import { Mode } from 'fs';
import { debugPort } from 'process';

@Injectable()
export class BookmarkService {
   
    constructor(
        @InjectModel('UserModel') private readonly userModel:Model<User>,
        @InjectModel('BookmarkModel') private bookmarkModel:Model<Bookmark>,
    ){}

    async createBookmark(userId:string, dto:CreateBookmarkDto){


      try{
            const newBookmark = new this.bookmarkModel({
                title:dto.title,
                description:dto.description,
                link:dto.link,
                user:userId
            })

            const savedBookmark= await newBookmark.save();
            return savedBookmark;

      }catch(error){
        throw new InternalServerErrorException(`Internal Server Error : ${error}`);
    }
    }

   
     async getBookmarks(userId:string){
        const bookmark = await this.bookmarkModel.find({user:userId});
        return bookmark;
    }
   
    getBookmarkById(userId:string,bookmarkId:number){}

  
    editBookmarkById(userId:string,bookmarkId:number,dto:EditBookmarkDto){}

   
    deleteBookMarkbyId(userId:string,bookmarkId:number){}
}
