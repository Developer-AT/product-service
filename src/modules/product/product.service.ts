import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProductService {
    private readonly logger = new Logger(ProductService.name);
    constructor(
        private configService: ConfigService
    ) {}

    
}
