import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddProductDto {
    @ApiProperty({ type: String, required: true })
    @IsString()
    name: string;
}

export class UpdateProductDto {
    @ApiProperty({ type: String, required: true })
    @IsString()
    name: string;
}
