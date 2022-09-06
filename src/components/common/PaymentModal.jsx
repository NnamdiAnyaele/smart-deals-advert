import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

import PaymentOption from "./PaymentOption";
import { PAYMENTOPTIONS, currencySymbolMap } from "../../utils/constants";
import { numberFormatter } from "../../utils/helpers/functions";
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

const amountpayableContainerStyles = {
	mb: "1rem",
	backgroundColor: "#E6E6E6",
	p: "1rem",
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

const { protocol, host } = window.location;

export default function PaymentModal({ open, handleClose, advert }) {
	const { user, bizFrom, role } = useSelector((state) => state.auth);
	const queryClient = useQueryClient();

	const [paymentOption, setPaymentOption] = useState("");

	const {
		isLoading: getPaymentEndpointLoading,
		isError: getPaymentEndpointError,
		error: getPaymentEndpointErrorMessage,
		refetch,
	} = useQuery(
		[
			"get-payment-endpoint",
			{ username: user?.username, region: user?.region },
		],
		async () =>
			getPaymentEndpoint({ channel: paymentOption, region: user?.region }),
		{
			select: (data) => data,
			staleTime: Infinity,
			enabled: false,
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
				queryClient.invalidateQueries("fetch-adverts");
				queryClient.invalidateQueries("fetch-approved-adverts");
				window.location = data?.authorization_url;
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
			fullName: user?.fullName,
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
				queryClient.invalidateQueries("fetch-adverts");
				queryClient.invalidateQueries("fetch-approved-adverts");
				window.location = data?.authorization_url;
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
			fullName: user?.fullName,
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

						<Box>
							<Box sx={amountpayableContainerStyles}>
								<Typography variant="body1" sx={totalAmountPayableStyle}>
									total amount payable
								</Typography>
								<Typography variant="h6" sx={amountStyles}>
									{`${currencySymbolMap[user.region]} ${numberFormatter(
										advert?.amount
									)}`}
								</Typography>
							</Box>
							<PaymentOption
								title="Pay with Bank"
								isSelected={paymentOption === PAYMENTOPTIONS.BANK}
								onCardClick={() => setPaymentOption(PAYMENTOPTIONS.BANK)}
								onButtonClick={refetch}
								loading={
									getPaymentEndpointLoading ||
									getPaymentTransactionDetailsLoading ||
									fetchZenithPaymentTransactionDetailsLoading
								}
							/>
							<PaymentOption
								title="Pay with Bank Transfer"
								isSelected={paymentOption === PAYMENTOPTIONS.BANKTRANSFER}
								onCardClick={() =>
									setPaymentOption(PAYMENTOPTIONS.BANKTRANSFER)
								}
								onButtonClick={refetch}
								loading={
									getPaymentEndpointLoading ||
									getPaymentTransactionDetailsLoading ||
									fetchZenithPaymentTransactionDetailsLoading
								}
							/>
							<PaymentOption
								title="Pay with Card"
								isSelected={paymentOption === PAYMENTOPTIONS.CARD}
								onCardClick={() => setPaymentOption(PAYMENTOPTIONS.CARD)}
								onButtonClick={refetch}
								loading={
									getPaymentEndpointLoading ||
									getPaymentTransactionDetailsLoading ||
									fetchZenithPaymentTransactionDetailsLoading
								}
							/>
							<PaymentOption
								title="Pay with USSD"
								isSelected={paymentOption === PAYMENTOPTIONS.USSD}
								onCardClick={() => setPaymentOption(PAYMENTOPTIONS.USSD)}
								onButtonClick={refetch}
								loading={
									getPaymentEndpointLoading ||
									getPaymentTransactionDetailsLoading ||
									fetchZenithPaymentTransactionDetailsLoading
								}
							/>
						</Box>
					</Box>
				</Box>
			</Modal>
		</div>
	);
}
