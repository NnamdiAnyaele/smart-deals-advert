import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const SmallCards = ({ image }) => {
	return (
		<Box sx={{ display: "flex", padding: "0.5rem" }}>
			<Box sx={{ height: "3.75rem", width: "3.75rem", mr: "0.5rem" }}>
				<img
					src={image}
					alt=""
					height="100%"
					width="100%"
					style={{ objectFit: "cover" }}
				/>
			</Box>
			<Box>
				<Typography
					component="div"
					variant="subtitle2"
					color="inherit"
					sx={{
						textTransform: "capitalize",
					}}
					gutterBottom
				>
					Chester belt
				</Typography>
				<Typography
					component="div"
					variant="subtitle2"
					color="inherit"
					sx={{
						textTransform: "capitalize",
						fontWeight: 700,
					}}
				>
					N2,000
				</Typography>
			</Box>
		</Box>
	);
};

export default SmallCards;
