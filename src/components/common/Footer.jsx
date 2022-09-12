import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import SocialsLogo from "./SocialsLogo";
// import logo from "../../assets/logos/smart-deals-logo-white.svg";
import twitterLogo from "../../assets/logos/twitter-icon.svg";
import linkedInLogo from "../../assets/logos/linkedin-icon.svg";
import facebookLogo from "../../assets/logos/facebook-icon.svg";
import instagramLogo from "../../assets/logos/instagram-icon.svg";
// import mailLogo from "../../assets/logos/mail-icon.svg";
import googlePlayLogo from "../../assets/logos/google-play-badge.png";
import appleStoreLogo from "../../assets/logos/apple-store.png";
import TermsModal from "./TermsModal";

const style = {
	position: "sticky",
	top: "100vh",
	width: "100%",
	padding: {
		xs: "1rem",
	},
	backgroundColor: "#222",
	color: "#fff",
	textAlign: "center",
};

const mainContainerStyles = {
	display: "flex",
	flexDirection: { xs: "column", md: "row" },
	justifyContent: { md: "center", xs: "flex-start" },
	alignItems: "center",
	mb: "0.5rem",
};

const termsContainerStyles = { mr: "1rem", mb: { xs: "0.5rem", md: 0 } };

const socialsStyles = {
	display: "flex",
	mr: { md: "1rem", xs: 0 },
	mb: { xs: "0.5rem", md: 0, justifyContent: "center" },
};

const appsContainerStyles = { display: "flex", alignItems: "center" };

const buttonStyles = {
	color: "#fff",
	fontSize: {
		md: "0.8rem",
		xs: "0.7rem",
	},
	textTransform: "none",
};

const Footer = () => {
	const [openTermsModal, setOpenTermsModal] = useState(false);
	const [openPolicyModal, setOpenPolicyModal] = useState(false);

	return (
		<Box sx={style}>
			<Box sx={mainContainerStyles}>
				<Box sx={termsContainerStyles}>
					<Button
						variant="text"
						sx={buttonStyles}
						onClick={() => setOpenTermsModal(true)}
					>
						Terms and conditions
					</Button>
					{" | "}
					<Button
						variant="text"
						sx={buttonStyles}
						onClick={() => setOpenPolicyModal(true)}
					>
						Privacy Policy
					</Button>
				</Box>

				<Box sx={socialsStyles}>
					<SocialsLogo logo={facebookLogo} />
					<SocialsLogo logo={twitterLogo} />
					<SocialsLogo logo={instagramLogo} />
					<SocialsLogo logo={linkedInLogo} />
				</Box>

				<Box sx={appsContainerStyles}>
					<Box sx={{ height: "2.5rem", width: "7rem" }}>
						<img src={googlePlayLogo} alt="" height="100%" width="100%" />
					</Box>
					<Box sx={{ height: "1.7rem", width: "7rem", ml: "0.6rem" }}>
						<img src={appleStoreLogo} alt="" height="100%" width="100%" />
					</Box>
				</Box>
			</Box>

			<Box>
				<Typography variant="body2">
					© 2022 Smart Deals. All rights reserved.
				</Typography>
			</Box>

			<TermsModal
				open={openTermsModal}
				handleClose={() => setOpenTermsModal(false)}
				title="Terms and Conditions"
				file="https://doc.smartdeals.com.ng/files/admin/terms.pdf"
			/>

			<TermsModal
				open={openPolicyModal}
				handleClose={() => setOpenPolicyModal(false)}
				title="Privacy Policy"
				file="https://doc.smartdeals.com.ng/files/admin/privacy.pdf"
			/>
		</Box>
	);
};

export default Footer;
