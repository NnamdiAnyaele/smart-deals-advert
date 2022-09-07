import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";

import { ROLES } from "../../utils/constants";

const DesktopProfileMenu = ({ anchorEl, open, handleClose, role }) => {
	return (
		<div>
			{role === ROLES.CUSTOMER && (
				<Menu
					id="deskotp-profile-menu"
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					MenuListProps={{
						"aria-labelledby": "basic-button",
					}}
					sx={{ textAlign: "right" }}
				>
					<MenuItem component={Link} to="/customer/dashboard">
						<Typography
							variant="body2"
							component="div"
							sx={{ textTransform: "capitalize" }}
						>
							dashboard
						</Typography>
					</MenuItem>
					<MenuItem component={Link} to="/customer/advert-history">
						<Typography
							variant="body2"
							component="div"
							sx={{ textTransform: "capitalize" }}
						>
							advert history
						</Typography>
					</MenuItem>
					{/* <MenuItem component={Link} to="/customer/approved-adverts">
						<Typography
							variant="body2"
							component="div"
							sx={{ textTransform: "capitalize" }}
						>
							approved adverts
						</Typography>
					</MenuItem>
					<MenuItem component={Link} to="/customer/paid-adverts">
						<Typography
							variant="body2"
							component="div"
							sx={{ textTransform: "capitalize" }}
						>
							paid adverts
						</Typography>
					</MenuItem> */}
					<MenuItem component={Link} to="/customer/analytics">
						<Typography
							variant="body2"
							component="div"
							sx={{ textTransform: "capitalize" }}
						>
							analytics
						</Typography>
					</MenuItem>
					<MenuItem component={Link} to="/customer/notifications">
						<Typography
							variant="body2"
							component="div"
							sx={{ textTransform: "capitalize" }}
						>
							notifications
						</Typography>
					</MenuItem>
					<MenuItem component={Link} to="/customer/change-password">
						<Typography
							variant="body2"
							component="div"
							sx={{ textTransform: "capitalize" }}
						>
							change password
						</Typography>
					</MenuItem>
					<MenuItem component={Link} to="/logout">
						logout
					</MenuItem>
				</Menu>
			)}
		</div>
	);
};

export default DesktopProfileMenu;
