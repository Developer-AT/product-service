import { Request } from 'express';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';
import { Reflector } from '@nestjs/core';
import { ClientType } from 'src/interfaces/enums';
import { ValidateToken } from 'src/interfaces/module-level/auth.interface';
import { AuthProvider } from 'src/providers/grpc/auth/auth.provider';
import { UserProvider } from 'src/providers/grpc/user/user.provider';
import { GrpcGetUserPayload } from 'src/interfaces/module-level/user.interface';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly authprovider: AuthProvider,
        private readonly userprovider: UserProvider,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        console.log(request.headers);
        if (!request?.headers?.authorization) {
            throw new UnauthorizedException('Invalid Token');
        }

        const bearerToken = request.headers.authorization;
        const authToken: string[] = bearerToken.split(' ');

        if (!authToken[1]) {
            throw new UnauthorizedException('Invalid Token');
        }

        const accessBy = this.reflector.get<ClientType>(
            'accessBy',
            context.getHandler(),
        );

        const roles = this.reflector.get<string[]>(
            'roles',
            context.getHandler(),
        );

        const tokenData = await this.validate(authToken[1], accessBy, roles);
        console.log('Auth--Guard--canActivate--data', tokenData);
        const userData = await this.getUserByKeycloakId(
            tokenData.data.userKeycloakId,
        );
        console.log('Auth--Guard--canActivate--userData', userData);
        request.userData = userData.data;
        return true;
    }

    async validate(
        token: string,
        accessBy: ClientType,
        roles: string[],
    ): Promise<any> {
        const dataToValidate: ValidateToken = {
            token: token,
            roles: roles,
            clientType: accessBy,
        };
        console.log('Auth--Guard--validate--dataToValidate', dataToValidate);
        return await this.authprovider.validate(dataToValidate);
    }

    async getUserByKeycloakId(id: string) {
        const payload: GrpcGetUserPayload = {
            id: id,
        };
        console.log('Auth--Guard--getUserByKeycloakId--payload', payload);
        return await this.userprovider.getUserByKeycloakId(payload);
    }
}
