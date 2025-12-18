import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaginatorState {
  currentPage: number;
  totalPages: number;
}

const initialState: PaginatorState = {
  currentPage: 1,
  totalPages: 0,
};

const paginatorSlice = createSlice({
  name: "paginator",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
  },
});

export const { setCurrentPage, setTotalPages } = paginatorSlice.actions;
export default paginatorSlice.reducer;
