import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
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

const buttonStyles = {
	textTransform: "capitalize",
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

const PaymentOption = ({
	isSelected,
	title,
	onCardClick,
	onButtonClick,
	loading,
}) => {
	return (
		<Box sx={payOptionBoxStyles} onClick={onCardClick}>
			<Box sx={{ ...flexBoxStyles, mb: isSelected ? "0.5rem" : 0 }}>
				{isSelected ? (
					<RadioButtonCheckedIcon sx={iconsStyles} />
				) : (
					<RadioButtonUncheckedIcon sx={iconsStyles} />
				)}
				<Typography variant="body1">{title}</Typography>
			</Box>

			{isSelected && (
				<>
					<Typography variant="body2" gutterBottom sx={{ color: "#5F5F5F" }}>
						Kindly click proceed to complete your payment
					</Typography>
					<Box>
						<Button
							variant="contained"
							sx={buttonStyles}
							fullWidth
							onClick={onButtonClick}
							disabled={loading}
						>
							{loading ? <CircularProgress size="1.5rem" /> : "proceed"}
						</Button>
					</Box>
				</>
			)}
		</Box>
	);
};

export default PaymentOption;
