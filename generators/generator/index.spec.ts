import {assertGeneration} from "../generators.utils";

describe('generator', () => {
  it('works', async () => {
    await assertGeneration('generator', {name: 'name'}, [
      '/generators/name/index.ts',
      '/generators/name/index.spec.ts'
    ]);
  });
});
