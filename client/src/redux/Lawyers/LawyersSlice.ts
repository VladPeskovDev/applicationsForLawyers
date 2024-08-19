import { createSlice } from '@reduxjs/toolkit';
import type { LawyerType } from '../../types/LawyerTypes';
import { createLawyerThunk, deleteLawyerThunk, editLawyerThunk, getLawyersThunk } from './LawyerAsyncActions';

type InitialStateType = {
  data: LawyerType[];
};

const initialState: InitialStateType = {
  data: [],
};

const LawyersSlice = createSlice({
  name: 'lawyers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLawyersThunk.fulfilled, (state, { payload }) => {
      state.data = payload;
    });

    builder.addCase(createLawyerThunk.fulfilled, (state, { payload }) => {
      state.data.push(payload);
    });

    builder.addCase(deleteLawyerThunk.fulfilled, (state, { payload }) => {
      state.data = state.data.filter((el) => el.id !== payload);
    });
    builder.addCase(editLawyerThunk.fulfilled, (state, { payload }) => {
      state.data = state.data.map((el) => {
        if (el.id === payload.id) {
          return payload;
        }
        return el;
      });
    });
  },
});

export default LawyersSlice;
