import { combineSlices } from '@reduxjs/toolkit';
import { ingredientsSlice } from '../slices/ingredientsSlice';
import { constructorSlice } from '../slices/constructorSlice';
import { userSlice } from '../slices/userSlice';
import { ordersSlice } from '../slices/ordersSlice';
import { feedSlice } from '../slices/feedSlice';

const rootReducer = combineSlices(
  ingredientsSlice,
  constructorSlice,
  userSlice,
  ordersSlice,
  feedSlice
);

export default rootReducer;
