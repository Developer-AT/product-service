import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';

@Module({
  imports: [ClientModule,
    RouterModule.register([
      {
        path: 'clients',
        module: ClientModule,
      },
    ])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
