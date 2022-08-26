import { ToastContainer } from "react-toastify";
import { QueryClientProvider, QueryClient } from "react-query";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import { store } from "./store/index";
import customTheme from "./config/themeConfig";
import BaseRoute from "./Pages/routes/BaseRoutes";
import { loginSuccess } from "./slices/authSlice";
import auth from "./utils/helpers/auth";
import { USERKEY } from "./utils/constants";
import "react-toastify/dist/ReactToastify.css";

if (auth.authenticate()) {
	const user = localStorage.getItem(USERKEY);
	const parsedUser = JSON.parse(user);
	store.dispatch(
		loginSuccess({
			...parsedUser,
		})
	);
}

function App() {
	const queryClient = new QueryClient();

	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider theme={customTheme}>
					<CssBaseline />
					<ToastContainer />
					<BaseRoute />
				</ThemeProvider>
			</QueryClientProvider>
		</Provider>
	);
}

export default App;
