import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';

@Injectable()
export class BookService {
  private readonly logger = new Logger(BookService.name)
  constructor(
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getAllBooks(): Promise<string> {
    const cacheRes = await this.cacheManager.get('book');
    this.logger.log('cacheRes :: ', cacheRes);
    return `List of all Books! ${this.configService.get<string>(
      'DB_URL_MANAGEMENT',
    )},  ${this.configService.get<string>(
      'database.management',
    )}, ${this.configService.get<string>('global.redis.url')}`;
  }

  async addBook() {
    const cacheRes = await this.cacheManager.set('book', 'The Kashmir Files');
    this.logger.log('cacheRes :: ', cacheRes);
    return 'Book added!';
  }

  async updateBookById() {
    return 'Update Book by Id';
  }

  async deleteBookById() {
    const cacheRes = await this.cacheManager.del('book');
    this.logger.log('cacheRes :: ', cacheRes);
    return 'Delete Book By Id';
  }
}
