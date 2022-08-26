import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";

const AboutFooter = ({ styles }) => {
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
					about
				</Grid>
			</Grid>
			<Grid item xs={12} sx={styles} component={Link} to="/your-account">
				Your Account
			</Grid>
			<Grid item xs={12} sx={styles} component={Link} to="/deals-won">
				Deals Won
			</Grid>
		</Grid>
	);
};

export default AboutFooter;
