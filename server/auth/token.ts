import * as moment from 'moment';
import * as expressJwt from 'express-jwt';
import * as bcryptjs from 'bcryptjs';
import {sign} from 'jsonwebtoken';
import {session} from '../../src/configuration';

export const authenticateToken = expressJwt({secret: session.secret, getToken});

export function generateToken({email}) {
    const iat = moment().unix();
    const timestamp = moment();
    return sign({email, iat, timestamp}, session.secret, {expiresIn: session.expiresIn})
}

export function getToken (req){
    return req.headers.auth
}

export function generateHash(password) {
    return password ? bcryptjs.hashSync(password, bcryptjs.genSaltSync(8), null) : null;
}
