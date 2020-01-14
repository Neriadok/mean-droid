import {assertGeneration} from "../generators.utils";

describe('guard', () => {
    it('works', async () => {
        await assertGeneration('guard', {name: 'name'}, [
            '/src/app/guards/name/name.guard.spec.ts',
            '/src/app/guards/name/name.guard.ts'
        ]);
    });
});
