import { z } from 'zod';

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
  email: z.string().email('Invalid email'),
  name: z.string().min(1, 'Name is required'),
});
export type SignUpSchemaType = z.infer<typeof schema>;
export default schema;
