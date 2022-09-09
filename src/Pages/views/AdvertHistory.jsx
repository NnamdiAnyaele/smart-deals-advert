import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import AdvertCard from "../../components/common/AdvertCard";
import ViewAdvertModal from "../../components/common/ViewAdvertModal";
// import DeleteModal from "../../components/common/DeleteModal";
import Loader from "../../components/common/Loader";
import PaginationBox from "../../components/common/PaginationBox";
import PaymentModal from "../../components/common/PaymentModal";
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

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

const advertsContainerStyles = { maxWidth: { lg: "58.5rem", sm: "39rem" } };

const AdvertHistory = () => {
	const { user } = useSelector((state) => state.auth);
	const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));
	// const queryClient = useQueryClient();

	const [viewModalOpen, setViewModalOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState({});
	// const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [currentTab, setCurrentTab] = useState(0);
	const [pendingAdverts, setPendingAdverts] = useState([]);
	// const [approvedAdverts, setApprovedAdverts] = useState([]);
	const [rejectedAdverts, setRejectedAdverts] = useState([]);
	const [paidAdverts, setPaidAdverts] = useState([]);
	const [approvedUnpaidAdverts, setApprovedUnpaidAdverts] = useState([]);
	const [pendingPage, setPendingPage] = useState(1);
	// const [approvedPage, setApprovedPage] = useState(1);
	const [rejectedPage, setRejectedPage] = useState(1);
	const [paidPage, setPaidPage] = useState(1);
	const [approvedUnpaidPage, setApprovedUnpaidPage] = useState(1);
	const [expiredPage, setExpiredPage] = useState(1);
	const [displayedPendingAdverts, setDisplayedPendingAdverts] = useState([]);
	// const [displayedApprovedAdverts, setDisplayedApprovedAdverts] = useState([]);
	const [displayedRejectedAdverts, setDisplayedRejectedAdverts] = useState([]);
	const [displayedPaidAdverts, setDisplayedPaidAdverts] = useState([]);
	const [displayedApprovedUnpaidAdverts, setDisplayedApprovedUnpaidAdverts] =
		useState([]);
	const [size, setSize] = useState(9);
	const [paymentModalOpen, setPaymentModalOpen] = useState(false);
	const [expiredAdverts, setExpiredAdverts] = useState([]);
	const [displayedExpiredAdverts, setDisplayedExpiredAdverts] = useState([]);

	console.log({ selectedItem });

	const {
		data: advertsData = [],
		isLoading: advertsLoading,
		isError: advertsError,
		error: advertsErrorMessage,
	} = useQuery(
		["fetch-adverts", { username: user?.username, region: user?.region }],
		async () =>
			fetchMyAdvertImages({ username: user?.username, region: user?.region }),
		{
			select: (data) => data.data,
			staleTime: 4 * 60 * 1000,
			enabled: Boolean(user?.username) && Boolean(user?.region),
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
			const pending = advertsData.filter((item) => Number(item.status) === 0);
			setPendingAdverts(pending);

			// const approved = advertsData.filter((item) => Number(item.status) === 1);
			// setApprovedAdverts(approved);

			const rejected = advertsData.filter((item) => Number(item.status) === 2);
			setRejectedAdverts(rejected);

			const paid = advertsData.filter(
				(item) => Number(item.status) === 1 && Number(item.paid) === 1
			);
			setPaidAdverts(paid);

			const approvedUnpaid = advertsData.filter(
				(item) => Number(item.status) === 1 && Number(item.paid) === 0
			);
			setApprovedUnpaidAdverts(approvedUnpaid);

			const expired = advertsData.filter((item) => Number(item.status) === 3);
			setExpiredAdverts(expired);
		}
	}, [advertsData, advertsLoading]);

	useEffect(() => {
		if (pendingAdverts.length) {
			const sliceData = pendingAdverts.slice(
				(pendingPage - 1) * size,
				pendingPage * size
			);
			setDisplayedPendingAdverts(sliceData);
		}
	}, [pendingAdverts, pendingPage]);

	// useEffect(() => {
	// 	if (approvedAdverts.length) {
	// 		const sliceData = approvedAdverts.slice(
	// 			(approvedPage - 1) * size,
	// 			approvedPage * size
	// 		);
	// 		setDisplayedApprovedAdverts(sliceData);
	// 	}
	// }, [approvedAdverts, approvedPage]);

	useEffect(() => {
		if (rejectedAdverts.length) {
			const sliceData = rejectedAdverts.slice(
				(rejectedPage - 1) * size,
				rejectedPage * size
			);
			setDisplayedRejectedAdverts(sliceData);
		}
	}, [rejectedAdverts]);

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
		if (approvedUnpaidAdverts.length) {
			const sliceData = approvedUnpaidAdverts.slice(
				(approvedUnpaidPage - 1) * size,
				approvedUnpaidPage * size
			);
			setDisplayedApprovedUnpaidAdverts(sliceData);
		}
	}, [approvedUnpaidAdverts, approvedUnpaidPage]);

	useEffect(() => {
		if (expiredAdverts.length) {
			const sliceData = expiredAdverts.slice(
				(expiredPage - 1) * size,
				expiredPage * size
			);
			setDisplayedExpiredAdverts(sliceData);
		}
	}, [expiredAdverts, expiredPage]);

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
	// 		admin: user.fullName || "NA",
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
					advert history
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

			<Box sx={{ width: "100%", mb: "2rem" }}>
				<Box>
					<Tabs
						value={currentTab}
						onChange={(event, newValue) => {
							setCurrentTab(newValue);
						}}
						aria-label="advert tabs"
						variant="scrollable"
						scrollButtons
						allowScrollButtonsMobile
					>
						<Tab label="Active Adverts" {...a11yProps(0)} />
						<Tab label="Unpaid Adverts" {...a11yProps(1)} />
						{/* <Tab label="Approved Adverts" {...a11yProps(2)} /> */}
						<Tab label="Pending Adverts" {...a11yProps(2)} />
						<Tab label="Rejected Adverts" {...a11yProps(3)} />
						<Tab label="Expired Adverts" {...a11yProps(4)} />
					</Tabs>
				</Box>
			</Box>

			{advertsLoading && <Loader />}

			<Box sx={advertsContainerStyles}>
				{!advertsLoading && (
					<>
						{/* paid adverts */}
						{currentTab === 0 && (
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
												title={advert?.title}
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
						)}

						{/* approvedUnPaid adverts */}
						{currentTab === 1 && (
							<Box>
								<Grid container spacing={4}>
									{displayedApprovedUnpaidAdverts.map((advert) => (
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
												title={advert?.title}
											/>
										</Grid>
									))}
								</Grid>
								<PaginationBox
									count={Math.ceil(approvedUnpaidAdverts?.length / size) || 0}
									page={approvedUnpaidPage}
									handlePageChange={(event, value) => {
										setApprovedUnpaidPage(value);
									}}
								/>
							</Box>
						)}

						{/* approved adverts */}
						{/* {currentTab === 2 && (
							<Box>
								<Grid container spacing={4}>
									{displayedApprovedAdverts.map((advert) => (
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
												title={advert?.title}
											/>
										</Grid>
									))}
								</Grid>
								<PaginationBox
									count={Math.ceil(approvedAdverts?.length / size) || 0}
									page={approvedPage}
									handlePageChange={(event, value) => {
										setApprovedPage(value);
									}}
								/>
							</Box>
						)} */}

						{/* pending adverts */}
						{currentTab === 2 && (
							<Box>
								<Grid container spacing={4}>
									{displayedPendingAdverts.map((advert) => (
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
												title={advert?.title}
											/>
										</Grid>
									))}
								</Grid>
								<PaginationBox
									count={Math.ceil(pendingAdverts?.length / size) || 0}
									page={pendingPage}
									handlePageChange={(event, value) => {
										setPendingPage(value);
									}}
								/>
							</Box>
						)}

						{/* rejected adverts */}
						{currentTab === 3 && (
							<Box>
								<Grid container spacing={4}>
									{displayedRejectedAdverts.map((advert) => (
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
												title={advert?.title}
											/>
										</Grid>
									))}
								</Grid>
								<PaginationBox
									count={Math.ceil(rejectedAdverts?.length / size) || 0}
									page={rejectedPage}
									handlePageChange={(event, value) => {
										setRejectedPage(value);
									}}
								/>
							</Box>
						)}

						{/* expired adverts */}
						{currentTab === 4 && (
							<Box>
								<Grid container spacing={4}>
									{displayedExpiredAdverts.map((advert) => (
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
												title={advert?.title}
											/>
										</Grid>
									))}
								</Grid>
								<PaginationBox
									count={Math.ceil(expiredAdverts?.length / size) || 0}
									page={expiredPage}
									handlePageChange={(event, value) => {
										setExpiredPage(value);
									}}
								/>
							</Box>
						)}
					</>
				)}
			</Box>

			<ViewAdvertModal
				open={viewModalOpen}
				handleClose={() => setViewModalOpen(false)}
				data={selectedItem}
				openPaymentModal={() => {
					setPaymentModalOpen(true);
					setViewModalOpen(false);
				}}
			/>

			<PaymentModal
				open={paymentModalOpen}
				handleClose={() => setPaymentModalOpen(false)}
				advert={selectedItem}
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

export default AdvertHistory;
