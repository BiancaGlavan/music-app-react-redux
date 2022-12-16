import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { deezerApi } from './features/apiDeezerSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import playerSlice from './features/playerSlice';
import authSlice from './features/authSlice';
import backendApi from './features/apiSlice';

const persistConfig = {
    key: 'root',
    version: 1,
    storage: storage
};

const persistedAuth = persistReducer(persistConfig, authSlice);




export const store = configureStore({
    reducer: {
        [deezerApi.reducerPath]: deezerApi.reducer,
        player: playerSlice,
        auth: persistedAuth,
        [backendApi.reducerPath]: backendApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
      }).concat(deezerApi.middleware).concat(backendApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
