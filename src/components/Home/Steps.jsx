import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import stepOne from "../../assets/logos/step-one.svg";
import stepTwo from "../../assets/logos/step-two.svg";
import stepThree from "../../assets/logos/step-three.svg";

const steps = () => {
	return (
		<Box sx={{ textAlign: "center", mb: { md: "4rem", xs: "1rem" } }}>
			<Typography
				variant="h5"
				gutterBottom
				component="div"
				sx={{
					fontWeight: 700,
					mb: "3rem",
					fontSize: {
						xs: "1rem",
						sm: "1.5rem",
					},
				}}
			>
				IN 3 SIMPLE STEPS
			</Typography>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: { md: "row", xs: "column" },
				}}
			>
				<Box sx={{ width: "20rem" }}>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							mb: "0.5rem",
						}}
					>
						<Box sx={{ height: "7.5rem", width: "7.5rem" }}>
							<img src={stepOne} alt="" />
						</Box>
					</Box>
					<Typography variant="body1" sx={{ fontWeight: 500 }} gutterBottom>
						Select advert type
					</Typography>
					<Typography variant="body2" gutterBottom>
						Subscribe to a smartdeals discount club membership
					</Typography>
				</Box>
				<Box sx={{ width: "20rem", margin: { md: "0 4rem", xs: "1rem 0" } }}>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							mb: "0.5rem",
						}}
					>
						<Box sx={{ height: "7.5rem", width: "7.5rem" }}>
							<img src={stepTwo} alt="" />
						</Box>
					</Box>
					<Typography variant="body1" sx={{ fontWeight: 500 }} gutterBottom>
						Upload advert
					</Typography>
					<Typography variant="body2" gutterBottom>
						Upload your advert and select your date and time
					</Typography>
				</Box>
				<Box sx={{ width: "20rem" }}>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							mb: "0.5rem",
						}}
					>
						<Box sx={{ height: "7.5rem", width: "7.5rem" }}>
							<img src={stepThree} alt="" />
						</Box>
					</Box>
					<Typography variant="body1" sx={{ fontWeight: 500 }} gutterBottom>
						Pay
					</Typography>
					<Typography variant="body2" gutterBottom>
						Proceed to payment and then start seeing your advert
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export default steps;
