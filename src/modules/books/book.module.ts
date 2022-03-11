import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
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
          url: process.env.PROTO_AUTH_URL,
        },
      },
    ]),
    DatabaseModule,
  ],
  controllers: [BookController],
  providers: [BookService],
})
// {
//   provide: APP_GUARD,
//   useClass: AuthGuard
// }
export class BookModule {}
