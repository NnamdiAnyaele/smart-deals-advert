import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import AdvertCard from "../../components/common/AdvertCard";
import ViewAdvertModal from "../../components/common/ViewAdvertModal";
// import DeleteModal from "../../components/common/DeleteModal";
import Loader from "../../components/common/Loader";
import PaginationBox from "../../components/common/PaginationBox";
import {
	fetchMyAdvertImages,
	// deleteExpiredAdvertImages,
} from "../../api/advert";

const paddingStyles = {
	padding: {
		md: "3rem",
		sm: "3rem 1rem",
		xs: "3rem 1rem",
	},
};

const buttonStyles = {
	textTransform: "capitalize",
};

const centerItem = {
	display: "flex",
	justifyContent: "center",
};

const advertsContainerStyles = { maxWidth: { lg: "58.5rem", sm: "39rem" } };

const PaidAdvert = () => {
	const { user } = useSelector((state) => state.auth);
	const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));
	// const queryClient = useQueryClient();

	const [viewModalOpen, setViewModalOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState({});
	// const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [paidAdverts, setPaidAdverts] = useState([]);
	const [paidPage, setPaidPage] = useState(1);
	const [displayedPaidAdverts, setDisplayedPaidAdverts] = useState([]);
	const [size, setSize] = useState(9);

	const {
		data: advertsData = [],
		isLoading: advertsLoading,
		isError: advertsError,
		error: advertsErrorMessage,
	} = useQuery(
		["fetch-adverts", { username: user.username, region: user.region }],
		async () =>
			fetchMyAdvertImages({ username: user.username, region: user.region }),
		{
			select: (data) => data.data,
			staleTime: 4 * 60 * 1000,
			enabled: Boolean(user.username) && Boolean(user.region),
		}
	);

	useEffect(() => {
		if (advertsError) {
			if (advertsErrorMessage.response) {
				toast.error(advertsErrorMessage.response.data?.message);
			} else if (advertsErrorMessage.request) {
				toast.error("Internal Server Error");
			} else {
				toast.error("Error", advertsErrorMessage.message);
			}
		}
	}, [advertsError, advertsErrorMessage]);

	useEffect(() => {
		if (advertsData.length && !advertsLoading) {
			const paid = advertsData.filter(
				(item) => Number(item.status) === 1 && Number(item.paid) === 1
			);
			setPaidAdverts(paid);
		}
	}, [advertsData, advertsLoading]);

	useEffect(() => {
		if (paidAdverts.length) {
			const sliceData = paidAdverts.slice(
				(paidPage - 1) * size,
				paidPage * size
			);
			setDisplayedPaidAdverts(sliceData);
		}
	}, [paidAdverts, paidPage]);

	useEffect(() => {
		if (isSmallScreen) {
			setSize(8);
		}
	}, [isSmallScreen]);

	// const { mutate: deleteAdvert, isLoading: deleteAdvertLoading } = useMutation(
	// 	"delete-expired-advert",
	// 	deleteExpiredAdvertImages,
	// 	{
	// 		onSuccess: (dataSuccess) => {
	// 			setDeleteModalOpen(false);
	// 			setSelectedItem({});
	// 			toast.success(dataSuccess?.message);
	// 		},
	// 		onError: (errors) => {
	// 			if (errors.response) {
	// 				toast.error(errors.response.data.message);
	// 			} else if (errors.request) {
	// 				toast.error("Internal Server Error");
	// 			} else {
	// 				toast.error("Error", errors.message);
	// 			}
	// 		},
	// 		onSettled: () => {
	// 			queryClient.invalidateQueries("fetch-adverts");
	// 			queryClient.invalidateQueries("fetch-approved-adverts");
	// 		},
	// 	}
	// );

	// const handleDelete = async () => {
	// 	const payload = {
	// 		customerID: selectedItem.customerID,
	// 		ID: selectedItem.id,
	// 		username: selectedItem.username,
	// 		region: user.region,
	// 		admin: user.fullName,
	// 		position: selectedItem.position,
	// 	};
	// 	await deleteAdvert(payload);
	// };

	return (
		<Box sx={paddingStyles}>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					mb: "3rem",
				}}
			>
				<Typography
					variant="h6"
					sx={{
						fontWeight: 700,
						textTransform: "capitalize",
						mr: "auto",
						whiteSpace: { sm: "nowrap" },
					}}
					gutterBottom
				>
					paid adverts
				</Typography>

				<Box
					sx={{
						display: "flex",
						// justifyContent: { xs: "flex-start", sm: "flex-end" },
						width: { xs: "100%", sm: "auto" },
					}}
				>
					<Box sx={{ ml: "auto" }}>
						<Button
							variant="contained"
							sx={buttonStyles}
							component={Link}
							to="/customer/new-advert"
						>
							create new advert
						</Button>
					</Box>
				</Box>
			</Box>

			{advertsLoading && <Loader />}

			<Box sx={advertsContainerStyles}>
				{!advertsLoading && (
					<>
						{/* paid adverts */}
						<Box>
							<Grid container spacing={4}>
								{displayedPaidAdverts.map((advert) => (
									<Grid
										item
										xs={12}
										sm={6}
										lg={4}
										sx={centerItem}
										key={advert.id}
									>
										<AdvertCard
											image={advert?.file}
											setSelectedItem={() => setSelectedItem(advert)}
											handleView={() => setViewModalOpen(true)}
											// handleDelete={() => setDeleteModalOpen(true)}
										/>
									</Grid>
								))}
							</Grid>
							<PaginationBox
								count={Math.ceil(paidAdverts?.length / size) || 0}
								page={paidPage}
								handlePageChange={(event, value) => {
									setPaidPage(value);
								}}
							/>
						</Box>
					</>
				)}
			</Box>

			<ViewAdvertModal
				open={viewModalOpen}
				handleClose={() => setViewModalOpen(false)}
				data={selectedItem}
			/>

			{/* <DeleteModal
				open={deleteModalOpen}
				handleClose={() => setDeleteModalOpen(false)}
				title="Delete Expired Advert"
				subtitle=""
				handleDelete={handleDelete}
				loading={deleteAdvertLoading}
			/> */}
		</Box>
	);
};

export default PaidAdvert;
