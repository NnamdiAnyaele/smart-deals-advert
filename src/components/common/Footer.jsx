import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import AboutFooter from "./AboutFooter";
import InformationFooter from "./InformationFooter";
import OffersFooter from "./OffersFooter";
import SocialsLogo from "./SocialsLogo";
import logo from "../../assets/logos/smart-deals-logo-white.svg";
import twitterLogo from "../../assets/logos/twitter-icon.svg";
import linkedInLogo from "../../assets/logos/linkedin-icon.svg";
import facebookLogo from "../../assets/logos/facebook-icon.svg";
import instagramLogo from "../../assets/logos/instagram-icon.svg";
import mailLogo from "../../assets/logos/mail-icon.svg";
import googlePlayLogo from "../../assets/logos/google-play-badge.png";
import appleStoreLogo from "../../assets/logos/apple-store.png";

const popperItemStyles = {
	textDecoration: "none",
	color: "#fff",
	fontSize: {
		md: "0.8rem",
		xs: "0.7rem",
	},
};

const Footer = ({ display = true }) => {
	return (
		<Box
			sx={{
				display: "flex",
				padding: {
					md: "2rem 3rem 0 3rem",
					xs: "1rem",
				},
				backgroundColor: "#222",
				color: "#fff",
				flexDirection: {
					md: "row",
					xs: "column",
				},
				textAlign: "center",
			}}
		>
			<Box
				sx={{
					width: { md: "75%", xs: "100%" },
					mr: { md: "2rem", xs: 0 },
				}}
			>
				<Grid container>
					<Grid
						item
						xs={12}
						md={3}
						sx={{
							display: "flex",
							justifyContent: "center",
							mb: {
								md: 0,
								xs: "3rem",
							},
						}}
					>
						<Box
							sx={{
								height: "2rem",
								width: "7.9rem",
							}}
						>
							<img src={logo} alt="" height="auto" width="100%" />
						</Box>
					</Grid>

					{display && (
						<>
							<Grid
								item
								xs={12}
								md={3}
								sx={{
									display: "flex",
									justifyContent: "center",
									mb: {
										md: 0,
										xs: "3rem",
									},
								}}
							>
								<AboutFooter styles={popperItemStyles} />
							</Grid>

							<Grid
								item
								xs={12}
								md={3}
								sx={{
									display: "flex",
									justifyContent: "center",
									mb: {
										md: 0,
										xs: "3rem",
									},
								}}
							>
								<InformationFooter styles={popperItemStyles} />
							</Grid>

							<Grid
								item
								xs={12}
								md={3}
								sx={{
									display: "flex",
									justifyContent: "center",
									mb: {
										md: 0,
										xs: "3rem",
									},
								}}
							>
								<OffersFooter styles={popperItemStyles} />
							</Grid>
						</>
					)}
				</Grid>
			</Box>
			<Box
				sx={{
					width: { md: "25%", xs: "100%" },
					textAlign: "start",
				}}
			>
				<Grid
					container
					sx={{
						mb: {
							xs: "1rem",
						},
						display: "flex",
						justifyContent: "center",
					}}
				>
					<Grid
						item
						xs={12}
						sx={{
							paddingBottom: "0.5rem",
							mr: "1rem",
							display: "flex",
							flexDirection: "column",
							alignItems: { xs: "center", md: "flex-start" },
						}}
					>
						<Grid
							sx={{
								fontWeight: "600",
								fontSize: "0.875rem",
								textTransform: "uppercase",
								mb: "0.5rem",
							}}
							item
						>
							socials
						</Grid>
						<Grid item sx={{ mb: "0.5rem" }}>
							<Box sx={{ display: "flex" }}>
								<SocialsLogo logo={twitterLogo} />
								<SocialsLogo logo={linkedInLogo} />
								<SocialsLogo logo={facebookLogo} />
								<SocialsLogo logo={instagramLogo} />
								<SocialsLogo logo={mailLogo} />
							</Box>
						</Grid>

						<Grid item sx={{ mb: "1rem" }}>
							<Box sx={{ height: "2.5rem", width: "8rem" }}>
								<img src={googlePlayLogo} alt="" height="auto" width="100%" />
							</Box>
						</Grid>

						<Grid item>
							<Box sx={{ height: "2.5rem", width: "7rem", ml: "0.6rem" }}>
								<img src={appleStoreLogo} alt="" height="auto" width="100%" />
							</Box>
						</Grid>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default Footer;
