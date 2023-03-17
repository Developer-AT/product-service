import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { BookController } from './product.controller';
import { BookService } from './product.service';
import { ClientsModule } from '@nestjs/microservices';
import { DatabaseModule } from 'src/providers/database/db.module';
@Module({
    imports: [
        ConfigModule.forRoot(),
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
