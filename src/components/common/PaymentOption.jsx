import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

const payOptionBoxStyles = {
	border: "1px solid #e6771f",
	p: "1rem",
	borderRadius: "0.5rem",
	width: "25rem",
	mb: "1rem",
	"&:last-child": {
		mb: 0,
	},
	cursor: "pointer",
};

const flexBoxStyles = {
	display: "flex",
	mb: "0.5rem",
	alignItems: "center",
};

const iconsStyles = {
	color: "#e41F26",
	mr: "0.5rem",
};

const PaymentOption = ({ isSelected, title, onCardClick }) => {
	return (
		<Box sx={payOptionBoxStyles} onClick={onCardClick}>
			<Box sx={flexBoxStyles}>
				{isSelected ? (
					<RadioButtonCheckedIcon sx={iconsStyles} />
				) : (
					<RadioButtonUncheckedIcon sx={iconsStyles} />
				)}
				<Typography variant="body1">{title}</Typography>
			</Box>
		</Box>
	);
};

export default PaymentOption;
