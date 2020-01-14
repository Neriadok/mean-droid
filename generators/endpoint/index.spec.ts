import {assertGeneration} from "../generators.utils";

describe('endpoint', () => {
    it('works', async () => {
        await assertGeneration('endpoint', {name: 'name'}, [
            '/server/endpoints/name/index.ts',
            '/server/endpoints/name/spec.ts'
        ]);
    });
});
