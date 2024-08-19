import type { z } from 'zod';
import type { LawyerSchema } from '../utils/validators';


export type LawyerType = z.infer<typeof LawyerSchema>;

export type LawyerDataType = Omit<LawyerType, 'id'>;

export type ApiResponce = LawyerType[];

export type EditLawyerType = {
    id: number;
    data: LawyerDataType;
};