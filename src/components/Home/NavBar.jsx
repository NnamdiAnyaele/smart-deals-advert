import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Typography from "@mui/material/Typography";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

import NavLinks from "../common/NavLinks";
import MobileNavLinks from "../common/MobileNavLinks";
import DesktopCountryMenu from "../common/DestopCountryMenu";
import DesktopProfileMenu from "./DesktopProfileMenu";
import logo from "../../assets/logos/smart-deals-logo.svg";
import userIcon from "../../assets/icons/user.svg";
import { setRegion } from "../../slices/authSlice";
import { getCountry } from "../../api/common/location";
import { fetchUnreadNotifications } from "../../api/common/notifications";
import { ROLES } from "../../utils/constants";

const appBarStyles = {
	backgroundColor: "#fff",
	color: "#594e4e",
	zIndex: 1201,
};

export default function ElevateAppBar({
	showNav = false,
	openDrawer,
	toggleDrawer,
	toggleFlag = false,
}) {
	const dispatch = useDispatch();
	const { region, role, isAuthenticated, user, bizFrom } = useSelector(
		(state) => state.auth
	);
	const navigate = useNavigate();

	const [desktopCountryAnchorEl, setDesktopCountryAnchorEl] = useState(null);
	// const [mobileCountryAnchorEl, setMobileCountryAnchorEl] = useState(null);
	const [anchorEl, setAnchorEl] = useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
	const [desktopProfileAnchorEl, setDesktopProfileAnchorEl] = useState(null);
	const [countrySearch, setCountrySearch] = useState("");

	const isDesktopCountryOpen = Boolean(desktopCountryAnchorEl);
	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
	const isdesktopPorfileMenuOpen = Boolean(desktopProfileAnchorEl);
	// const isTabNineOpen = Boolean(tabsAnchorElNine);
	const [displayedCountries, setDisplayedCountries] = useState([]);

	const handleDesktopCountryClose = () => {
		setDesktopCountryAnchorEl(null);
	};

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const {
		data: countriesData = [],
		isLoading: countriesLoading,
		isError: fetchCountriesError,
		error: fetchCountriesErrorMessage,
	} = useQuery(["get-country"], async () => getCountry(), {
		select: (data) => data.filter((country) => country.list),
		staleTime: 4 * 60 * 1000,
	});

	const {
		data: notificationsData = 0,
		isError: notificationsError,
		error: notificationsErrorMessage,
	} = useQuery(
		[
			"get-notifications-summary",
			user.username,
			user.region,
			bizFrom,
			user.role,
		],
		async () =>
			fetchUnreadNotifications(user.username, user.region, bizFrom, role),
		{
			select: (data) => data?.data,
			staleTime: 4 * 60 * 1000,
			enabled:
				Boolean(user.region) &&
				Boolean(user.username) &&
				Boolean(bizFrom) &&
				Boolean(role) &&
				Boolean(isAuthenticated),
		}
	);

	useEffect(() => {
		if (fetchCountriesError) {
			if (fetchCountriesErrorMessage.response) {
				toast.error(fetchCountriesErrorMessage.response.data?.message);
			} else if (fetchCountriesErrorMessage.request) {
				toast.error("Internal Server Error");
			} else {
				toast.error("Error", fetchCountriesErrorMessage.message);
			}
		}
		if (notificationsError) {
			if (notificationsErrorMessage.response) {
				toast.error(notificationsErrorMessage.response.data?.message);
			} else if (notificationsErrorMessage.request) {
				toast.error("Internal Server Error");
			} else {
				toast.error("Error", notificationsErrorMessage.message);
			}
		}
	}, [
		fetchCountriesError,
		fetchCountriesErrorMessage,
		notificationsError,
		notificationsErrorMessage,
	]);

	useEffect(() => {
		if (countriesData?.length > 0) {
			setDisplayedCountries(countriesData);
		}
	}, [countriesData, countriesLoading]);

	useEffect(() => {
		if (countrySearch) {
			const filteredCountries = countriesData.filter((country) =>
				country.name?.toLowerCase().includes(countrySearch.toLowerCase())
			);
			setDisplayedCountries(filteredCountries);
		} else {
			setDisplayedCountries(countriesData);
		}
	}, [countrySearch]);

	const menuId = "primary-search-account-menu";
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
			<MenuItem onClick={handleMenuClose}>My account</MenuItem>
		</Menu>
	);

	const mobileMenuId = "primary-search-account-menu-mobile";
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MobileNavLinks
				handleProfileClick={handleProfileMenuOpen}
				isDesktopCountryOpen={isDesktopCountryOpen}
				setDesktopCountryAnchorEl={setDesktopCountryAnchorEl}
				logo={region.region_logo}
				isAuthenticated={isAuthenticated}
				role={role}
				toggleFlag={toggleFlag}
				handleMobileMenuClose={handleMobileMenuClose}
			/>
		</Menu>
	);

	const handleBadgeIconClick = () => {
		if (role === ROLES.CUSTOMER) {
			navigate("/customer/notifications");
		}
	};

	return (
		<ClickAwayListener onClickAway={handleDesktopCountryClose}>
			<Box>
				<CssBaseline />
				{/* <ElevationScroll {...props}> */}
				<Box sx={{ flexGrow: 1 }}>
					<AppBar sx={appBarStyles} elevation={0}>
						<Toolbar>
							<IconButton
								size="large"
								edge="start"
								color="inherit"
								aria-label="open drawer"
								sx={{ mr: 2 }}
								component={Link}
								to="/"
								disableRipple
							>
								<Box sx={{ height: "2rem" }}>
									<img
										src={logo}
										height="100%"
										width="100%"
										alt="Smart Deals Logo"
									/>
								</Box>
							</IconButton>
							{isAuthenticated && toggleDrawer && (
								<IconButton
									onClick={() => toggleDrawer(!openDrawer)}
									sx={{
										color: "#000",
										display: {
											xs: "none",
											md: "flex",
										},
									}}
								>
									<MenuIcon />
								</IconButton>
							)}
							<Box sx={{ flexGrow: 1 }} />
							{role !== ROLES.ADMIN && (
								<Box sx={{ display: { xs: "none", md: "flex" }, mr: "1rem" }}>
									<NavLinks />
								</Box>
							)}
							{isAuthenticated && (
								<Box
									sx={{
										display: { xs: "none", md: "flex" },
										mr: "1rem",
										alignItems: "center",
									}}
								>
									<Badge
										badgeContent={notificationsData || 0}
										color="secondary"
										sx={{ mr: "2rem" }}
										onClick={() => handleBadgeIconClick()}
									>
										<NotificationsNoneOutlinedIcon color="action" />
									</Badge>

									<Box
										sx={{ display: "flex", alignItems: "center" }}
										id="desktop-profile-menu-anchor"
										aria-controls={
											isdesktopPorfileMenuOpen
												? "desktop-profile-menu-anchor"
												: undefined
										}
										aria-haspopup="true"
										aria-expanded={
											isdesktopPorfileMenuOpen ? "true" : undefined
										}
										onClick={(event) =>
											setDesktopProfileAnchorEl(event.currentTarget)
										}
									>
										<Box
											sx={{
												height: "2.25rem",
												width: "2.25rem",
												backgroundColor: user?.partnerLogo ? "#fff" : "#594E4E",
												borderRadius: "50%",
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
												mr: "0.5rem",
												border: "1px solid #594E4E",
											}}
										>
											<Box sx={{ height: "1.3rem", width: "1.3rem" }}>
												<img
													src={user?.partnerLogo ? user?.partnerLogo : userIcon}
													height="100%"
													width="100%"
													alt="avatar"
													sx={{ objectFit: "cover", borderRadius: "50%" }}
												/>
											</Box>
										</Box>

										<Typography
											variant="body2"
											sx={{ fontWeight: 500, mr: "0.5rem" }}
										>
											{user?.username}
										</Typography>

										<ArrowDropDownOutlinedIcon />
									</Box>
								</Box>
							)}
							<Box sx={{ display: { xs: "flex", md: "none" } }}>
								<IconButton
									size="large"
									aria-label="show more"
									aria-controls={mobileMenuId}
									aria-haspopup="true"
									onClick={handleMobileMenuOpen}
									color="inherit"
								>
									<MenuIcon />
								</IconButton>
							</Box>

							<Box
								sx={{
									height: "2.3rem",
									width: "2.3rem",
									display: { xs: "none", md: "flex" },
								}}
								id="country-selector"
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
									src={region.region_logo}
									alt="country flag"
									height="100%"
									width="100%"
									style={{ objectFit: "cover", borderRadius: "50%" }}
								/>
							</Box>
						</Toolbar>
						<Divider />
					</AppBar>
					{renderMobileMenu}
					{renderMenu}
				</Box>
				{/* </ElevationScroll> */}
				{showNav && <Toolbar />}

				{/* desktop country menu */}
				<DesktopCountryMenu
					anchorEl={desktopCountryAnchorEl}
					open={isDesktopCountryOpen}
					handleClose={handleDesktopCountryClose}
					countrySearch={countrySearch}
					setCountrySearch={setCountrySearch}
					countriesData={displayedCountries}
					region={region}
					handleRegionSelect={(selectRegion) => {
						dispatch(setRegion(selectRegion));
						handleDesktopCountryClose();
					}}
				/>
				<DesktopProfileMenu
					anchorEl={desktopProfileAnchorEl}
					open={isdesktopPorfileMenuOpen}
					handleClose={() => setDesktopProfileAnchorEl(null)}
					role={role}
				/>
			</Box>
		</ClickAwayListener>
	);
}
