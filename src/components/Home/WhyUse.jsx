import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const flexContainerStyles = {
	display: "flex",
	alignItems: "center",
};

const imageContainerStyles = {
	height: "4rem",
	width: "4rem",
	mr: "1rem",
	mb: {
		xs: "1rem",
		md: 0,
	},
};

const titleStyles = {
	fontWeight: "bold",
	textTransform: "capitalize",
};

const WhyUse = ({ logo }) => {
	return (
		<Box sx={flexContainerStyles}>
			<Box sx={imageContainerStyles}>
				<img src={logo} alt="" height="auto" width="100%" />
			</Box>
			<Box>
				<Typography variant="body1" sx={titleStyles}>
					Lorem Ipsum
				</Typography>
				<Typography variant="body2">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. In semper
					magna sapien
				</Typography>
			</Box>
		</Box>
	);
};

export default WhyUse;
