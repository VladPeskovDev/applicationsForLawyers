import {  z } from 'zod';

export const LawyerSchema = z.object({
    id: z.number(),
    name: z.string(),
    userId: z.number().nullable().optional(), 
    education: z.string(),
    description: z.string(),
    photo: z.string(),
    phone: z.string(),
    telegram: z.string(),
  });

  export const LawyersSchema = z.array(LawyerSchema);
