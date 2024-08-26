import { createSlice } from '@reduxjs/toolkit';
import type { CaseType } from '../../types/CasesTypes';
import { createCaseThunk, deleteCaseThunk, editCaseThunk, getCasesThunk } from './CaseAsyncActions';

type InitialStateType = {
  data: CaseType[];
};

const initialState: InitialStateType = {
  data: [],
};

const CasesSlice = createSlice({
  name: 'cases',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCasesThunk.fulfilled, (state, { payload }) => {
      state.data = payload;
    });

    builder.addCase(createCaseThunk.fulfilled, (state, { payload }) => {
      state.data.push(payload);
    });

    builder.addCase(deleteCaseThunk.fulfilled, (state, { payload }) => {
      state.data = state.data.filter((el) => el.id !== payload);
    });
    builder.addCase(editCaseThunk.fulfilled, (state, { payload }) => {
      state.data = state.data.map((el) => {
        if (el.id === payload.id) {
          return payload;
        }
        return el;
      });
    });
  },
});

export default CasesSlice;
