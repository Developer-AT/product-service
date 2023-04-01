import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { GrpcModule } from 'src/providers/grpc/grpc.module';
import { EntityModule } from 'src/entity/entity.module';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
    imports: [ConfigModule.forRoot(), GrpcModule, EntityModule],
    controllers: [CategoryController],
    providers: [CategoryService],
})
export class CategoryModule {}
