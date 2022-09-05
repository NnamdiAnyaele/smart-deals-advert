import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Grid from "@mui/material/Grid";

import Loader from "../../components/common/Loader";
import AdvertCard from "../../components/common/AdvertCard";
import ViewAdvertModal from "../../components/common/ViewAdvertModal";
import { fetchMyAdvertImages } from "../../api/advert";

const paddingStyles = {
	padding: {
		md: "3rem",
		sm: "3rem 1rem",
		xs: "3rem 1rem",
	},
};

const profileContainerStyles = { mb: "2rem" };

const profileCardStyles = {
	display: "flex",
	alignItems: "center",
};

const profileAvatarContainerStyles = {
	width: "10rem",
	height: "10rem",
	mr: "1rem",
	display: "flex",
	alignItems: "center",
};

const profileImageStyles = { objectFit: "cover", borderRadius: "50%" };

const profileIconStyles = {
	fontSize: "10rem",
};

const buttonStyles = {
	textTransform: "capitalize",
};

const userDataContainerStyles = {
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
};

const textStyles = {
	color: "#635959",
	mb: "0.5rem",
	"&:last-child": {
		mb: 0,
	},
};

const flexContainer = {
	width: "100%",
	display: "flex",
	justifyContent: "flex-end",
};

const centerItem = {
	display: "flex",
	justifyContent: "center",
};

const Dashboard = () => {
	const { user } = useSelector((state) => state.auth);

	const [viewModalOpen, setViewModalOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState({});

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

	return (
		<Box sx={paddingStyles}>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					mb: "2rem",
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
				>
					my account
				</Typography>
			</Box>

			<Box sx={{ width: "36rem" }}>
				<Box sx={profileContainerStyles}>
					<Box
						sx={{
							width: "36rem",
							backgroundColor: "#fafafa",
							borderRadius: "1rem",
							padding: "1rem",
						}}
					>
						<Box sx={flexContainer}>
							<IconButton
								component={Link}
								to="/customer/update-profile"
								color="secondary"
							>
								<EditIcon />
								<Typography
									variant="body1"
									sx={{
										textTransform: "capitalize",
										ml: "0.5rem",
									}}
								>
									edit
								</Typography>
							</IconButton>
						</Box>
						<Box sx={profileCardStyles}>
							<Box sx={profileAvatarContainerStyles}>
								{user?.partnerLogo ? (
									<img
										src={user?.partnerLogo}
										alt="avatar"
										width="100%"
										height="100%"
										style={profileImageStyles}
									/>
								) : (
									<AccountCircleIcon color="primary" sx={profileIconStyles} />
								)}
							</Box>
							<Box sx={userDataContainerStyles}>
								<Typography
									variant="body1"
									sx={{ ...textStyles, fontWeight: "bold" }}
								>
									{user?.customerName}
								</Typography>
								<Typography variant="body1" sx={textStyles}>
									{user?.username}
								</Typography>
								<Typography variant="body1" sx={textStyles}>
									{user?.emailAddress}
								</Typography>
								<Typography variant="body1" sx={textStyles}>
									{user?.phoneNumber}
								</Typography>
							</Box>
						</Box>
					</Box>
				</Box>

				<Box>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							mb: "2rem",
						}}
					>
						<Typography
							variant="body1"
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
									<Grid container spacing={4}>
										{advertsData?.slice(0, 2).map((advert) => (
											<Grid item xs={6} sx={centerItem} key={advert.id}>
												<AdvertCard
													image={advert?.file}
													setSelectedItem={() => setSelectedItem(advert)}
													handleView={() => setViewModalOpen(true)}
												/>
											</Grid>
										))}
									</Grid>
								)}
							</Box>

							<Box>
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
						</Box>
					)}
				</Box>
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
