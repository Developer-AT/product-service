import { UtilsModule } from 'src/providers/utils/utils.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthProvider } from './auth/auth.provider';
import { BookProvider } from './user/user.provider';
import { JwtModule } from './../jwt/jwt.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        ClientsModule.register([
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
        ]),
        JwtModule,
        UtilsModule,
    ],
    providers: [AuthProvider, BookProvider],
    exports: [AuthProvider, BookProvider],
})
export class GrpcModule {}
