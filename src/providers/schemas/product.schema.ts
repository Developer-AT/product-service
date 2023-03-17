import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Category } from './category.schema';

export type ProductDocument = Product & Document;

@Schema({ versionKey: false, timestamps: true })
export class Product {
    @Prop({
        type: String,
        required: true,
    })
    name: string;

    @Prop({
        type: Types.ObjectId,
        required: true,
        ref: 'Category'
    })
    category: Category;

    @Prop({ type: Types.ObjectId, required: true, index: true })
    ownerId: string;

    @Prop({
        type: String,
        required: true,
    })
    ownerName: string;

    @Prop({ type: Number, required: true })
    price: number;

    @Prop({ type: Boolean, default: false })
    isSoldOut: boolean;

    @Prop({ type: Boolean,  default: false })
    isRemoved: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

export const ProductModelName = 'Product';
