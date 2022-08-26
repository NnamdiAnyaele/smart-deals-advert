import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";

import { dateTimeFormatter } from "../../utils/helpers/functions";
import closeIcon from "../../assets/icons/close-icon.svg";

export default function ResponsiveDialog({
	open,
	handleClose,
	title,
	message,
	date,
}) {
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
						display: "flex",
						justifyContent: "center",
					}}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							marginBottom: "2rem",
							width: "30rem",
						}}
					>
						<Box
							sx={{
								mb: "1rem",
							}}
						>
							<NotificationsActiveOutlinedIcon
								color="primary"
								sx={{ fontSize: "12rem" }}
							/>
						</Box>
						<Typography
							variant="h6"
							gutterBottom
							component="p"
							sx={{ fontWeight: 700, textAlign: "center" }}
						>
							{title}
						</Typography>
						<Typography
							variant="body1"
							gutterBottom
							component="p"
							sx={{ fontWeight: 400, textAlign: "center" }}
						>
							{message}
						</Typography>
						<Typography
							variant="body1"
							gutterBottom
							component="p"
							sx={{ fontWeight: 400, textAlign: "center" }}
						>
							Date: {dateTimeFormatter(date)}
						</Typography>
					</Box>
				</DialogContent>
			</Dialog>
		</div>
	);
}
