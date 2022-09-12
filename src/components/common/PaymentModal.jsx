import { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

import PaymentOption from "./PaymentOption";
import PaymentBreakDown from "./PaymentBreakDown";
import Loader from "./Loader";
import { PAYMENTOPTIONS } from "../../utils/constants";
import closeIcon from "../../assets/icons/close-icon.svg";
import {
	getPaymentEndpoint,
	getPaymentTransactionDetails,
	getZenithPaymentTransactionDetails,
} from "../../api/payment";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "29rem",
	maxWidth: "95%",
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	outline: 0,
	display: "flex",
	justifyContent: "center",
	maxheight: "100%",
	overflowY: "auto",
	overflowX: "hiddem",
	msOverflowStyle: "none",
	scrollbarWidth: "none",
};

const paymentOptionsContainerStyles = {
	mb: "1rem",
};

const paymentBreakdownStyles = {
	mb: "1rem",
};

const payButtonContainerStyles = {
	display: "flex",
	justifyContent: "flex-end",
};

const buttonStyles = {
	textTransform: "capitalize",
};

const { protocol, host } = window.location;

export default function PaymentModal({ open, handleClose, advert }) {
	const { user, bizFrom, role } = useSelector((state) => state.auth);

	const [paymentOption, setPaymentOption] = useState("");
	const [chargeAmount, setChargeAmount] = useState(0);
	const [showChargeAmount, setShowChargeAmount] = useState(false);
	const [authorizationUrl, setAuthorizationUrl] = useState("");

	const {
		isLoading: getPaymentEndpointLoading,
		isError: getPaymentEndpointError,
		error: getPaymentEndpointErrorMessage,
	} = useQuery(
		[
			"get-payment-endpoint",
			{ username: user?.username, region: user?.region, paymentOption },
		],
		async () =>
			getPaymentEndpoint({ channel: paymentOption, region: user?.region }),
		{
			select: (data) => data,
			staleTime: Infinity,
			enabled: Boolean(paymentOption),
			onSuccess: async (data) => {
				if (data?.gateway === "paystack") {
					await handleFetchPaymentTransactionDetails();
				}
				if (data?.gateway === "zenith") {
					await handleFetchZenithPaymentTransactionDetails();
				}
			},
		}
	);

	console.log({ paymentOption });

	useEffect(() => {
		if (getPaymentEndpointError) {
			if (getPaymentEndpointErrorMessage.response) {
				toast.error(getPaymentEndpointErrorMessage.response.data?.message);
			} else if (getPaymentEndpointErrorMessage.request) {
				toast.error("Internal Server Error");
			} else {
				toast.error("Error", getPaymentEndpointErrorMessage.message);
			}
		}
	}, [getPaymentEndpointError, getPaymentEndpointErrorMessage]);

	// paysack
	const {
		mutate: fetchPaymentTransactionDetails,
		isLoading: getPaymentTransactionDetailsLoading,
	} = useMutation(
		"getPaymentTransactionDetails",
		getPaymentTransactionDetails,
		{
			onSuccess: (data) => {
				setShowChargeAmount(true);
				setChargeAmount(data?.charge);
				setAuthorizationUrl(data?.authorization_url);
			},
			onError: (error) => {
				if (error.response) {
					toast.error(error.response.data.message);
				} else if (error.request) {
					toast.error("Internal Server Error");
				} else {
					toast.error("Error", error.message);
				}
			},
		}
	);

	const handleFetchPaymentTransactionDetails = async () => {
		const payload = {
			username: user?.username,
			fullName: user?.fullName || "NA",
			emailAddress: user?.emailAddress,
			phoneNumber: user?.phoneNumber,
			amount: advert?.amount,
			channel: paymentOption,
			productType: "advert",
			callBack: `${protocol}//${host}/payment/callback/${advert?.advertID}/${paymentOption}`,
			region: user?.region,
			bizFrom,
			accountType: role,
			shippingFee: 0,
		};
		await fetchPaymentTransactionDetails(payload);
	};

	// zenith
	const {
		mutate: fetchZenithPaymentTransactionDetails,
		isLoading: fetchZenithPaymentTransactionDetailsLoading,
	} = useMutation(
		"getZenithPaymentTransactionDetails",
		getZenithPaymentTransactionDetails,
		{
			onSuccess: (data) => {
				setShowChargeAmount(true);
				setChargeAmount(data?.charge);
				setAuthorizationUrl(data?.authorization_url);
			},
			onError: (error) => {
				if (error.response) {
					toast.error(error.response.data.message);
				} else if (error.request) {
					toast.error("Internal Server Error");
				} else {
					toast.error("Error", error.message);
				}
			},
		}
	);

	const handleFetchZenithPaymentTransactionDetails = async () => {
		const payload = {
			username: user?.username,
			fullName: user?.fullName || "NA",
			emailAddress: user?.emailAddress,
			phoneNumber: user?.phoneNumber,
			amount: advert?.amount,
			channel: paymentOption,
			productType: "advert",
			callBack: `${protocol}//${host}/payment/callback/${advert}/${paymentOption}`,
			region: user?.region,
			bizFrom,
			accountType: role,
			shippingFee: 0,
		};
		await fetchZenithPaymentTransactionDetails(payload);
	};

	const handlePay = () => {
		window.location.href = authorizationUrl;
	};

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Box sx={{ p: "2rem" }}>
						<Box
							sx={{
								display: "flex",
								justifyContent: "flex-end",
								maxWidth: "100%",
							}}
						>
							<Button
								variant="text"
								sx={{ height: "2rem", width: "2rem" }}
								onClick={handleClose}
								endIcon={
									<img
										src={closeIcon}
										height="100%"
										width="100%"
										alt="close modal"
									/>
								}
							/>
						</Box>
						<Box sx={{ mb: 2 }}>
							<Typography variant="h6">
								{`Hi ${user?.username}, to complete your payment`}
							</Typography>
							<Typography variant="body1">
								Kindly choose a payment method to proceed
							</Typography>
						</Box>

						<Box sx={paymentOptionsContainerStyles}>
							<PaymentOption
								title="Pay with Bank"
								isSelected={paymentOption === PAYMENTOPTIONS.BANK}
								onCardClick={() => {
									setPaymentOption(PAYMENTOPTIONS.BANK);
								}}
								loading={
									getPaymentEndpointLoading ||
									getPaymentTransactionDetailsLoading ||
									fetchZenithPaymentTransactionDetailsLoading
								}
							/>
							<PaymentOption
								title="Pay with Bank Transfer"
								isSelected={paymentOption === PAYMENTOPTIONS.BANKTRANSFER}
								onCardClick={() => {
									setPaymentOption(PAYMENTOPTIONS.BANKTRANSFER);
								}}
								loading={
									getPaymentEndpointLoading ||
									getPaymentTransactionDetailsLoading ||
									fetchZenithPaymentTransactionDetailsLoading
								}
							/>
							<PaymentOption
								title="Pay with Card"
								isSelected={paymentOption === PAYMENTOPTIONS.CARD}
								onCardClick={() => {
									setPaymentOption(PAYMENTOPTIONS.CARD);
								}}
								loading={
									getPaymentEndpointLoading ||
									getPaymentTransactionDetailsLoading ||
									fetchZenithPaymentTransactionDetailsLoading
								}
							/>
							<PaymentOption
								title="Pay with USSD"
								isSelected={paymentOption === PAYMENTOPTIONS.USSD}
								onCardClick={() => {
									setPaymentOption(PAYMENTOPTIONS.USSD);
								}}
								loading={
									getPaymentEndpointLoading ||
									getPaymentTransactionDetailsLoading ||
									fetchZenithPaymentTransactionDetailsLoading
								}
							/>
						</Box>

						<Box sx={paymentBreakdownStyles}>
							<PaymentBreakDown title="subtotal:" amount={advert?.amount} />
							{showChargeAmount && (
								<PaymentBreakDown title="charges:" amount={chargeAmount} />
							)}
							<PaymentBreakDown
								title="total:"
								amount={Number(advert?.amount) + Number(chargeAmount)}
								makeBold
							/>
						</Box>

						{(getPaymentEndpointLoading ||
							getPaymentTransactionDetailsLoading ||
							fetchZenithPaymentTransactionDetailsLoading) && <Loader />}

						{showChargeAmount && (
							<Box sx={payButtonContainerStyles}>
								<Button
									sx={buttonStyles}
									variant="contained"
									onClick={handlePay}
								>
									pay
								</Button>
							</Box>
						)}
					</Box>
				</Box>
			</Modal>
		</div>
	);
}
