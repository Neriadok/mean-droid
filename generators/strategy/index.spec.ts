import {assertGeneration} from "../generators.utils";

describe('strategy', () => {
    it('works', async () => {
        await assertGeneration('strategy', {name: 'name'}, [
            '/server/auth/strategies/name.ts'
        ]);
    });
});
