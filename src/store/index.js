import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { 
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER 
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import employeesSlice from '../features/employees/employeesSlice.js';

const rootPersistConfig = {
  key: 'root',
  storage
};

const employeesPersistConfig = {
  key: 'employees',
  storage
};

const rootReducer = combineReducers({
  employees: persistReducer(employeesPersistConfig, employeesSlice),
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),

}
);

export const persistor = persistStore(store);
