import {assertGeneration} from "../generators.utils";

describe('pipe', () => {
    it('works', async () => {
        await assertGeneration('pipe', {name: 'name'}, [
            '/src/app/pipes/name/name.pipe.spec.ts',
            '/src/app/pipes/name/name.pipe.module.ts',
            '/src/app/pipes/name/name.pipe.ts'
        ]);
    });
});
