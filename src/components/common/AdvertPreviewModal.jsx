import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

import adsPreview from "../../assets/images/ad-homepage-positons.png";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "90%",
	maxWidth: "95%",
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
	outline: 0,
	display: "flex",
	justifyContent: "center",
	backgroundColor: "#898989",
};

const adsImageContainer = {
	width: "80vw",
	height: "80vh",
	overflowY: "auto",
};

const AdvertPreviewModal = ({ open, handleClose }) => {
	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Box>
					<Box sx={{ display: "flex", justifyContent: "center", mb: "1rem" }}>
						<IconButton
							onClick={handleClose}
							sx={{ display: "flex", flexWrap: "no-wrap" }}
							disableRipple
							disableFocusRipple
						>
							<CloseIcon sx={{ mr: ".5rem", color: "#fff" }} />
							<Typography variant="body1" sx={{ color: "white" }}>
								close preview
							</Typography>
						</IconButton>
					</Box>
					<Box>
						<Card>
							<Box sx={adsImageContainer}>
								<img
									src={adsPreview}
									alt="advert preview"
									width="100%"
									height="auto"
								/>
							</Box>
						</Card>
					</Box>
				</Box>
			</Box>
		</Modal>
	);
};

export default AdvertPreviewModal;
