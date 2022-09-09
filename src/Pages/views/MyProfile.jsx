import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

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

const MyProfile = () => {
	const { user } = useSelector((state) => state.auth);

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
					my profile
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
			</Box>
		</Box>
	);
};

export default MyProfile;
