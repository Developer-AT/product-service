import { Connection } from 'mongoose';
import { CategoryModelName, CategorySchema } from './category.schema';
import {
    InterestedBuyerModelName,
    InterestedBuyerSchema,
} from './interested-buyer.schema';
import { ProductModelName, ProductSchema } from './product.schema';

export const schemaProviders = [
    {
        provide: 'CATEGORY_MODEL',
        useFactory: (connection: Connection) =>
            connection.model(CategoryModelName, CategorySchema),
        inject: ['DATABASE_CONNECTION'],
    },
    {
        provide: 'PRODUCT_MODEL',
        useFactory: (connection: Connection) =>
            connection.model(ProductModelName, ProductSchema),
        inject: ['DATABASE_CONNECTION'],
    },
    {
        provide: 'INTERESTED_BUYER_MODEL',
        useFactory: (connection: Connection) =>
            connection.model(InterestedBuyerModelName, InterestedBuyerSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
