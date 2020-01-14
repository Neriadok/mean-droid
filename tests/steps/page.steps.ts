import { defineStep } from 'cucumber';
import { browser } from 'protractor';
import {accessPage, isVisible} from '../utilities/page-treatment';


defineStep(/^access to main page$/, accessMainPage);
defineStep(/^access to app "([^"]*)" page$/, accessPage);
defineStep(/^app "([^"]*)" page is visible$/, isVisible);

export async function accessMainPage() {
    await browser.get('/');
}
