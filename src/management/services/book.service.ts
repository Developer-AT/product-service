import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BookService {
  constructor(private configService: ConfigService){}
  getAllBooks(): string {
    return `List of all Books! ${this.configService.get<string>('DB_URL_MANAGEMENT')},  ${this.configService.get<string>('database.management')}, ${this.configService.get<string>('global.redis')}`;
  }

  addBook(){
    return 'Book added!'
  }

  updateBookById(){
    return 'Update Book by Id'
  }

  deleteBookById(){
    return 'Delete Book By Id'
  }
}
