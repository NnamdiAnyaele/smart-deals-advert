import Box from "@mui/material/Box";

const SocialsLogo = ({ logo }) => {
	return (
		<Box sx={{ height: "2rem", width: "2rem", mr: "1rem" }}>
			<img src={logo} alt="" height="auto" width="100%" />
		</Box>
	);
};

export default SocialsLogo;
