import { ClientType, UserRole } from 'src/interfaces/enums';

export interface ValidateToken {
    token: string;
    roles: string[];
    clientType: ClientType;
}
