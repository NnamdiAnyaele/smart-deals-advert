import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

import { currencySymbolMap } from "../../utils/constants";
import { numberFormatter } from "../../utils/helpers/functions";

const amountpayableContainerStyles = {
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	flexWrap: "wrap",
	borderRadius: "1rem",
	color: "#594E4E",
};

const totalAmountPayableStyle = {
	textTransform: "capitalize",
};

const amountStyles = { fontWeight: "bold" };

const PaymentBreakDown = ({ title, amount, makeBold = false }) => {
	const { user } = useSelector((state) => state.auth);

	return (
		<Box sx={amountpayableContainerStyles}>
			<Typography
				variant="body1"
				sx={{ ...totalAmountPayableStyle, fontWeight: makeBold ? 700 : 400 }}
			>
				{title}
			</Typography>
			<Typography variant="body1" sx={amountStyles}>
				{`${currencySymbolMap[user.region]} ${numberFormatter(amount)}`}
			</Typography>
		</Box>
	);
};

export default PaymentBreakDown;
