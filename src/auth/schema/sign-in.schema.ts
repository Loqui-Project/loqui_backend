import { z } from 'zod';

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export type SignInSchemaType = z.infer<typeof schema>;
export default schema;
