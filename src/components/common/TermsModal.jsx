import FileViewer from "react-file-viewer";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: { xs: "90%", md: "60%" },
	maxWidth: "90%",
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
	outline: 0,
	maxHeight: "90%",
	overflowY: "auto",
	"&::-webkit-scrollbar": {
		width: 0,
	},
};

const titleStyles = {
	textAlign: "center",
	fontWeight: "bold",
	// position: "absolute",
	// top: 0,
};

const type = "pdf";

const CustomErrorComponent = () => <div>Error loading document</div>;

export default function BasicModal({ open, handleClose, title, file }) {
	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Box>
						<Box>
							<Typography
								// id="modal-modal-title"
								variant="h5"
								component="h2"
								sx={titleStyles}
								guttterBottom
							>
								{title}
							</Typography>
							<Divider />
						</Box>
						<Box>
							<FileViewer
								fileType={type}
								filePath={file}
								errorComponent={CustomErrorComponent}
								onError={() => toast.error("Error loading document")}
								style={{ height: "100%", width: "100%", padding: 0 }}
							/>
						</Box>
					</Box>
				</Box>
			</Modal>
		</div>
	);
}
