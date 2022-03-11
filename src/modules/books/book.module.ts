import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { ClientsModule } from '@nestjs/microservices';
import { DatabaseModule } from 'src/providers/database/db.module';
import { grpcProviders } from 'src/providers/grpc/grpc.provider';
@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register(grpcProviders),
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
