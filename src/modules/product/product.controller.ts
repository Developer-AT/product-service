import { AuthGuard } from 'src/guards/auth.guard';
import { Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
    ApiCreatedResponse,
    ApiTags,
    ApiOkResponse,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { Roles } from 'src/decorators/role.decorator';
import { BookService } from './product.service';

@ApiTags('Books')
@Controller()
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @ApiOkResponse()
    @ApiBearerAuth()
    @Get('all')
    @Roles('user')
    @UseGuards(AuthGuard)
    async getAllBooks() {
        return { books: await this.bookService.getAllBooks() };
    }

    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
    })
    @ApiBearerAuth()
    @Post('add')
    @Roles('admin')
    @UseGuards(AuthGuard)
    async addBook() {
        return await this.bookService.addBook();
    }

    @Put('updated/:bookId')
    @ApiBearerAuth()
    @Roles('user')
    @UseGuards(AuthGuard)
    async updateBookById() {
        return await this.bookService.updateBookById();
    }

    @ApiBearerAuth()
    @Roles('admin')
    @Delete('delete/:bookId')
    @UseGuards(AuthGuard)
    async deleteBookById() {
        return await this.bookService.deleteBookById();
    }

    @GrpcMethod('DemoService', 'GetAllBooks')
    async getAllBooksGrpc(payload) {
        return { books: await this.bookService.getAllBooks() };
    }
}
