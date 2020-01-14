import {browser} from 'protractor';
import {PageObject} from '../../../../tests/utilities/page-object';


export class AccessPageObject extends PageObject {
    route = 'access';
    locator = {
        page: 'app-access',
        register: '#registration-form',
        registerEmail: '#registration-email',
        registerPassword: '#registration-password',
        registerSubmit: '#registration-submit'
    };

    registrate() {
        console.log('TODO');
    }

    login() {
        console.log('TODO');
    }
}
