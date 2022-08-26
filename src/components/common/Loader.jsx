import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = ({ size, color }) => {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexGrow: 1,
				mt: "2rem",
			}}
		>
			<CircularProgress sx={{ color: color || "primary.main" }} size={size} />
		</Box>
	);
};

export default Loader;
