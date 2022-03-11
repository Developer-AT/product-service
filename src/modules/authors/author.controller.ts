import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthorService } from './author.service';

@ApiTags('Authors')
@Controller()
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @ApiOkResponse()
  @Get('all')
  getAllAuthors() {
    return this.authorService.getAllAuthors();
  }

  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @Post('add')
  addAuthor() {
    return this.authorService.addAuthor();
  }

  @Put('updated/:authorId')
  updateAuthorById() {
    return this.authorService.updateAuthorById();
  }

  @Delete('delete/:authorId')
  deleteAuthorById() {
    return this.authorService.deleteAuthorById();
  }
}
