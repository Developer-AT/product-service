import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import {
    CreateCategoryDto,
    UpdateCategoryDto,
} from 'src/modules/category/dto/category.dto';

import { Dao } from 'src/providers/database/dao.provider';
import { CategoryDocument } from 'src/providers/schemas/category.schema';

@Injectable()
export class CategoryEntity extends Dao {
    constructor(
        @Inject('CATEGORY_MODEL')
        private categoryModel: Model<CategoryDocument>,
    ) {
        super(categoryModel);
    }

    async createCategory(payload: CreateCategoryDto) {
        return await this.saveData(payload);
    }

    async updateCategory(categoryId: string, payload: UpdateCategoryDto) {
        return await this.updateOne({ _id: categoryId }, payload);
    }

    async deleteCategory(userId: string) {
        return await this.removeOne({ _id: userId });
    }

    async isCategoryAlreadyExist(categoryName: string) {
        const criteria = { name: categoryName };
        const category = await this.findOne(criteria);
        console.log(
            'Category--Entity--isCategoryAlreadyExist--category',
            category,
        );
        return Boolean(category);
    }
}
