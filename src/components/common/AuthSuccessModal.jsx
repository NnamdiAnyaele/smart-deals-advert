import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import MarkunreadIcon from "@mui/icons-material/Markunread";

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

const iconStyles = {
	fontSize: "5rem",
};

const subtitleStyles = {
	color: "#5F5F5F",
	mb: "1rem",
};

const buttonStyles = {
	textTransform: "none",
};

export default function BasicModal({ open, handleClose, title, subtitle }) {
	const navigate = useNavigate();
	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<MarkunreadIcon sx={iconStyles} />
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
			</Modal>
		</div>
	);
}
