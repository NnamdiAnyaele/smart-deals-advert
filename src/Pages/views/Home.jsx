import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";

import NavBar from "../../components/Home/NavBar";
import WhyUse from "../../components/Home/WhyUse";
import Steps from "../../components/Home/Steps";
import Footer from "../../components/common/Footer";
import addGroup from "../../assets/images/add-group.png";
import whyUseLogo1 from "../../assets/icons/why-use-logo-1.png";
import whyUseLogo2 from "../../assets/icons/why-use-logo-2.png";
import whyUseLogo3 from "../../assets/icons/why-use-logo-3.png";
import whyUseLogo4 from "../../assets/icons/why-use-logo-4.png";

const style = {
	minHeight: "100vh",
};

const mainContainerStyles = {
	backgroundColor: "#fff",
};

const paddingStyles = {
	padding: {
		md: "3rem",
		sm: "3rem 1rem",
		xs: "3rem 1rem",
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

const pageTitleContainerStyles = {
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	height: { md: "23rem", xs: "auto" },
	width: {
		xs: "100%",
		md: "50%",
	},
	mr: {
		xs: "0",
		md: "1rem",
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

const titleStyles = {
	color: "#594E4E",
	fontWeight: "bold",
	fontSize: {
		xs: "2.5rem",
		sm: "3.5rem",
	},
	mb: "2rem",
	textAlign: {
		xs: "center",
		md: "left",
	},
};

const addGroupContainerStyles = {
	height: "23rem",
	maxWidth: "644px",
	display: "flex",
	justifyContent: { xs: "center", md: "flex-end" },
};

const titletButtonStyles = {
	textTransform: "capitalize",
	marginleft: "1rem",
	whiteSpace: "nowrap",
};

const whyUseBackgroundStyles = {
	backgroundColor: "#fff",
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

const whyUseFlexContainerStyles = {
	display: "flex",
	flexDirection: { xs: "column", md: "row" },
	justifyContent: "center",
	mb: {
		md: "2rem",
		xs: 0,
	},
};

const whyUseContainerStyles = {
	width: {
		xs: "100%",
		md: "50%",
	},
	mr: {
		xs: 0,
		md: "1rem",
	},
	"&:last-child": {
		mr: 0,
	},
};

const Home = () => {
	return (
		<Box sx={style}>
			<NavBar />
			<Toolbar />
			<Box sx={mainContainerStyles}>
				<Box sx={paddingStyles}>
					<Box sx={headerContainerStyles}>
						<Box sx={pageTitleContainerStyles}>
							<Typography variant="h2" component="h1" sx={titleStyles}>
								Have a product or service to sell?{" "}
								<Button
									variant="contained"
									color="primary"
									sx={titletButtonStyles}
									component={Link}
									to="/signup"
								>
									get started
								</Button>
							</Typography>
						</Box>
						<Box
							sx={{
								width: {
									xs: "100%",
									md: "50%",
								},
								display: "flex",
								justifyContent: { xs: "center", md: "flex-end" },
							}}
						>
							<Box sx={addGroupContainerStyles}>
								<img src={addGroup} alt="addGroup" width="100%" height="auto" />
							</Box>
						</Box>
					</Box>
				</Box>
				<Box sx={{ ...paddingStyles, ...whyUseBackgroundStyles }}>
					<Typography
						variant="h5"
						gutterBottom
						sx={{ ...subtitleStyles, mb: "3rem" }}
					>
						why use our advert platform
					</Typography>

					<Box>
						<Box sx={whyUseFlexContainerStyles}>
							<Box sx={whyUseContainerStyles}>
								<WhyUse logo={whyUseLogo1} />
							</Box>
							<Box sx={whyUseContainerStyles}>
								<WhyUse logo={whyUseLogo2} />
							</Box>
						</Box>
						<Box sx={whyUseFlexContainerStyles}>
							<Box sx={whyUseContainerStyles}>
								<WhyUse logo={whyUseLogo3} />
							</Box>
							<Box sx={whyUseContainerStyles}>
								<WhyUse logo={whyUseLogo4} />
							</Box>
						</Box>
					</Box>
				</Box>

				<Box sx={paddingStyles}>
					<Steps />
				</Box>
			</Box>
			<Footer />
		</Box>
	);
};

export default Home;
