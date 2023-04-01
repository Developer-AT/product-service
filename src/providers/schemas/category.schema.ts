import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ versionKey: false, timestamps: true })
export class Category {
    @Prop({
        type: String,
        required: true,
        index: true,
    })
    name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

export const CategoryModelName = 'Category';
