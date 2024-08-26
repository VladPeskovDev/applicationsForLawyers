import type { z } from 'zod';
import type { CaseSchema } from '../utils/validatorsCases';

export type CaseType = z.infer<typeof CaseSchema>;

export type CaseDataType = Omit<CaseType, 'id'>;

export type ApiResponce = CaseType[];

export type EditCaseType = {
    id: number;
    data: CaseDataType;
}
