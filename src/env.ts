import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().optional().default(3000),
  ACCESS_TOKEN_SECRET: z.string().min(0, 'Access Token Secret is required'),
  REFRESH_TOKEN_SECRET: z.string().min(0, 'Refresh Token Secret is required'),
});
export type Env = z.infer<typeof envSchema>;
