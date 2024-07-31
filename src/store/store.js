import { configureStore } from '@reduxjs/toolkit';
import studiosSlice from './studiosSlice';
import dancersSlice from './dancersSlice';
import dancesSlice from './dancesSlice';
import couplesSlice from './couplesSlice';
import locationSlice from './locationSlice';
import userSlice from './userSlice';
import heatsSlice from './heatsSlice';

export default configureStore({
  reducer: {
    studios: studiosSlice,
    dancers: dancersSlice,
    couples: couplesSlice,
    location: locationSlice,
    dances: dancesSlice,
    user: userSlice,
    heats: heatsSlice,
    // schedule: scheduleSlice,
  },
});
