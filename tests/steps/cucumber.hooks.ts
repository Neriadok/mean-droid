import {BeforeAll, After, setDefaultTimeout} from 'cucumber';
import {browser} from 'protractor';
import {accessMainPage} from './page.steps';

export {previousHook};

async function previousHook() {
    setDefaultTimeout(60000);
    await accessMainPage();
    await browser.waitForAngularEnabled();
}

async function cleanStorage() {
    await browser.executeScript('window.localStorage.clear();');
    await browser.executeScript('window.sessionStorage.clear();');
    await browser.driver.manage().deleteAllCookies();
}

BeforeAll(previousHook);

After(cleanStorage);
