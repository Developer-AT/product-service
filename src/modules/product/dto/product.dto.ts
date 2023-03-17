import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class AddProductDto {
    @ApiProperty({ type: String, required: true })
    @IsString()
    name: string;

    @ApiProperty({ type: String, required: true })
    @IsString()
    category: string;

    @ApiProperty({ type: String, required: true })
    @IsString()
    ownerId: string;

    @ApiProperty({ type: String, required: true })
    @IsString()
    ownerName: string;

    @ApiProperty({ type: Number, required: true })
    @IsNumber()
    price: number;
}

export class UpdateProductDto {
    @ApiProperty({ type: String, required: true })
    @IsString()
    productId: string;

    @ApiProperty({ type: String, required: false })
    @IsString()
    category: string;

    @ApiProperty({ type: Boolean, required: false })
    @IsBoolean()
    isSoldOut: boolean;

    @ApiProperty({ type: Boolean, required: false })
    @IsBoolean()
    isRemoved: boolean;
}
