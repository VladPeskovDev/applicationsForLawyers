import type { AxiosInstance} from "axios";
import apiInstance from "./apiInstance";
import { CaseSchema, CasesSchema } from "../utils/validatorsCases";
import type { ApiResponce, CaseType, CaseDataType } from "../types/CasesTypes";


class CaseService {
    constructor( private readonly api: AxiosInstance) {}

    async getCases(): Promise<ApiResponce> {
        const {data} = await this.api.get<ApiResponce>('/cases');
        return CasesSchema.parse(data);
    }

    async addCase(obj: CaseDataType): Promise<CaseType> {
        const {data} = await this.api.post<CaseType>('/cases', obj);
        return CaseSchema.parse(data);
    }

    async deleteCase(id: number): Promise<ApiResponce> {
        return this.api.delete(`/cases/${id}`);
}

    async editCases(id: number, obj: CaseDataType): Promise<CaseType> {
        const { data } = await this.api.patch<CaseType>(`/cases/${id}`, obj);
    return CaseSchema.parse(data);
  }
}

export default new CaseService(apiInstance);