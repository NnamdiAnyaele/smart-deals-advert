import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

import { currencySymbolMap } from "../../utils/constants";
import { numberFormatter, dateFormatter } from "../../utils/helpers/functions";
import closeIcon from "../../assets/icons/close-icon.svg";
import logo from "../../assets/logos/smart-deals-logo.svg";

const advertCardStyles = {
	width: "18.5rem",
	maxWidth: "18.5rem",
};

const flexContainer = {
	display: "flex",
	justifyContent: "flex-end",
	mb: "1rem",
};

export default function ResponsiveDialog({
	open,
	handleClose,
	title,
	subtitle,
	data,
}) {
	const { user } = useSelector((state) => state.auth);
	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
				sx={{
					borderRadius: "50px",
					"& .MuiDialog-paper": {
						borderRadius: "50px",
						maxWidth: "60rem",
					},
				}}
			>
				<DialogTitle id="responsive-dialog-title">
					<Box
						sx={{
							display: "flex",
							justifyContent: "flex-end",
						}}
					>
						<Button
							variant="text"
							sx={{ height: "3rem", width: "3rem" }}
							onClick={handleClose}
							endIcon={
								<img
									src={closeIcon}
									height="100%"
									width="100%"
									alt="close modal"
								/>
							}
						/>
					</Box>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Box sx={{ height: "5.25rem" }}>
							<img
								src={logo}
								height="100%"
								width="auto"
								alt="Cardinalstone logo"
							/>
						</Box>
						<Typography
							variant="h6"
							component="div"
							sx={{ color: "primary.main", fontWeight: 700 }}
						>
							{title}
						</Typography>
						<Typography
							variant="h6"
							gutterBottom
							component="div"
							sx={{ color: "primary.main", fontWeight: 700 }}
						>
							{subtitle}
						</Typography>
					</Box>
				</DialogTitle>
				<DialogContent
					sx={{
						paddingLeft: "2rem",
						paddingRight: "2rem",
						display: "flex",
						justifyContent: "center",
					}}
				>
					<Box
						sx={{
							margin: {
								md: "1rem 2rem",
								xs: "1rem",
							},
						}}
					>
						<Box sx={flexContainer}>
							<Typography
								sx={{
									color: "#fff",
									backgroundColor:
										Number(data?.status) === 1 ? "#00C96C" : "#f00",
									p: "0.5rem",
									borderRadius: "0.5rem",
								}}
								variant="body2"
								gutterBottom
							>
								{Number(data?.status) === 1 ? "Activated" : "Not Activated"}
							</Typography>
						</Box>
						<Box
							sx={{
								display: "flex",
								flexDirection: {
									md: "row",
									xs: "column",
								},
								mb: { md: "3rem", xs: "1rem" },
								width: "40rem",
							}}
						>
							<Box
								sx={{
									width: { md: "50%", xs: "100%" },
									marginRight: {
										md: "3rem",
										xs: "1rem",
									},
								}}
							>
								<Card>
									<Box sx={advertCardStyles}>
										<img
											src={data?.file}
											alt="advert"
											style={{
												width: "auto",
												height: "auto",
												maxWidth: "100%",
												maxHeight: "100%",
											}}
										/>
									</Box>
								</Card>
							</Box>
							<Box
								sx={{
									width: { md: "50%", xs: "100%" },
									color: "#594E4E",
								}}
							>
								<Typography
									variant="body1"
									sx={{ fontWeight: "bold" }}
									gutterBottom
								>
									{data?.productName}
								</Typography>

								<Box sx={{ display: "flex" }}>
									<Box
										sx={{
											padding: "0.5rem",
											"&:hover": { backgroundColor: "#eee" },
										}}
									>
										<Typography sx={{ fontSize: "0.8rem" }} variant="body2">
											Unit Amount
										</Typography>
										<Typography variant="body1">
											{`${currencySymbolMap[user.region]} ${numberFormatter(
												data?.unitAmount
											)}`}
										</Typography>
									</Box>
									<Box
										sx={{
											padding: "0.5rem",
											"&:hover": { backgroundColor: "#eee" },
										}}
									>
										<Typography sx={{ fontSize: "0.8rem" }} variant="body2">
											Amount
										</Typography>
										<Typography
											variant="body1"
											color="secondary"
											sx={{ fontSize: "0.9rem", fontWeight: 700 }}
										>
											{`${currencySymbolMap[user.region]} ${numberFormatter(
												data?.amount
											)}`}
										</Typography>
									</Box>
									<Box
										sx={{
											padding: "0.5rem",
											"&:hover": { backgroundColor: "#eee" },
										}}
									>
										<Typography sx={{ fontSize: "0.8rem" }} variant="body2">
											Amount Paid
										</Typography>
										<Typography
											variant="body1"
											color="primary"
											sx={{ fontSize: "0.9rem", fontWeight: 700 }}
										>
											{`${currencySymbolMap[user.region]} ${numberFormatter(
												data?.paid
											)}`}
										</Typography>
									</Box>
								</Box>

								<Box sx={{ p: "0.5rem" }}>
									<Typography
										sx={{ color: "#5F5F5F" }}
										variant="body2"
										gutterBottom
									>
										Date Paid: {dateFormatter(data?.paidDate) || "N/A"}
									</Typography>
									<Typography
										sx={{ color: "#5F5F5F" }}
										variant="body2"
										gutterBottom
									>
										Position: {data?.position || "N/A"}
									</Typography>
									<Typography
										sx={{ color: "#5F5F5F" }}
										variant="body2"
										gutterBottom
									>
										Days: {data?.days || "N/A"}
									</Typography>
									<Typography
										sx={{ color: "#5F5F5F" }}
										variant="body2"
										gutterBottom
									>
										Expiry Date: {dateFormatter(data?.expiryDate) || "N/A"}
									</Typography>
								</Box>
							</Box>
						</Box>
					</Box>
				</DialogContent>
			</Dialog>
		</div>
	);
}
