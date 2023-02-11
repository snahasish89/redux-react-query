import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productSlice from '../cart/slice/product.slice';
import counterReducer from '../features/counter/counterSlice';
import  gallerySlice  from '../slice/gallery.slice';
import  userTodoSlice  from '../slice/userTodo';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    userTodo: userTodoSlice,
    getPhotos: gallerySlice,
    products: productSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
