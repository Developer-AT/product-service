import { ConfigModule } from '@nestjs/config';
import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import configuration from 'config/configuration';
import { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guards/auth.guard';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { DatabaseModule } from 'src/providers/database/db.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'AUTH_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: process.env.PROTO_AUTH_PACKAGE,
          protoPath: join(__dirname, process.env.PROTO_AUTH_PATH),
          url: process.env.PROTO_AUTH_URL
        }
      }
    ]),
    DatabaseModule
  ],
  controllers: [BookController],
  providers: [BookService],
})
// {
//   provide: APP_GUARD,
//   useClass: AuthGuard
// }
export class BookModule {}
