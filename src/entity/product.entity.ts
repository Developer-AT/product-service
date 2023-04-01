import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import {
    CreateProductDto,
    UpdateProductDto,
} from 'src/modules/product/dto/product.dto';
import { Dao } from 'src/providers/database/dao.provider';
import { ProductDocument } from 'src/providers/schemas/product.schema';

@Injectable()
export class ProductEntity extends Dao {
    constructor(
        @Inject('PRODUCT_MODEL') private productModel: Model<ProductDocument>,
    ) {
        super(productModel);
    }

    async createProduct(payload: CreateProductDto) {
        return await this.saveData(payload);
    }

    async updateProduct(productId: string, payload: UpdateProductDto) {
        return await this.updateOne({ _id: productId }, payload);
    }

    async deleteProduct(productId: string) {
        return await this.removeOne({ _id: productId });
    }
}
