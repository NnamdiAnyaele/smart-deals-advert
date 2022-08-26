import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import partnerOne from "../../assets/logos/partner-one.svg";
import partnerTwo from "../../assets/logos/partner-two.svg";
import partnerThree from "../../assets/logos/partner-three.svg";
import partnerFour from "../../assets/logos/partner-four.svg";
import partnerFive from "../../assets/logos/partner-five.svg";
import partnerSix from "../../assets/logos/partner-six.svg";
import partnerSeven from "../../assets/logos/partner-seven.svg";
import partnerEight from "../../assets/logos/partner-eight.svg";

const Partners = () => {
	return (
		<Box sx={{ textAlign: "center", mb: { md: "4rem", xs: "1rem" } }}>
			<Typography
				variant="h5"
				gutterBottom
				component="div"
				sx={{
					fontWeight: 700,
					mb: "3rem",
					color: "#594E4E",
					fontSize: {
						xs: "1rem",
						sm: "1.5rem",
					},
				}}
			>
				SEE OUR TOP PARTNERS
			</Typography>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					mb: { md: "3rem", xs: 0 },
				}}
			>
				<Grid container>
					<Grid
						item
						xs={12}
						sm={6}
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
								height: "2.9rem",
								width: "13rem",
							}}
						>
							<img src={partnerOne} alt="" height="auto" width="100%" />
						</Box>
					</Grid>
					<Grid
						item
						xs={12}
						sm={6}
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
								height: "2.9rem",
								width: "13rem",
							}}
						>
							<img src={partnerTwo} alt="" height="auto" width="100%" />
						</Box>
					</Grid>
					<Grid
						item
						xs={12}
						sm={6}
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
								height: "2.9rem",
								width: "13rem",
							}}
						>
							<img src={partnerThree} alt="" height="auto" width="100%" />
						</Box>
					</Grid>
					<Grid
						item
						xs={12}
						sm={6}
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
								height: "2.9rem",
								width: "13rem",
							}}
						>
							<img src={partnerFour} alt="" height="auto" width="100%" />
						</Box>
					</Grid>
				</Grid>
			</Box>
			{/* second level */}
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
				}}
			>
				<Grid container>
					<Grid
						item
						xs={12}
						sm={6}
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
								height: "2.9rem",
								width: "13rem",
							}}
						>
							<img src={partnerFive} alt="" height="auto" width="100%" />
						</Box>
					</Grid>
					<Grid
						item
						xs={12}
						sm={6}
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
								height: "2.9rem",
								width: "13rem",
							}}
						>
							<img src={partnerSix} alt="" height="auto" width="100%" />
						</Box>
					</Grid>
					<Grid
						item
						xs={12}
						sm={6}
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
								height: "2.9rem",
								width: "13rem",
							}}
						>
							<img src={partnerSeven} alt="" height="auto" width="100%" />
						</Box>
					</Grid>
					<Grid
						item
						xs={12}
						sm={6}
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
								height: "2.9rem",
								width: "13rem",
							}}
						>
							<img src={partnerEight} alt="" height="auto" width="100%" />
						</Box>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default Partners;
