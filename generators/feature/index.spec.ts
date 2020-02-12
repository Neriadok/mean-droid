import {assertGeneration} from "../generators.utils";

describe('feature', () => {
    it('works', async () => {
        await assertGeneration('feature', {name: 'name'}, [
            '/tests/features/name.feature',
            '/tests/steps/name.steps.ts',
        ]);
    });
});
