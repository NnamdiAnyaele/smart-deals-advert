import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const customTheme = createTheme({
	palette: {
		type: "light",
		primary: {
			main: "#e41f26",
			dark: "#a31419",
			light: "#e94d52",
		},
		secondary: {
			light: "#eb934d",
			main: "#e6771f",
			dark: "#a65413",
		},
		error: {
			main: red[800],
		},
	},
	status: {
		danger: red[500],
	},
	typography: {
		fontFamily: "Montserrat, sans-serif, 'Digital-7 Mono'",
	},
});

export default customTheme;
