import { firstValueFrom } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';
import { ClientGrpc } from '@nestjs/microservices';
import { JwtProvider } from 'src/providers/jwt/jwt.provider';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { HttpResponse, GRpcResponse } from 'src/interfaces/global.interface';
import { ResponseUtilsProvider } from 'src/providers/utils/response.utils.provider';
import { GetUser } from 'src/interfaces/module-level/user.interface';

@Injectable()
export class UserProvider implements OnModuleInit {
    private userService;
    private metaData: Metadata;

    constructor(
        @Inject('USER_PACKAGE') private client: ClientGrpc,
        private readonly jwt: JwtProvider,
        private readonly responseHandler: ResponseUtilsProvider,
    ) {}
    onModuleInit() {
        this.userService = this.client.getService('UserService');
    }

    async getUser(payload: GetUser): Promise<HttpResponse> {
        try {
            this.setToken();
            const res = <GRpcResponse>(
                await firstValueFrom(
                    this.userService.GetUser(payload, this.metaData),
                )
            );
            return this.responseHandler.gRpcRsponseHandler(res);
        } catch (error) {
            console.error('User--Service--getUser--Error', error);
            throw error;
        }
    }

    setToken() {
        try {
            this.jwt.setPayload({});
            const token = this.jwt.signPayload();
            this.metaData.set('authorization', `Bearer ${token}`);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
