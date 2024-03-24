"use client"

import userReducer from './userReducer'
import { persistStore, persistReducer } from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './searchReducer';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage: storage
}

const persistedReducerU = persistReducer(persistConfig, userReducer)
const persistedReducerS = persistReducer(persistConfig, searchReducer)

export const store = configureStore({reducer: { user: persistedReducerU, search: persistedReducerS}})
export const persistor = persistStore(store)