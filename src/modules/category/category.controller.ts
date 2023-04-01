import { ClientType, UserRole } from 'src/interfaces/enums';
import { AuthGuard } from 'src/guards/auth.guard';
import { AccessBy, HavingRole } from 'src/decorators/access-control.decorator';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
    Req,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { CategoryService } from './category.service';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    @ApiBearerAuth()
    @AccessBy(ClientType.USER)
    @HavingRole(UserRole.BRONZE, UserRole.SILVER, UserRole.GOLD)
    @UseGuards(AuthGuard)
    async addCategory(@Body(new ValidationPipe()) payload: CreateCategoryDto) {
        return await this.categoryService.createCategory(payload);
    }

    @Get('all')
    @ApiBearerAuth()
    @AccessBy(ClientType.USER)
    @HavingRole(UserRole.BRONZE, UserRole.SILVER, UserRole.GOLD)
    @UseGuards(AuthGuard)
    async getCategories() {
        return await this.categoryService.getCategories();
    }

    @Get(':categoryId')
    @ApiBearerAuth()
    @AccessBy(ClientType.USER)
    @HavingRole(UserRole.BRONZE, UserRole.SILVER, UserRole.GOLD)
    @UseGuards(AuthGuard)
    async getCategoryById(@Param('categoryId') categoryId: string) {
        return await this.categoryService.getCategoryById(categoryId);
    }

    @Patch(':categoryId')
    @ApiBearerAuth()
    @AccessBy(ClientType.USER)
    @HavingRole(UserRole.BRONZE, UserRole.SILVER, UserRole.GOLD)
    @UseGuards(AuthGuard)
    async updateCategoryById(
        @Param('categoryId') categoryId: string,
        @Body(new ValidationPipe()) payload: UpdateCategoryDto,
    ) {
        return await this.categoryService.updateCategoryById(
            categoryId,
            payload,
        );
    }

    @Delete(':categoryId')
    @ApiBearerAuth()
    @AccessBy(ClientType.USER)
    @HavingRole(UserRole.BRONZE, UserRole.SILVER, UserRole.GOLD)
    @UseGuards(AuthGuard)
    async deleteUserById(@Param('categoryId') categoryId: string) {
        return await this.categoryService.deleteCatgeoryById(categoryId);
    }
}
