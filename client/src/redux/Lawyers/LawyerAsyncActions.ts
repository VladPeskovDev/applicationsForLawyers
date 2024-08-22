import { createAsyncThunk } from "@reduxjs/toolkit";
import LawyerService from "../../services/LawyerService";
// eslint-disable-next-line import/no-duplicates
import type { EditLawyerType, LawyerDataType, LawyerType} from "../../types/LawyerTypes";
// eslint-disable-next-line import/no-duplicates
import { type ApiResponce } from "../../types/LawyerTypes";


// eslint-disable-next-line import/prefer-default-export
export const getLawyersThunk = createAsyncThunk<ApiResponce>(
    "lawyers/getAll",
    async () => {
        const data = await LawyerService.getLawyers();
        return data;
    });

export const createLawyerThunk = createAsyncThunk<LawyerType, LawyerDataType>('lawyers/create',
    async (data) => {
    const lawyer = await LawyerService.addLawyer(data);
    return lawyer;
    });
    
export const deleteLawyerThunk = createAsyncThunk<LawyerType['id'], LawyerType['id']>('lawyers/delete',
    async (id) => {
        await LawyerService.deleteLawyer(id);
        return id;
});



export const editLawyerThunk = createAsyncThunk<LawyerType, EditLawyerType>(
    'tasks/edit',
    async ({ id, data }) => {
      const lawyer = await LawyerService.editLawyer(id, data);
      return lawyer;
    }
);  