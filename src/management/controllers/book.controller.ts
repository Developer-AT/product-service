import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { BookService } from '../services/book.service';

@ApiTags('Books')
@Controller()
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOkResponse()
  @Get('book/all')
  async getAllBooks() {
    return await this.bookService.getAllBooks();
  }

  @ApiCreatedResponse({ description: 'The record has been successfully created.'})
  @Post('book/add')
  async addBook(){
    return await this.bookService.addBook();
  }

  @Put('book/updated/:bookId')
  async updateBookById(){
    return await this.bookService.updateBookById();
  }

  @Delete('book/delete/:bookId')
  async deleteBookById(){
    return await this.bookService.deleteBookById();
  }
}
