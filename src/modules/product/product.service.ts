import { Injectable, Logger } from '@nestjs/common';
import { ProductEntity } from 'src/entity/product.entity';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
    private readonly logger = new Logger(ProductService.name);
    constructor(private readonly productEntity: ProductEntity) {}

    async createProduct(payload: CreateProductDto) {
        return await this.productEntity.createProduct(payload);
    }

    async updateProductById(productId: string, payload: UpdateProductDto) {
        return await this.productEntity.updateProduct(productId, payload);
    }

    async deleteProductById(productId: string) {
        return await this.productEntity.deleteProduct(productId);
    }

    async getProducts() {
        return await this.productEntity.findAll();
    }

    async getCategoryById(productId: string) {
        return await this.productEntity.findById(productId);
    }
}
