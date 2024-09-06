import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from '../features/categoriesSlice';
import carpetsReducer from '../features/carpetsSlice';
import cartSlice from '../features/cartSlice';
// Импортируйте другие редьюсеры по необходимости

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    carpets: carpetsReducer,
    cart: cartSlice,
    
    // Добавьте другие редьюсеры здесь
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
