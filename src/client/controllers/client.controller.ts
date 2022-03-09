import { Controller, Get } from '@nestjs/common';
import { ClientService } from './../services/client.service';

@Controller()
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  getHello(): string {
    return this.clientService.getClient();
  }
}
