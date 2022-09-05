import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "33rem",
	maxWidth: "95%",
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
	outline: 0,
};

const profileAvatarContainerStyles = {
	width: "10rem",
	height: "10rem",
	mr: "1rem",
	display: "flex",
	alignItems: "center",
};

const profileImageStyles = { objectFit: "cover", borderRadius: "50%" };

const ProfilePictureModal = ({
	open,
	handleClose,
	handleImageSubmit,
	submitLoading,
}) => {
	const { user } = useSelector((state) => state.auth);

	const [profilePicUrl, setProfilePicUrl] = useState("");
	const [profileImage, setProfileImage] = useState("");

	const handleImageChange = (e) => {
		e.preventDefault();

		const reader = new FileReader();
		const file = e.target.files[0];
		if (file.size > 500000) {
			toast.error("file is too large, max size 500kb");
			return;
		}
		reader.onloadend = () => {
			setProfileImage(file);
			setProfilePicUrl(reader.result);
		};

		reader.readAsDataURL(file);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!profileImage) {
			toast.error("Please select a file to upload");
			return;
		}
		const formData = new FormData();
		formData.append("username", user?.username);
		formData.append("files", profileImage);
		formData.append("region", user?.region);

		await handleImageSubmit(formData);
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Typography
					id="modal-modal-title"
					variant="h6"
					component="h1"
					sx={{
						textAlign: "center",
						textTransform: "capitalize",
						fontWeight: "bold",
					}}
					color="primary"
				>
					Add Profile Photo
				</Typography>
				<Box
					component="form"
					noValidate
					autoComplete="off"
					onSubmit={handleSubmit}
				>
					<label
						htmlFor="photo-upload"
						className="custom-file-upload fas"
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Box
							sx={{
								height: "11rem",
								width: "11rem",
								marginBottom: "1.1875rem",
								position: "relative",
							}}
						>
							{!profilePicUrl && !user?.partnerLogo && (
								<AccountCircleIcon color="primary" sx={{ fontSize: "11rem" }} />
							)}
							{!profilePicUrl && user?.partnerLogo && (
								<Box sx={profileAvatarContainerStyles}>
									<img
										src={user?.partnerLogo}
										alt="avatar"
										width="100%"
										height="100%"
										style={profileImageStyles}
									/>
								</Box>
							)}
							{profilePicUrl && (
								<img
									alt="upload"
									src={profilePicUrl}
									height="100%"
									width="100%"
									style={{ objectFit: "cover", borderRadius: "50%" }}
								/>
							)}
							<input
								id="photo-upload"
								type="file"
								style={{ opacity: 0 }}
								onChange={handleImageChange}
								accept="image/*"
							/>
						</Box>
					</label>
					<Typography
						id="modal-modal-description"
						sx={{ mt: 2, textAlign: "center" }}
					>
						Click on the avatar to select a new picture(max size: 500kb)
					</Typography>
					<Stack
						direction={{ md: "row", xs: "column" }}
						spacing={2}
						sx={{
							marginTop: "1rem",
							marginBottom: "1rem",
							display: "flex",
							justifyContent: "center",
						}}
					>
						<Button
							sx={{
								paddingLeft: "2rem",
								paddingRight: "2rem",
							}}
							variant="contained"
							type="submit"
						>
							{submitLoading ? (
								<CircularProgress size="1.5rem" sx={{ color: "#fff" }} />
							) : (
								"update"
							)}
						</Button>
						<Button
							sx={{
								paddingLeft: "2rem",
								paddingRight: "2rem",
							}}
							variant="outlined"
							color="error"
							onClick={handleClose}
						>
							close
						</Button>
					</Stack>
				</Box>
			</Box>
		</Modal>
	);
};

export default ProfilePictureModal;
