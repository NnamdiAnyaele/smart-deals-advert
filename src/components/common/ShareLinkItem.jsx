import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const sharelinkItemStyles = {
	display: "flex",
	mb: "0.7rem",
	alignItems: "center",
	cursor: "pointer",
	p: "0.3rem",
	"&:hover": {
		backgroundColor: "#f5f5f5",
	},
};

const iconStyles = { marginRight: "1rem" };

const ShareLinkItem = ({ Icon, iconColor, text, onClick }) => {
	return (
		<Box sx={sharelinkItemStyles} onClick={onClick}>
			<Icon size={30} style={{ ...iconStyles, ...iconColor }} />
			<Typography variant="body1">{text}</Typography>
		</Box>
	);
};

export default ShareLinkItem;
