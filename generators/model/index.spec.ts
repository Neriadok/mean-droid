import {assertGeneration} from "../generators.utils";

describe('model', () => {
    it('works', async () => {
        await assertGeneration('model', {name: 'name'}, [
            '/server/database/models/name.ts'
        ]);
    });
});
