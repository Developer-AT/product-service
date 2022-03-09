import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientService {
  getClient(): string {
    return 'List of all Clients!';
  }
}
