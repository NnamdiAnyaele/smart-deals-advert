import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import { numberFormatter } from "../../utils/helpers/functions";

const cardStyles = {
	// width: 230,
	minHeight: "6.3rem",
	// color: "#fff",
	margin: "0.5rem",
	pl: { lg: "1rem", xs: 0 },
	width: { md: "19%", sm: 230, xs: "100%" },
};

const cardContentStyles = {
	padding: "0.5rem",
	height: "100%",
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	"&:last-child": {
		padding: "0.5rem",
	},
};

const SummaryCard = ({
	loading,
	text,
	value,
	Icon,
	isNumber = true,
	backgroundColor,
}) => {
	return (
		<Card
			sx={{
				...cardStyles,
				backgroundColor,
				width: {
					md: isNumber ? "19%" : "25%",
					sm: isNumber ? 230 : 250,
					xs: "97%",
				},
			}}
		>
			<CardContent
				sx={{
					...cardContentStyles,
				}}
			>
				<Box>
					{isNumber && (
						<Typography
							variant="h6"
							sx={{ width: "70%", fontWeight: 700 }}
							component="div"
						>
							{loading ? (
								<CircularProgress size="1rem" />
							) : (
								numberFormatter(value) || 0
							)}
						</Typography>
					)}
					{!isNumber && (
						<Typography
							variant="h6"
							sx={{
								width: "70%",
								fontWeight: 700,
								textTransform: "uppercase",
							}}
							component="div"
						>
							{loading ? <CircularProgress size="1rem" /> : value}
						</Typography>
					)}
					<Typography variant="body2" sx={{ textTransform: "capitalize" }}>
						{text}
					</Typography>
				</Box>
				{Icon}
			</CardContent>
		</Card>
	);
};

export default SummaryCard;
