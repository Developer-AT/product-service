import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
    @ApiProperty({ type: String, required: true })
    @IsString()
    name: string;
}

export class UpdateCategoryDto {
    @ApiProperty({ type: String, required: true })
    @IsString()
    name: string;
}
