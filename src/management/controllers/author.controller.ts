import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthorService } from '../services/author.service';

@ApiTags('Authors')
@Controller()
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @ApiOkResponse()
  @Get('author/all')
  getAllAuthors() {
    return this.authorService.getAllAuthors();
  }

  @ApiCreatedResponse({ description: 'The record has been successfully created.'})
  @Post('author/add')
  addAuthor(){
    return this.authorService.addAuthor();
  }

  @Put('author/updated/:authorId')
  updateAuthorById(){
    return this.authorService.updateAuthorById();
  }

  @Delete('author/delete/:authorId')
  deleteAuthorById(){
    return this.authorService.deleteAuthorById();
  }
}
