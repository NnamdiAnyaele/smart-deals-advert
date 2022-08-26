import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
// import MuiLink from "@mui/material/Link";
// import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { logout as adminLogout } from "../../slices/authSlice";

import { ROLES } from "../../utils/constants";

const logouActionObj = {
	[ROLES.ADMIN]: adminLogout,
};

const MobileNavLinks = ({
	// handleProfileClick,
	isAuthenticated,
	role,
	isDesktopCountryOpen,
	setDesktopCountryAnchorEl,
	logo,
	toggleFlag,
}) => {
	const dispatch = useDispatch();

	return (
		<div style={{ textAlign: "right" }}>
			{role?.toLowerCase() !== ROLES.ADMIN && (
				<>
					<MenuItem component={Link} to="/how-it-works">
						<Typography
							variant="body2"
							component="div"
							sx={{ textTransform: "capitalize" }}
						>
							How it works
						</Typography>
					</MenuItem>
				</>
			)}
			{!isAuthenticated && (
				<>
					<MenuItem component={Link} to="/login">
						<Typography
							variant="body2"
							component="div"
							sx={{ textTransform: "capitalize" }}
						>
							Login
						</Typography>
					</MenuItem>
					<MenuItem component={Link} to="/signup">
						<Typography
							variant="body2"
							component="div"
							sx={{ textTransform: "capitalize" }}
						>
							Sign Up
						</Typography>
					</MenuItem>
				</>
			)}

			{isAuthenticated && (
				<>
					{role === ROLES.PARTNER && (
						<>
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
							<MenuItem component={Link} to="/partner/change-password">
								<Typography
									variant="body2"
									component="div"
									sx={{ textTransform: "capitalize" }}
								>
									change password
								</Typography>
							</MenuItem>
							<MenuItem onClick={() => dispatch(logouActionObj[role]())}>
								<Typography
									variant="body2"
									component="div"
									sx={{ textTransform: "capitalize" }}
								>
									logout
								</Typography>
							</MenuItem>
						</>
					)}

					{role === ROLES.ADMIN && (
						<>
							<MenuItem component={Link} to="/admin/dashboard">
								<Typography
									variant="body2"
									component="div"
									sx={{ textTransform: "capitalize" }}
								>
									dashboard
								</Typography>
							</MenuItem>
							<MenuItem component={Link} to="/admin/partners">
								<Typography
									variant="body2"
									component="div"
									sx={{ textTransform: "capitalize" }}
								>
									partners
								</Typography>
							</MenuItem>
							<MenuItem component={Link} to="/admin/club-members">
								<Typography
									variant="body2"
									component="div"
									sx={{ textTransform: "capitalize" }}
								>
									Club Memebers
								</Typography>
							</MenuItem>
							<MenuItem component={Link} to="/admin/products">
								<Typography
									variant="body2"
									component="div"
									sx={{ textTransform: "capitalize" }}
								>
									products
								</Typography>
							</MenuItem>
							<MenuItem component={Link} to="/admin/ongoing-deals">
								<Typography
									variant="body2"
									component="div"
									sx={{ textTransform: "capitalize" }}
								>
									Ongoing Deals
								</Typography>
							</MenuItem>
							<MenuItem component={Link} to="/admin/deals-won">
								<Typography
									variant="body2"
									component="div"
									sx={{ textTransform: "capitalize" }}
								>
									Deals Won
								</Typography>
							</MenuItem>
							<MenuItem component={Link} to="/admin/discount-claimed">
								<Typography
									variant="body2"
									component="div"
									sx={{ textTransform: "capitalize" }}
								>
									Discount Claimed
								</Typography>
							</MenuItem>
							<MenuItem component={Link} to="/admin/adverts">
								<Typography
									variant="body2"
									component="div"
									sx={{ textTransform: "capitalize" }}
								>
									adverts
								</Typography>
							</MenuItem>
							<MenuItem component={Link} to="/admin/subscription-plans">
								<Typography
									variant="body2"
									component="div"
									sx={{ textTransform: "capitalize" }}
								>
									Subscription Plans
								</Typography>
							</MenuItem>
							<MenuItem component={Link} to="/admin/user-roles">
								<Typography
									variant="body2"
									component="div"
									sx={{ textTransform: "capitalize" }}
								>
									User Roles
								</Typography>
							</MenuItem>
							<MenuItem component={Link} to="/admin/admin-users">
								<Typography
									variant="body2"
									component="div"
									sx={{ textTransform: "capitalize" }}
								>
									Admin Users
								</Typography>
							</MenuItem>
							<MenuItem component={Link} to="/admin/change-password">
								<Typography
									variant="body2"
									component="div"
									sx={{ textTransform: "capitalize" }}
								>
									Change Password
								</Typography>
							</MenuItem>
							<MenuItem component={Link} to="/admin/notifications">
								<Typography
									variant="body2"
									component="div"
									sx={{ textTransform: "capitalize" }}
								>
									notifications
								</Typography>
							</MenuItem>
							<MenuItem component={Link} to="/admin/activity-log">
								<Typography
									variant="body2"
									component="div"
									sx={{ textTransform: "capitalize" }}
								>
									Activity Log
								</Typography>
							</MenuItem>
							<MenuItem onClick={() => dispatch(logouActionObj[role]())}>
								<Typography
									variant="body2"
									component="div"
									sx={{ textTransform: "capitalize" }}
								>
									logout
								</Typography>
							</MenuItem>
						</>
					)}
				</>
			)}
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					mt: "1rem",
				}}
			>
				<Box
					sx={{ height: "2.3rem", width: "2.3rem" }}
					id="country-selector-mobile"
					aria-controls={
						isDesktopCountryOpen ? "desktop-country-menu" : undefined
					}
					aria-haspopup="true"
					aria-expanded={isDesktopCountryOpen ? "true" : undefined}
					onClick={(event) => {
						if (toggleFlag) {
							setDesktopCountryAnchorEl(event.currentTarget);
						}
					}}
				>
					<img
						src={logo}
						alt="country flag"
						height="100%"
						width="100%"
						style={{ objectFit: "cover", borderRadius: "50%" }}
					/>
				</Box>
			</Box>
		</div>
	);
};

export default MobileNavLinks;
