import { Module } from '@nestjs/common';
import { ClientService } from './services/client.service';
import { ClientController } from './controllers/client.controller';

@Module({
  imports: [],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
