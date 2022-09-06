import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";

import Loader from "../../components/common/Loader";
import SuccessModal from "../../components/common/AdvertSuccessModal";
import { fetchAdvertImageByID, advertPaid } from "../../api/advert";

const containerStyles = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	width: "100vw",
	height: "100vh",
};

const AdvertCallback = () => {
	const { user, bizFrom } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const { advertID, channel } = useParams();
	const [searchParams] = useSearchParams();
	const transactionRef = searchParams.get("trxref");
	const queryClient = useQueryClient();

	const [openSuccessModal, setOpenSuccessModal] = useState(false);

	const {
		// isLoading: advertsLoading,
		isError: advertsError,
		error: advertsErrorMessage,
	} = useQuery(
		[
			"fetch-advert",
			{ username: user.username, region: user.region, advertID },
		],
		async () =>
			fetchAdvertImageByID({
				username: user.username,
				region: user.region,
				advertID,
			}),
		{
			select: (data) => data?.data?.[0],
			staleTime: 4 * 60 * 1000,
			enabled:
				Boolean(user.username) && Boolean(user.region) && Boolean(advertID),
			onSuccess: async (data) => {
				await handlePaymentverify(data);
			},
		}
	);

	useEffect(() => {
		if (advertsError) {
			navigate("/customer/advert-history");
			if (advertsErrorMessage.response) {
				toast.error(advertsErrorMessage.response.data?.message);
			} else if (advertsErrorMessage.request) {
				toast.error("Internal Server Error");
			} else {
				toast.error("Error", advertsErrorMessage.message);
			}
		}
	}, [advertsError, advertsErrorMessage]);

	const {
		mutate: confirmAdvertPayment,
		// isLoading: confirmAdvertPaymentLoading,
	} = useMutation("advert-paid", advertPaid, {
		onSuccess: () => {
			setOpenSuccessModal(true);
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
		onSettled: () => {
			queryClient.invalidateQueries("fetch-adverts");
			queryClient.invalidateQueries("fetch-approved-adverts");
		},
	});

	const handlePaymentverify = async (advertData) => {
		const payload = {
			ID: advertData?.id,
			username: user?.username,
			advertID,
			transactionRef,
			channel,
			region: user?.region,
			days: advertData?.days,
			bizFrom,
			amount: advertData?.amount,
		};

		await confirmAdvertPayment(payload);
	};

	return (
		<Box sx={containerStyles}>
			<Loader />
			<SuccessModal
				open={openSuccessModal}
				handleClose={() => {
					setOpenSuccessModal(false);
					navigate("/customer/advert-history");
				}}
				text="You have successfully paid for your advert"
			/>
		</Box>
	);
};

export default AdvertCallback;
