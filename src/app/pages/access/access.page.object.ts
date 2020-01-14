import {browser} from 'protractor';
import {PageObject} from '../../../../tests/utilities/page-object';
import {internet} from 'faker'
import {getElement, waitForElement} from "../../../../tests/utilities/element-treatment";


export class AccessPageObject extends PageObject {
    route = 'access';
    locator = {
        page: 'app-access',
        registerEmail: '#register-email',
        registerPassword: '#register-password',
        registerSubmit: '#register-submit',
        loginEmail: '#login-email',
        loginPassword: '#login-password',
        loginSubmit: '#login-submit'
    };

    async registrate() {
        const email = await waitForElement(this.locator.registerEmail);
        await email.sendKeys(internet.email());
        const password = await waitForElement(this.locator.registerPassword);
        await password.sendKeys(123456);
        const submit = await waitForElement((this.locator.registerSubmit));
        await submit.click();
    }

    async login() {
        const email = await waitForElement(this.locator.loginEmail);
        await email.sendKeys(internet.email());
        const password = await waitForElement(this.locator.loginPassword);
        await password.sendKeys(123456);
        const submit = await waitForElement((this.locator.loginSubmit));
        await submit.click();
    }
}
