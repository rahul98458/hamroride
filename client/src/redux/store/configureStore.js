import { configureStore, Tuple, combineReducers } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import userSlice from '../reducerSlices/userSlice';
 import searchResultSlice from '../reducerSlices/searchResultSlice';
import publishResultSlice from '../reducerSlices/publishResultSlice';
const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['publishResultSlice']
  }
  const rootReducer = combineReducers({ 
    user: userSlice,
    searchResult:searchResultSlice,
    publishResult:publishResultSlice,

  })
  const persistedReducer = persistReducer(persistConfig, rootReducer)  
export const store = configureStore({
    reducer: persistedReducer,
  middleware: () => new Tuple( logger),
})
export const persistor = persistStore(store)