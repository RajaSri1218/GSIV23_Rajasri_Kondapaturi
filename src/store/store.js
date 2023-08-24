// store.js
import { configureStore } from '@reduxjs/toolkit';
import reducerFunctions from './reducerFunctions';

const store = configureStore({
  reducer: {
    storeFunctions: reducerFunctions,
  },
});

export default store;
