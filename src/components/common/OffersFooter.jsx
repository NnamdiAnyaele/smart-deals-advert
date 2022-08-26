import { Link } from "react-router-dom";
import MuiLink from "@mui/material/Link";
import Grid from "@mui/material/Grid";

const OffersFooter = ({ styles }) => {
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
					our offers
				</Grid>
			</Grid>
			<Grid item xs={12} sx={styles} component={Link} to="/subscription">
				Subscription
			</Grid>
			<Grid item xs={12} sx={styles} component={Link} to="/sdc-partners">
				SDC Partners
			</Grid>
			<Grid
				item
				xs={12}
				sx={styles}
				component={MuiLink}
				href="https://advert.smartdeals.com.ng"
				target="_blank"
				rel="noopener noreferrer"
			>
				Advertise
			</Grid>
		</Grid>
	);
};

export default OffersFooter;
