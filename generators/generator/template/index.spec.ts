import {assertGeneration} from "../generators.utils";

describe('<%= dasherize(name) %>', () => {
    it('works', async () => {
        await assertGeneration('<%= dasherize(name) %>', {name: 'name'}, [
            // GENERATED FILES
        ]);
    });
});
