import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface CartItem {
  _id: string;
  carpetId: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CartState = {
  items: [],
  status: 'idle',
  error: null,
};

// Fetch cart
export const fetchCart = createAsyncThunk<CartItem[], void, { rejectValue: string }>(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3000/cart');
      if (!response.ok) throw new Error('Failed to fetch cart');
      const data: CartItem[] = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Add to cart
export const addToCart = createAsyncThunk<CartItem, { carpetId: string; quantity: number }, { rejectValue: string }>(
  'cart/addToCart',
  async ({ carpetId, quantity }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3000/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ carpetId, quantity }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error('Failed to add to cart: ' + errorText);
      }
      const data: CartItem = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Remove from cart
interface RemoveFromCartPayload {
  carpetId: string;
  cartId: string;
}

interface RemoveFromCartResponse {
  success: boolean;
  message: string;
  updatedCart: CartItem[];
}

export const removeFromCart = createAsyncThunk<RemoveFromCartResponse, RemoveFromCartPayload, { rejectValue: string }>(
  'cart/removeFromCart',
  async ({ carpetId, cartId }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3000/cart/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ carpetId, cartId }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error('Failed to remove from cart: ' + errorText);
      }

      const data: RemoveFromCartResponse = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Failed to fetch cart';
      })
      .addCase(addToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCart.fulfilled, (state, action: PayloadAction<CartItem>) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Failed to add to cart';
      })
      .addCase(removeFromCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeFromCart.fulfilled, (state, action: PayloadAction<RemoveFromCartResponse>) => {
        state.status = 'succeeded';
        state.items = action.payload.updatedCart;
      })
      .addCase(removeFromCart.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Failed to remove from cart';
      });
  },
});

// Selectors
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartStatus = (state: RootState) => state.cart.status;
export const selectCartError = (state: RootState) => state.cart.error;
export const selectCartTotalQuantity = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export default cartSlice.reducer;
