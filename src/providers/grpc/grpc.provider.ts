import { join } from 'path';
import { ClientsModuleOptions, Transport } from '@nestjs/microservices';

export const grpcProviders: ClientsModuleOptions = [
  {
    name: 'AUTH_PACKAGE',
    transport: Transport.GRPC,
    options: {
      package: process.env.PROTO_AUTH_PACKAGE,
      protoPath: join(__dirname, process.env.PROTO_AUTH_PATH),
      url: process.env.PROTO_AUTH_URL,
    },
  },
  {
    name: 'USER_PACKAGE',
    transport: Transport.GRPC,
    options: {
      package: process.env.PROTO_USER_PACKAGE,
      protoPath: join(__dirname, process.env.PROTO_USER_PATH),
      url: process.env.PROTO_USER_URL,
    },
  },
];
