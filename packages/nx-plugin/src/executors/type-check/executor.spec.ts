import { TypeCheckExecutorSchema } from './schema';
import executor from './executor';

const options: TypeCheckExecutorSchema = {};

describe('TypeCheck Executor', () => {
  it('can run', async () => {
    const output = await executor(options);
    expect(output.success).toBe(true);
  });
});
