import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { EntityModule } from 'src/entity/entity.module';
import { GrpcModule } from 'src/providers/grpc/grpc.module';
@Module({
    imports: [ConfigModule.forRoot(), EntityModule, GrpcModule],
    controllers: [ProductController],
    providers: [ProductService],
})
// {
//   provide: APP_GUARD,
//   useClass: AuthGuard
// }
export class ProductModule {}
