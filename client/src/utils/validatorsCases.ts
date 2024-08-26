import { z } from 'zod';

export const CaseSchema = z.object({
  id: z.number().optional(), 
  title: z.string(),
  description: z.string(),
  photo1: z.string().optional(), 
  photo2: z.string().optional(),
  photo3: z.string().optional(),
  photo4: z.string().optional(),
  photo5: z.string().optional(),
  userID: z.number().nullable().optional(), // Связанный пользователь может быть отсутствующим
  
});

export const CasesSchema = z.array(CaseSchema);
