import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const FormFooter = () => {
	return (
		<Box
			sx={{
				borderTop: "1px solid #E6E6E6",
				borderBottom: "1px solid #E6E6E6",
				display: "flex",
				justifyContent: "center",
				p: "1rem",
				alignItems: "center",
				width: "100%",
				backgroundColor: "#fff",
				position: "sticky",
				top: "100vh",
			}}
		>
			<Typography component="div" variant="body1">
				&copy; 2022 Smartdeals
			</Typography>
			<Typography
				component={Link}
				to="/terms-and-conditions"
				variant="body1"
				sx={{
					textDecoration: "none",
					color: "#000",
					textTransform: "none",
					m: { md: "0 2rem", xs: "0 1rem" },
				}}
			>
				Terms and condition
			</Typography>
			<Typography
				component={Link}
				to="/privacy-policy"
				variant="body1"
				sx={{
					textDecoration: "none",
					color: "#000",
					textTransform: "none",
				}}
			>
				Privacy Policy
			</Typography>
		</Box>
	);
};

export default FormFooter;
