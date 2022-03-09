import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientService } from './services/client.service';
import { ClientController } from './controllers/client.controller';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    MongooseModule.forRoot(process.env.DB_URL_CLIENT, {
      connectionName: 'client',
    })
  ],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
