import { configureStore } from '@reduxjs/toolkit';
import studiosSlice from './studiosSlice';
import dancersSlice from './dancersSlice';
import dancesSlice from './dancesSlice';
import couplesSlice from './couplesSlice';
import userSlice from './userSlice';
import heatsSlice from './heatsSlice';

export default configureStore({
  reducer: {
    studios: studiosSlice,
    dancers: dancersSlice,
    couples: couplesSlice,
    dances: dancesSlice,
    user: userSlice,
    heats: heatsSlice,
  },
});
