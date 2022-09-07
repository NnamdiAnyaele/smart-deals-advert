import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import arrowRight from "../../assets/images/advert-page/advert-arrow-right.png";
import arrowLeft from "../../assets/images/advert-page/advert-arrow-left.png";
import pageIndicator from "../../assets/images/advert-page/page-indicator.png";

const style = {
	border: "8px solid #E0D7D4",
	height: "100%",
	width: "100%",
	backgroundColor: "#dedede",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	cursor: "pointer",
	"&:hover": {
		backgroundColor: "#c4c4c4",
	},
	position: "relative",
};

const textStyles = {
	color: "#fff",
	fontWeight: "bold",
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -57%)",
};

const iconContainerStyles = {
	position: "relative",
};

const iconStyles = {
	color: "#00C96C",
	fontSize: "3rem",
	m: 0,
};

const leftArrowStyles = {
	position: "absolute",
	top: "50%",
	left: "-2%",
	transform: "translateY(-50%)",
	width: "1.5rem",
};

const rightArrowStyles = {
	position: "absolute",
	top: "50%",
	right: "-2%",
	transform: "translateY(-50%)",
	width: "1.5rem",
};

const pageIndicatorStyles = {
	position: "absolute",
	left: "50%",
	bottom: "0",
	transform: "translateX(-50%)",
	width: "4rem",
};

const AdvertPositionCard = ({ number, isSelected, onPositionSelect }) => {
	return (
		<Box
			sx={{ ...style, backgroundColor: isSelected ? "#c4c4c4" : "#dedede" }}
			onClick={onPositionSelect}
		>
			{number === 1 && (
				<>
					<Box sx={leftArrowStyles}>
						<img src={arrowLeft} alt="arrow-left" width="100%" height="auto" />
					</Box>
					<Box sx={rightArrowStyles}>
						<img
							src={arrowRight}
							alt="arrow-right"
							width="100%"
							height="auto"
						/>
					</Box>
					<Box sx={pageIndicatorStyles}>
						<img
							src={pageIndicator}
							alt="page-indicator"
							width="100%"
							height="auto"
						/>
					</Box>
				</>
			)}
			<Box sx={iconContainerStyles}>
				{!isSelected && (
					<Typography variant="h6" sx={textStyles}>
						{number}
					</Typography>
				)}
				{isSelected ? (
					<CheckCircleIcon sx={iconStyles} />
				) : (
					<CircleIcon sx={iconStyles} />
				)}
			</Box>
		</Box>
	);
};

export default AdvertPositionCard;
