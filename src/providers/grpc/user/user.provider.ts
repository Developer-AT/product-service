import { firstValueFrom } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';
import { ClientGrpc } from '@nestjs/microservices';
import { JwtProvider } from 'src/providers/jwt/jwt.provider';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { HttpResponse, GRpcResponse } from 'src/interfaces/global.interface';
import { ResponseUtilsProvider } from 'src/providers/utils/response.utils.provider';
import { GrpcGetUserPayload } from 'src/interfaces/module-level/user.interface';
import { ServiceType } from 'src/interfaces/enums';

@Injectable()
export class UserProvider implements OnModuleInit {
    private userService;
    private metaData: Metadata;

    constructor(
        @Inject('USER_PACKAGE') private client: ClientGrpc,
        private readonly jwt: JwtProvider,
        private readonly responseHandler: ResponseUtilsProvider,
    ) {
        this.metaData = new Metadata();
        this.metaData.set('service', ServiceType.PRODUCT);
    }
    onModuleInit() {
        this.userService = this.client.getService('UserService');
    }

    async getUser(payload: GrpcGetUserPayload): Promise<HttpResponse> {
        try {
            this.setToken();
            const res = <GRpcResponse>(
                await firstValueFrom(
                    this.userService.GetUserById(payload, this.metaData),
                )
            );
            return this.responseHandler.gRpcResponseHandler(res);
        } catch (error) {
            console.error('User--Service--getUser--Error', error);
            throw error;
        }
    }

    async getUserByKeycloakId(
        payload: GrpcGetUserPayload,
    ): Promise<HttpResponse> {
        try {
            this.setToken();
            const res = <GRpcResponse>(
                await firstValueFrom(
                    this.userService.GetUserByKeycloakId(
                        payload,
                        this.metaData,
                    ),
                )
            );
            console.error('User--Service--getUserByKeycloakId--res', res);
            return this.responseHandler.gRpcResponseHandler(res);
        } catch (error) {
            console.error('User--Service--getUserByKeycloakId--Error', error);
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
