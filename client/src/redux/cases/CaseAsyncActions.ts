import { createAsyncThunk } from "@reduxjs/toolkit";
import CaseService from "../../services/CaseService";
// eslint-disable-next-line import/no-duplicates
import type { EditCaseType, CaseDataType, CaseType} from "../../types/CasesTypes";
// eslint-disable-next-line import/no-duplicates
import { type ApiResponce } from "../../types/CasesTypes";


// eslint-disable-next-line import/prefer-default-export
export const getCasesThunk = createAsyncThunk<ApiResponce>(
    "cases/getAll",
    async () => {
        const data = await CaseService.getCases();
        return data;
    });

export const createCaseThunk = createAsyncThunk<CaseType, CaseDataType>('cases/create',
    async (data) => {
    const cases = await CaseService.addCase(data);
    return cases;
    });
    
export const deleteCaseThunk = createAsyncThunk<CaseType['id'], CaseType['id']>('cases/delete',
    async (id) => {
        await CaseService.deleteCase(id);
        return id;
});



export const editCaseThunk = createAsyncThunk<CaseType, EditCaseType>(
    'cases/edit',
    async ({ id, data }) => {
      const cases = await CaseService.editCase(id, data);
      return cases;
    }
);  