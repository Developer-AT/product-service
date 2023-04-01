import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Dao } from 'src/providers/database/dao.provider';
import { InterestedBuyerDocument } from 'src/providers/schemas/interested-buyer.schema';

@Injectable()
export class InterestedBuyerEntity extends Dao {
    constructor(
        @Inject('INTERESTED_BUYER_MODEL')
        private interestedBuyer: Model<InterestedBuyerDocument>,
    ) {
        super(interestedBuyer);
    }
}
