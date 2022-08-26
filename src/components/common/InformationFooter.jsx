import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";

const InformationFooter = ({ styles }) => {
	return (
		<Grid
			container
			sx={{
				mb: {
					xs: "1rem",
				},
			}}
		>
			<Grid
				item
				xs={12}
				sx={{
					paddingBottom: "0.5rem",
					mr: "1rem",
				}}
			>
				<Grid
					sx={{
						fontWeight: "600",
						fontSize: "0.875rem",
						textTransform: "uppercase",
					}}
					item
				>
					information
				</Grid>
			</Grid>
			<Grid item xs={12} sx={styles} component={Link} to="/contact">
				Contact
			</Grid>
			<Grid item xs={12} sx={styles} component={Link} to="/signup">
				Sign up
			</Grid>
			<Grid item xs={12} sx={styles} component={Link} to="/how-it-works">
				How it works
			</Grid>
			<Grid
				item
				xs={12}
				sx={styles}
				component={Link}
				to="/terms-and-conditions"
			>
				Terms and conditions
			</Grid>
			<Grid item xs={12} sx={styles} component={Link} to="/privacy-policy">
				Privacy Policy
			</Grid>
		</Grid>
	);
};

export default InformationFooter;
