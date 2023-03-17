import { ValidateToken } from '../../../interfaces/module-level/auth.interface';
import { Observable, firstValueFrom } from 'rxjs';
import { Inject, Injectable, OnModuleInit, UsePipes } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';
import { JwtProvider } from 'src/providers/jwt/jwt.provider';
import { ServiceType } from 'src/interfaces/enums';
import { GRpcResponse, HttpResponse } from 'src/interfaces/global.interface';
import { ResponseUtilsProvider } from 'src/providers/utils/response.utils.provider';

@Injectable()
export class AuthProvider implements OnModuleInit {
    private authService;
    private metaData: Metadata;

    constructor(
        @Inject('AUTH_PACKAGE') private client: ClientGrpc,
        private readonly jwt: JwtProvider,
        private readonly responseHandler: ResponseUtilsProvider,
    ) {
        this.metaData = new Metadata();
        this.metaData.set('service', ServiceType.USER);
    }
    onModuleInit() {
        this.authService = this.client.getService('AuthService');
    }

    async validate(payload: ValidateToken): Promise<HttpResponse> {
        try {
            this.setToken();
            const res = <GRpcResponse>(
                await firstValueFrom(
                    this.authService.Validate(payload, this.metaData),
                )
            );
            console.log('Auth--Service--validate--res', res);
            return this.responseHandler.gRpcRsponseHandler(res);
        } catch (error) {
            console.error('Auth--Service--validate--Error', error);
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
