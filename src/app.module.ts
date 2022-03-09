import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ManagementModule } from './management/management.module';
import { ClientModule } from './client/client.module';
import { ConfigModule } from '@nestjs/config';
import globalConfig from 'config/global.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [globalConfig]
    }),
    ClientModule,
    ManagementModule,
    RouterModule.register([
      {
        path: 'clients',
        module: ClientModule,
      },
      {
        path: 'manage',
        module: ManagementModule,
      },
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
