import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";

import { logout as adminLogout } from "../../slices/authSlice";
import { ROLES } from "../../utils/constants";

const logouActionObj = {
	[ROLES.ADMIN]: adminLogout,
};

const DesktopProfileMenu = ({ anchorEl, open, handleClose, role }) => {
	const dispatch = useDispatch();

	return (
		<div>
			{role === ROLES.PARTNER && (
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
					<MenuItem component={Link} to="/partner/dashboard">
						<Typography
							variant="body2"
							component="div"
							sx={{ textTransform: "capitalize" }}
						>
							dashboard
						</Typography>
					</MenuItem>
					<MenuItem component={Link} to="/partner/discount-history">
						<Typography
							variant="body2"
							component="div"
							sx={{ textTransform: "capitalize" }}
						>
							discount history
						</Typography>
					</MenuItem>
					<MenuItem component={Link} to="/partner/share-link">
						<Typography
							variant="body2"
							component="div"
							sx={{ textTransform: "capitalize" }}
						>
							share link
						</Typography>
					</MenuItem>
					<MenuItem component={Link} to="/partner/notifications">
						<Typography
							variant="body2"
							component="div"
							sx={{ textTransform: "capitalize" }}
						>
							notifications
						</Typography>
					</MenuItem>
					<MenuItem onClick={() => dispatch(logouActionObj[role]())}>
						logout
					</MenuItem>
				</Menu>
			)}
		</div>
	);
};

export default DesktopProfileMenu;
