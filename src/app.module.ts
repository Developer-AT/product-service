import { Module, CacheModule } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import globalConfig from 'config/global.config';
import { BookModule } from './modules/product/book.module';
import { AuthorModule } from './modules/buyer/author.module';
import configuration from 'config/configuration';
import { RedisClientOptions } from 'redis';
import { redisProvider } from './providers/redis/redis.provider';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [globalConfig, configuration],
        }),
        CacheModule.register<RedisClientOptions>(...redisProvider),
        BookModule,
        AuthorModule,
        RouterModule.register([
            {
                path: 'book',
                module: BookModule,
            },
            {
                path: 'author',
                module: AuthorModule,
            },
        ]),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
