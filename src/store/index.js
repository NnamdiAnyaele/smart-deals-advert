import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
	reducer: {
		auth: authSlice,
	},
});
