import { z } from 'zod';

export const CaseSchema = z.object({
  id: z.number(), 
  title: z.string(),
  description: z.string(),
  photo1: z.string().nullable().optional(),
  photo2: z.string().nullable().optional(),
  photo3: z.string().nullable().optional(),
  photo4: z.string().nullable().optional(),
  photo5: z.string().nullable().optional(),
  userID: z.number().nullable().optional(), 
});

export const CasesSchema = z.array(CaseSchema);
