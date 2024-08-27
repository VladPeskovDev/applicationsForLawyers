import { z } from 'zod';

export const CaseSchema = z.object({
  id: z.number().optional(), 
  title: z.string(),
  description: z.string(),
  photo1: z.string(), 
  photo2: z.string(),
  photo3: z.string(),
  photo4: z.string(),
  photo5: z.string(),
  userID: z.number().nullable().optional(), // Связанный пользователь может быть отсутствующим
  
});

export const CasesSchema = z.array(CaseSchema);
