import {assertGeneration} from "../generators.utils";

describe('service', () => {
    it('works', async () => {
        await assertGeneration('service', {name: 'name'}, [
            '/src/app/services/name/name.service.spec.ts',
            '/src/app/services/name/name.service.ts'
        ]);
    });
});
