import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import NavBar from "../../components/Home/NavBar";
import Footer from "../../components/common/Footer";
import addGroup from "../../assets/images/add-group.png";

const paddingStyles = {
	padding: {
		md: "4rem",
		sm: "4rem 1rem",
		xs: "4rem 0",
	},
};

const subtitleStyles = {
	color: "#594E4E",
	fontWeight: "bold",
	textTransform: "uppercase",
	textAlign: "center",
	fontSize: {
		xs: "1rem",
		sm: "1.5rem",
	},
};

const headerContainerStyles = {
	display: "flex",
	justifyContent: "center",
	flexDirection: {
		xs: "column",
		md: "row",
	},
};

const pageMainContainerStyles = {
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	width: {
		xs: "100%",
		md: "50%",
	},
	mr: {
		xs: "0",
		md: "3rem",
	},
	alignItems: {
		xs: "center",
		md: "flex-start",
	},
	mb: {
		xs: "3rem",
		sm: "1rem",
		md: "0",
	},
};

const addGroupContainerStyles = {
	height: "23rem",
	maxidth: "100%",
	display: "flex",
	justifyContent: "flex-end",
};

const paragraphStyles = {
	color: "#594E4E",
	mb: "1rem",
};

const HowItWorks = () => {
	return (
		<Box>
			<NavBar />
			<Toolbar />
			<Box sx={paddingStyles}>
				<Box>
					<Typography
						variant="h5"
						gutterBottom
						sx={{ ...subtitleStyles, mb: "3rem" }}
					>
						How It Works
					</Typography>
					<Box sx={headerContainerStyles}>
						<Box sx={pageMainContainerStyles}>
							<Box>
								<Typography variant="body1" sx={paragraphStyles}>
									Dear customer, please note the following terms and conditions
									for our advertisement services:
								</Typography>
								<Typography variant="body1" sx={paragraphStyles}>
									1. You are required to signup and create a profile.
								</Typography>
								<Typography variant="body1" sx={paragraphStyles}>
									2. You are required to verify your contact email address
									during signup.
								</Typography>
								<Typography variant="body1" sx={paragraphStyles}>
									3. Your content(s) will be reviewed and subject to approval.
								</Typography>
								<Typography variant="body1" sx={paragraphStyles}>
									4. Advert fees are non-refundable.
								</Typography>
								<Typography variant="body1" sx={paragraphStyles}>
									5. You can edit advert contents (not location nor position)
									during the advert placement duration subscribed to. Please
									note that all changes will be subject to approval and until
									such approval is given, existing advert content remains
									active.
								</Typography>
								<Typography variant="body1" sx={paragraphStyles}>
									6. By subscribing to our are advert service, you agree to
									Smartdeals' "Terms of Use" and "Privacy Notice".
								</Typography>
							</Box>
						</Box>
						<Box
							sx={{
								width: {
									xs: "100%",
									md: "50%",
								},
							}}
						>
							<Box sx={addGroupContainerStyles}>
								<img src={addGroup} alt="addGroup" width="100%" height="auto" />
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
			<Footer />
		</Box>
	);
};

export default HowItWorks;
