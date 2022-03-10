import { ConfigModule } from '@nestjs/config';
import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorController } from './controllers/author.controller';
import { BookController } from './controllers/book.controller';
import { AuthorService } from './services/author.service';
import { BookService } from './services/book.service';
import configuration from 'config/configuration';
import { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MongooseModule.forRoot(process.env.DB_URL_MANAGEMENT, {
      connectionName: 'management',
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: process.env.REDIS_URL,
      // socket: {
      //   host: process.env.REDIS_HOST,
      //   port: Number(process.env.REDIS_PORT),
      // },
    }),
  ],
  controllers: [BookController, AuthorController],
  providers: [BookService, AuthorService],
})
export class ManagementModule {}
