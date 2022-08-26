import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import successIcon from "../../assets/icons/deal-success-icon.svg";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "33rem",
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
	textAlign: "center",
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	color: "#594E4E",
	outline: 0,
};

const subtitleStyles = {
	color: "#5F5F5F",
	mb: "1rem",
};

const buttonStyles = {
	textTransform: "none",
	width: "100%",
};

const ForgotPasswordModal = ({ open, handleClose, title, subtitle }) => {
	const navigate = useNavigate();
	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Box
						sx={{
							height: "7.25rem",
							width: "7.25rem",
							mb: "1rem",
							display: "flex",
							justifyContent: "center",
						}}
					>
						<img src={successIcon} alt="" height="100%" width="100%" />
					</Box>

					<Typography id="modal-modal-title" variant="body1" component="h2">
						{title}
					</Typography>
					<Typography id="modal-modal-description" sx={subtitleStyles}>
						{subtitle}
					</Typography>

					<Box sx={{ width: "100%" }}>
						<Button
							variant="contained"
							color="primary"
							onClick={() =>
								navigate("/login", { state: { noDisplayModal: true } })
							}
							sx={buttonStyles}
							fullWidth
						>
							Go to Login
						</Button>
					</Box>
				</Box>
			</Box>
		</Modal>
	);
};

export default ForgotPasswordModal;
