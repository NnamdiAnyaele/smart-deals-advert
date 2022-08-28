import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";

const OffersFooter = ({ styles }) => {
	const { isAuthenticated } = useSelector((state) => state.auth);
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
			<Grid item xs={12} sx={styles} component={Link} to="/sdc-partners">
				SDC Partners
			</Grid>
			<Grid
				item
				xs={12}
				sx={styles}
				component={Link}
				to={isAuthenticated ? "/customer/dashboard" : "/login"}
			>
				Advertise
			</Grid>
		</Grid>
	);
};

export default OffersFooter;
