import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const detailsContainerStyles = {
	display: "flex",
	alignItems: "center",
	m: "1rem",
	width: "10rem",
};

const titleStyles = {
	fontWeight: "bold",
	textTransform: "capitalize",
	whiteSpace: "nowrap",
};

const logoContainerStyles = { mr: "1rem" };

const AdvertPositionDetails = ({ title, details, Icon, color = "#e41f26" }) => {
	return (
		<Box sx={detailsContainerStyles}>
			<Box sx={logoContainerStyles}>
				<Icon sx={{ color }} />
			</Box>
			<Box>
				<Typography variant="body1" sx={titleStyles}>
					{title || ""}
				</Typography>
				<Typography variant="body2">{details || ""}</Typography>
			</Box>
		</Box>
	);
};

export default AdvertPositionDetails;
