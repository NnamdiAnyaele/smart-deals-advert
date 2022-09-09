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

import Loader from "../../components/common/Loader";
import AdvertCard from "../../components/common/AdvertCard";
import ViewAdvertModal from "../../components/common/ViewAdvertModal";
import PaginationBox from "../../components/common/PaginationBox";
import { fetchMyAdvertImages } from "../../api/advert";

const paddingStyles = {
	padding: {
		md: "3rem",
		sm: "3rem 1rem",
		xs: "3rem 1rem",
	},
};
const buttonStyles = {
	textTransform: "capitalize",
	mb: "2rem",
};

const centerItem = {
	display: "flex",
	justifyContent: "center",
};

const advertsContainerStyles = { maxWidth: { lg: "58.5rem", sm: "39rem" } };

const Dashboard = () => {
	const { user } = useSelector((state) => state.auth);
	const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));

	const [viewModalOpen, setViewModalOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState({});
	const [size, setSize] = useState(9);
	const [displayedAdverts, setDisplayedAdverts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

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
		if (advertsData.length) {
			const sliceData = advertsData.slice(
				(currentPage - 1) * size,
				currentPage * size
			);
			setDisplayedAdverts(sliceData);
		}
	}, [advertsData, currentPage]);

	useEffect(() => {
		if (isSmallScreen) {
			setSize(8);
		}
	}, [isSmallScreen]);

	return (
		<Box sx={paddingStyles}>
			<Box sx={advertsContainerStyles}>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						mb: "1rem",
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
						my adverts
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
								variant="text"
								sx={{ textTransform: "none", fontSize: "1rem" }}
								component={Link}
								to="/customer/advert-history"
								color="secondary"
							>
								View all adverts
							</Button>
						</Box>
					</Box>
				</Box>

				<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
					<Button
						variant="contained"
						sx={buttonStyles}
						color="primary"
						component={Link}
						to="/customer/new-advert"
					>
						create new advert
					</Button>
				</Box>

				{advertsLoading && <Loader />}

				{!advertsLoading && (
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Box sx={{ mb: "2rem" }}>
							{advertsData.length === 0 && (
								<Typography
									variant="body1"
									sx={{
										fontWeight: 700,
										textAlign: "center",
									}}
									gutterBottom
								>
									You are yet to create an advert
								</Typography>
							)}

							{advertsData.length > 0 && (
								<Box>
									<Grid container spacing={4}>
										{displayedAdverts.map((advert) => (
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
													title={advert?.title}
												/>
											</Grid>
										))}
									</Grid>
									<PaginationBox
										count={Math.ceil(advertsData?.length / size) || 0}
										page={currentPage}
										handlePageChange={(event, value) => {
											setCurrentPage(value);
										}}
									/>
								</Box>
							)}
						</Box>
					</Box>
				)}
			</Box>
			<ViewAdvertModal
				open={viewModalOpen}
				handleClose={() => setViewModalOpen(false)}
				data={selectedItem}
			/>
		</Box>
	);
};

export default Dashboard;
