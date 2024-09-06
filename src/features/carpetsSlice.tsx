import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Carpet {
  _id: string;
  name: string;
  image: string[];
  description: string;
  price: number;
  categoryId: {
    _id: string;
    name: string;
  };
}

interface CarpetsState {
  carpets: Carpet[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CarpetsState = {
  carpets: [],
  status: 'idle',
  error: null,
};

export const fetchCarpets = createAsyncThunk('carpets/fetchCarpets', async () => {
  const response = await fetch('http://localhost:3000/carpet');
  if (!response.ok) {
    throw new Error('Failed to fetch carpets');
  }
  const data = await response.json();
  return data;
});

const carpetsSlice = createSlice({
  name: 'carpets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarpets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCarpets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.carpets = action.payload;
      })
      .addCase(fetchCarpets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default carpetsSlice.reducer;

