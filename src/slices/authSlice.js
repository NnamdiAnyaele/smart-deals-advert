/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../api/httpService";
import { isEmpty } from "../utils/helpers/functions";
import { ROLES, TOKENKEY, USERKEY } from "../utils/constants";

export const login = createAsyncThunk(
	"auth/login",
	// eslint-disable-next-line consistent-return
	async (payload, { rejectWithValue }) => {
		try {
			const response = await axios.post("/api/login", payload);
			console.log({ dat: response.data });
			localStorage.setItem(TOKENKEY, response.data.data.accessToken);
			localStorage.setItem(USERKEY, JSON.stringify(response.data.data));
			return response.data;
		} catch (error) {
			if (error.response) {
				return rejectWithValue(error.response.data.message);
			}
			if (error.request) {
				return rejectWithValue("Network Error");
			}
			if (error.message) {
				return rejectWithValue(error.message);
			}
		}
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState: {
		isAuthenticated: false,
		isProcessing: false,
		isLoggingOut: false,
		user: {},
		role: ROLES.CUSTOMER,
		region: {
			name: "Nigeria",
			region: "NG",
			region_logo: "https://doc.smartdeals.com.ng/files/region/NG/region.jpg",
			iso_name: "NGA",
			list: 1,
		},
		message: "",
		error: "",
		bizFrom: "SMARTDEALS",
	},
	reducers: {
		logout(state, action) {
			state.isProcessing = false;
			state.isLoggingOut = false;
			state.isAuthenticated = false;
			state.user = {};
			localStorage.clear();
			window.location = "/login";
		},
		loginSuccess(state, action) {
			state.isProcessing = false;
			state.isAuthenticated = !isEmpty(action.payload);
			state.user = action.payload;
			state.message = "";
			state.error = "";
			state.message = action.payload.message;
			state.region.region = action.payload.region || "NG";
			state.region.region_logo =
				action.payload.region_logo ||
				"https://doc.smartdeals.com.ng/files/region/NG/region.jpg";
			state.role = action.payload.role;
		},
		setRegion(state, action) {
			state.region.name = action.payload.name;
			state.region.region = action.payload.short_name;
			state.region.region_logo = action.payload.logo;
			state.region.iso_name = action.payload.iso_name;
			state.region.list = action.payload.list;
		},
		setBizfrom(state, action) {
			state.bizFrom = action.payload;
		},
		setRole(state, action) {
			state.role = action.payload;
		},
	},
	extraReducers: {
		[login.pending]: (state, action) => {
			state.isProcessing = true;
			state.error = null;
		},
		[login.fulfilled]: (state, action) => {
			state.isProcessing = false;
			state.isAuthenticated = !isEmpty(action.payload.data);
			state.error = null;
			state.user = action.payload.data;
			state.message = action.payload.message;
			state.region.region = action.payload.data.region;
			state.region.region_logo = action.payload.data.region_logo;
		},
		[login.rejected]: (state, action) => {
			state.isProcessing = false;
			state.error = action.payload;
		},
	},
});

export const { logout, loginSuccess, setRegion, setBizfrom, setRole } =
	authSlice.actions;

export default authSlice.reducer;
