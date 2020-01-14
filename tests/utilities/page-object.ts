import {browser} from 'protractor';
import {waitForElementDisplayed} from './element-treatment';

export abstract class PageObject {
    abstract route: string;
    abstract locator: {
        page: string;
        [locatorName: string]: string;
    };

    async isVisible() {
        await waitForElementDisplayed(this.locator.page);
    }

    async navigate() {
        await browser.get('/#/' + this.route);
    }
}
