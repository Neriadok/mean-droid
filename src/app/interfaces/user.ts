import {perms} from '../../configuration';

export interface User {
    email: string;
    perms: perms;
    token?: string;
}
