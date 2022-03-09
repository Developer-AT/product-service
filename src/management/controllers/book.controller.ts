import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { BookService } from '../services/book.service';

@ApiTags('Books')
@Controller()
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOkResponse()
  @Get('book/all')
  getAllBooks() {
    return this.bookService.getAllBooks();
  }

  @ApiCreatedResponse({ description: 'The record has been successfully created.'})
  @Post('book/add')
  addBook(){
    return this.bookService.addBook();
  }

  @Put('book/updated/:bookId')
  updateBookById(){
    return this.bookService.updateBookById();
  }

  @Delete('book/delete/:bookId')
  deleteBookById(){
    return this.bookService.deleteBookById();
  }
}
