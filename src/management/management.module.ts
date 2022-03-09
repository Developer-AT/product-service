import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorController } from './controllers/author.controller';
import { BookController } from './controllers/book.controller';
import { AuthorService } from './services/author.service';
import { BookService } from './services/book.service';
import configuration from 'config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration]
    }),
    MongooseModule.forRoot(process.env.DB_URL_MANAGEMENT, {
      connectionName: 'management',
    })
  ],
  controllers: [BookController, AuthorController],
  providers: [BookService, AuthorService],
})
export class ManagementModule {}
