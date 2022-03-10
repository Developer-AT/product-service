import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/decorators/role.decorator';
import { BookService } from '../services/book.service';

@ApiTags('Books')
@Controller()
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOkResponse()
  @ApiBearerAuth()
  @Get('book/all')
  @Roles('user')
  async getAllBooks() {
    return await this.bookService.getAllBooks();
  }

  @ApiCreatedResponse({ description: 'The record has been successfully created.'})
  @ApiBearerAuth()
  @Post('book/add')
  @Roles('admin')
  async addBook(){
    return await this.bookService.addBook();
  }

  @Put('book/updated/:bookId')
  @ApiBearerAuth()
  @Roles('user')
  async updateBookById(){
    return await this.bookService.updateBookById();
  }

  @ApiBearerAuth()
  @Roles('admin')
  @Delete('book/delete/:bookId')
  async deleteBookById(){
    return await this.bookService.deleteBookById();
  }
}
