import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { CategoryEntity } from 'src/entity/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
    private readonly logger = new Logger(CategoryService.name);
    constructor(private readonly categoryEntity: CategoryEntity) {}

    async createCategory(payload: CreateCategoryDto) {
        const isCategoryExist =
            await this.categoryEntity.isCategoryAlreadyExist(payload.name);

        if (isCategoryExist) {
            throw new ConflictException('Category Already Exist');
        }

        return await this.categoryEntity.createCategory(payload);
    }

    async updateCategoryById(categoryId: string, payload: UpdateCategoryDto) {
        return await this.categoryEntity.updateCategory(categoryId, payload);
    }

    async deleteCatgeoryById(categoryId: string) {
        return await this.categoryEntity.deleteCategory(categoryId);
    }

    async getCategories() {
        return await this.categoryEntity.findAll();
    }

    async getCategoryById(categoryId: string) {
        return await this.categoryEntity.findById(categoryId);
    }
}
