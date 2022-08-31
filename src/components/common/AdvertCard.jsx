import { useState } from "react";
import Box from "@mui/material/Box";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
// import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { dateTimeFormatter } from "../../utils/helpers/functions";

const advertCardStyles = {
	width: "17.5rem",
	height: "17.5rem",
	maxWidth: "17.5rem",
	maxHeight: "17.5rem",
};

const flexContainer = {
	width: "17.5rem",
	display: "flex",
	justifyContent: "flex-end",
	mb: "0.5rem",
};

const AdvertCard = ({
	image,
	setSelectedItem,
	handleView,
	// handleEdit,
	handleDelete,
	expiryDate,
}) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box>
			<Card>
				<Box sx={flexContainer}>
					<IconButton
						onClick={(event) => {
							setSelectedItem();
							handleClick(event);
						}}
					>
						<MoreVertIcon />
					</IconButton>
				</Box>
				<Box sx={advertCardStyles}>
					<img src={image} alt="advert" width="100%" height="auto" />
				</Box>
			</Card>
			<Menu
				id="handle-activate-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "handle-activate-button",
				}}
			>
				<MenuItem
					onClick={() => {
						handleClose();
						handleView();
					}}
				>
					<VisibilityOutlinedIcon sx={{ mr: "0.5rem", fontSize: "1rem" }} />
					<Typography variant="body2">View</Typography>
				</MenuItem>

				{/* <MenuItem
					onClick={() => {
						handleEdit();
						handleClose();
					}}
					sx={{ color: "#fab37a" }}
				>
					<EditIcon sx={{ mr: "0.5rem", fontSize: "1rem" }} />
					<Typography variant="body2">Edit</Typography>
				</MenuItem> */}

				{expiryDate && new Date() > dateTimeFormatter(expiryDate) && (
					<MenuItem
						onClick={() => {
							handleDelete();
							handleClose();
						}}
						sx={{ color: "#f00" }}
					>
						<DeleteForeverIcon sx={{ mr: "0.5rem", fontSize: "1rem" }} />
						<Typography variant="body2">Delete</Typography>
					</MenuItem>
				)}
			</Menu>
		</Box>
	);
};

export default AdvertCard;
