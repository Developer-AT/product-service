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
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guards/auth.guard';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

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
    ClientsModule.register([
      {
        name: 'AUTH_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'auth',
          protoPath: join(__dirname, '../auth.proto'),
          url: 'localhost:5000'
        }
      }
    ])
  ],
  controllers: [BookController, AuthorController],
  providers: [BookService, AuthorService, {
    provide: APP_GUARD,
    useClass: AuthGuard
  }],
})
export class ManagementModule {}
