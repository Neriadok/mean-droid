import {sha256} from 'js-sha256';
import {environment} from '../../src/environments/environment';
import {internet} from 'faker';
import * as fetch from 'node-fetch';


export async function getRegistratedUserData() {
    const user = getFakeUserData();
    const response = await fetch('http://localhost/api/user', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 'Content-Type': 'application/json' },
    });
    const backendUser = await response.json();

    return {...user, ...backendUser};
}

export function getFakeUserData() {
    return {
        email: internet.email(),
        password: encrypt(internet.password())
    };
}

export function encrypt(input) {
    return sha256.hmac(environment.secret, input).toLowerCase();
}
