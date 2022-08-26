import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import { dateTimeFormatter } from "../../utils/helpers/functions";

const flexContainer = {
	display: "flex",
	alignItems: "center",
};

const NotificationDiv = ({
	notification,
	handleNotificationDelete,
	handleNotificationRead,
}) => {
	return (
		<Box
			sx={{
				border:
					Number(notification?.status) === 0 ? "1px solid #E6E6E6" : "none",
				p: { md: "1rem 2rem", xs: "0.3rem 0.5rem" },
				mb: "1rem",
				backgroundColor:
					Number(notification?.status) === 1 ? "#FAE4D2" : "#fff",
				borderRadius: "5px",
			}}
		>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					mb: "1rem",
					flexDirection: { sm: "row", xs: "column" },
				}}
			>
				<Typography
					variant="body2"
					sx={{ fontWeight: 500, textTransform: "capitalize" }}
				>
					{notification.title}
				</Typography>
				<Box sx={flexContainer}>
					<Typography variant="body2" sx={{ textTransform: "none" }}>
						{dateTimeFormatter(notification.createDate)}
					</Typography>
					<IconButton onClick={() => handleNotificationDelete(notification)}>
						<DeleteIcon color="error" />
					</IconButton>
				</Box>
			</Box>
			<Typography
				variant="body2"
				sx={{ textAlign: { sm: "left", xs: "center" } }}
				onClick={() => handleNotificationRead()}
			>
				{notification.message}
			</Typography>
		</Box>
	);
};

export default NotificationDiv;
