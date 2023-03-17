import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type InterestedBuyerDocument = InterestedBuyer & Document;

@Schema({ versionKey: false, timestamps: true })
export class InterestedBuyer {
    @Prop({ type: Types.ObjectId, required: true, index: true })
    buyerId: string;

    @Prop({
        type: String,
        required: true,
        index: true,
    })
    buyerName: string;

    @Prop({ type: Number, required: true })
    suggestedPrice: number;

    @Prop({ type: Boolean, default: true })
    isNegotiable: boolean
}

export const UserSchema = SchemaFactory.createForClass(User);

export const UserModelName = 'User';
