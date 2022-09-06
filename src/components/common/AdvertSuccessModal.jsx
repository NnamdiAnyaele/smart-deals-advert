import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import closeIcon from "../../assets/icons/close-icon.svg";
import successIcon from "../../assets/icons/deal-success-icon.svg";

const buttonStyles = {
	textTransform: "none",
	mt: "1rem",
};

export default function ResponsiveDialog({ open, handleClose, text }) {
	return (
		<div>
			<Dialog
				open={open}
				onClose={(_, reason) => {
					if (reason !== "backdropClick") {
						handleClose();
					}
				}}
				aria-labelledby="responsive-dialog-title"
				sx={{
					borderRadius: "50px",
					"& .MuiDialog-paper": {
						borderRadius: "50px",
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
				</DialogTitle>
				<DialogContent
					sx={{
						paddingLeft: "2rem",
						paddingRight: "2rem",
						textAlign: "center",
					}}
				>
					<Box
						sx={{
							marginBottom: "2rem",
							width: "30rem",
						}}
					>
						<Box>
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
								}}
							>
								<Box
									sx={{
										height: "7.25rem",
										width: "7.25rem",
										mb: "1rem",
									}}
								>
									<img src={successIcon} alt="" height="100%" width="100%" />
								</Box>
							</Box>
							<Typography
								variant="h6"
								gutterBottom
								component="p"
								sx={{ fontWeight: 700, textAlign: "center" }}
							>
								{text}
							</Typography>
						</Box>

						<Box>
							<Button
								variant="contained"
								sx={buttonStyles}
								color="primary"
								onClick={handleClose}
								fullWidth
							>
								Back to Adverts
							</Button>
						</Box>
					</Box>
				</DialogContent>
			</Dialog>
		</div>
	);
}
