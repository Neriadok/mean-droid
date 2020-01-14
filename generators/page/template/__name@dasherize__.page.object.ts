import {PageObject} from "../../../../tests/utilities/page-object";


export class <%= classify(name) %>PageObject extends PageObject{
    route = '<%= dasherize(name) %>';
    locator = {
        page: 'app-<%= dasherize(name) %>'
    };
}
