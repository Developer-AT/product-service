import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientService } from './../services/client.service';

@ApiTags('Clients')
@Controller()
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  getHello(): string {
    return this.clientService.getClient();
  }
}
