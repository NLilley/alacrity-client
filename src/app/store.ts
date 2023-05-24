import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { alacrityApi } from './api/api';
import dashboardReducer from './slices/dashboardSlice';
import loginReducer from './slices/loginSlice';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    login: loginReducer,

    [alacrityApi.reducerPath]: alacrityApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(alacrityApi.middleware)
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
