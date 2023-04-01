import { AuthGuard } from 'src/guards/auth.guard';
import {
    Controller,
    Delete,
    Get,
    Post,
    Put,
    UseGuards,
    Body,
    Patch,
    Param,
    Req,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AccessBy, HavingRole } from 'src/decorators/access-control.decorator';
import { ProductService } from './product.service';
import { ClientType, UserRole } from 'src/interfaces/enums';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('Product')
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @ApiBearerAuth()
    @Get('all')
    @AccessBy(ClientType.USER)
    @HavingRole(UserRole.BRONZE, UserRole.SILVER, UserRole.GOLD)
    @UseGuards(AuthGuard)
    async getProducts() {
        return await this.productService.getProducts();
    }

    @ApiBearerAuth()
    @Post('')
    @AccessBy(ClientType.USER)
    @HavingRole(UserRole.BRONZE, UserRole.SILVER, UserRole.GOLD)
    @UseGuards(AuthGuard)
    async addProduct(
        @Body(new ValidationPipe()) payload: CreateProductDto,
        @Req() req: any,
    ) {
        const userData = req.userData;
        payload.ownerId = userData._id.toString();
        payload.ownerName = `${userData.firstName} ${userData.lastName}`;
        return await this.productService.createProduct(payload);
    }

    @Patch(':productId')
    @ApiBearerAuth()
    @AccessBy(ClientType.USER)
    @HavingRole(UserRole.BRONZE, UserRole.SILVER, UserRole.GOLD)
    @UseGuards(AuthGuard)
    async updateBookById(
        @Param('productId') productId: string,
        @Body(new ValidationPipe()) payload: UpdateProductDto,
    ) {
        return await this.productService.updateProductById(productId, payload);
    }

    @Delete(':productId')
    @ApiBearerAuth()
    @AccessBy(ClientType.USER)
    @HavingRole(UserRole.BRONZE, UserRole.SILVER, UserRole.GOLD)
    @UseGuards(AuthGuard)
    async deleteBookById(@Param('productId') productId: string) {
        return await this.productService.deleteProductById(productId);
    }

    // @GrpcMethod('DemoService', 'GetAllBooks')
    // async getAllBooksGrpc(payload) {
    //     return { books: await this.bookService.getAllBooks() };
    // }
}
