import {browser} from 'protractor';
import {PageObject} from '../../../../tests/utilities/page-object';


export class HomePageObject extends PageObject {
    route = 'home';
    locator = {
        page: 'app-home'
    };
}
