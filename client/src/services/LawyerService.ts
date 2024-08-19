import type { AxiosInstance} from "axios";
import apiInstance from "./apiInstance";
import { LawyerSchema, LawyersSchema } from "../utils/validators";
import type { ApiResponce, LawyerType, LawyerDataType } from "../types/LawyerTypes";


class LawyerService {
    constructor( private readonly api: AxiosInstance) {}

    async getLawyers(): Promise<ApiResponce> {
        const {data} = await this.api.get<ApiResponce>('/lawyer');
        return LawyersSchema.parse(data);
    }

    async addLawyer(obj: LawyerDataType): Promise<LawyerType> {
        const {data} = await this.api.post<LawyerType>('/api', obj);
        return LawyerSchema.parse(data);
    }

    async deleteLawyer(id: number): Promise<ApiResponce> {
        return this.api.delete(`/api/${id}`);
}

async editLawyer(id: number, obj: LawyerDataType): Promise<LawyerType> {
    const { data } = await this.api.patch<LawyerType>(`/api/${id}`, obj);
    return LawyerSchema.parse(data);
  }
}

export default new LawyerService(apiInstance);