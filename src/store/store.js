import { configureStore } from '@reduxjs/toolkit';
import studiosSlice from './studiosSlice';
import dancersSlice from './dancersSlice';
import dancesSlice from './dancesSlice';
import entriesSlice from './entriesSlice';
import userSlice from './userSlice';
import heatsSlice from './heatsSlice';
import schedulesSlice from './schedulesSlice';
export default configureStore({
  reducer: {
    studios: studiosSlice,
    dancers: dancersSlice,
    entries: entriesSlice,
    dances: dancesSlice,
    user: userSlice,
    heats: heatsSlice,
    schedules: schedulesSlice,
  },
});
