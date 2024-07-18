import { configureStore } from '@reduxjs/toolkit';
import studiosSlice from './studiosSlice';
import dancersSlice from './dancersSlice';
import dancesSlice from './dancesSlice';
import couplesSlice from './couplesSlice';
import locationSlice from './locationSlice';

export default configureStore({
  reducer: {
    studios: studiosSlice,
    dancers: dancersSlice,
    couples: couplesSlice,
    location: locationSlice,
    dances: dancesSlice,
  },
});
