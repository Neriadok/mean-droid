import { defineStep } from 'cucumber';
import {AccessPageObject} from '../../src/app/pages/access/access.page.object';


defineStep(/^user get registrated$/, registrate);
defineStep(/^user get logged$/, login);

export async function registrate() {
    const accessPageObject = new AccessPageObject();
    accessPageObject.registrate();
}

export async function login() {
    const accessPageObject = new AccessPageObject();
    accessPageObject.login();
}
