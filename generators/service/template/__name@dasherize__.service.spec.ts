import {<%= classify(name) %>Service} from "./<%= dasherize(name) %>.service";

describe('<%= classify(name) %>Service', () => {
    const service = new <%= classify(name) %>Service();
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
