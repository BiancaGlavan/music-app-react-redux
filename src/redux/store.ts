import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { deezerApi } from './features/apiDeezerSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'root',
    version: 1,
    storage: storage
};



export const store = configureStore({
    reducer: {
        [deezerApi.reducerPath]: deezerApi.reducer,
        
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
      }).concat(deezerApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
