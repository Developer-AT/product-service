import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/providers/database/db.module';
import { schemaProviders } from 'src/providers/schemas/schema.provider';
import { CategoryEntity } from './category.entity';
import { ProductEntity } from './product.entity';
import { InterestedBuyerEntity } from './interested-buyer.entity';

@Module({
    imports: [DatabaseModule],
    providers: [
        ...schemaProviders,
        CategoryEntity,
        ProductEntity,
        InterestedBuyerEntity,
    ],
    exports: [CategoryEntity, ProductEntity, InterestedBuyerEntity],
})
export class EntityModule {}
