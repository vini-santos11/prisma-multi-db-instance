import { z } from "zod";
import 'dotenv/config';

const envSchema = z.object({
    DATABASE_URL: z.string().default(""),
});

const _env = envSchema.safeParse(process.env);

if(_env.success === false){
    console.error('Invalid environment variables', _env.error.format());
    throw new Error('Invalid environment variables');
}

export const env = _env.data;