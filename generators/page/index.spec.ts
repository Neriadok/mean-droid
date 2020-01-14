import {assertGeneration} from "../generators.utils";

describe('page', () => {
    it('works', async () => {
        await assertGeneration('page', {name: 'name'}, [
            '/src/app/pages/name/name.page.html',
            '/src/app/pages/name/name.page.module.ts',
            '/src/app/pages/name/name.page.object.ts',
            '/src/app/pages/name/name.page.scss',
            '/src/app/pages/name/name.page.ts'
        ]);
    });
});
