import {assertGeneration} from "../generators.utils";

describe('component', () => {
    it('works', async () => {
        await assertGeneration('component', {name: 'name'}, [
            '/src/app/components/name/name.component.html',
            '/src/app/components/name/name.component.scss',
            '/src/app/components/name/name.component.ts'
        ]);
    });
});
