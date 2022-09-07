import { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import GridViewIcon from "@mui/icons-material/GridView";
import HistoryIcon from "@mui/icons-material/History";
import TimelineIcon from "@mui/icons-material/Timeline";
// import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
// import PaidIcon from "@mui/icons-material/Paid";

import DrawerItem from "../common/DrawerItem";
import { drawerWidth } from "../../utils/constants";

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	paddingBottom: "10rem",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

const AdminDrawer = ({ open, setOpen }) => {
	const [value, setValue] = useState(0);
	const [itemOnHover, setItemOnHover] = useState(null);
	const [innerWidth, setInnerWidth] = useState(window.innerWidth);

	const theme = useTheme();
	const showDrawer = useMediaQuery(theme.breakpoints.up("md"));

	useEffect(() => {
		let isMounted = true;

		function handleResize() {
			setInnerWidth(window.innerWidth);
			if (innerWidth < 960 && isMounted && showDrawer) {
				setOpen(false);
			} else {
				setOpen(true);
			}
		}

		window.addEventListener("resize", handleResize);
		return () => {
			window.addEventListener("resize", handleResize);
			isMounted = false;
		};
	});

	useEffect(() => {
		let isMounted = true;

		if (innerWidth < 960 && isMounted && showDrawer) {
			setOpen(false);
		}

		return () => {
			isMounted = false;
		};
	}, [innerWidth]);

	useEffect(() => {
		let isMounted = true;

		if (isMounted && showDrawer) {
			if (window.location.pathname === "/customer/dashboard" && value !== 0) {
				setValue(0);
			}
			if (
				window.location.pathname === "/customer/advert-history" &&
				value !== 1
			) {
				setValue(1);
			}
			if (window.location.pathname === "/customer/analytics" && value !== 2) {
				setValue(2);
			}
			if (
				window.location.pathname === "/customer/notifications" &&
				value !== 3
			) {
				setValue(3);
			}
			if (
				window.location.pathname === "/customer/change-password" &&
				value !== 4
			) {
				setValue(4);
			}
			if (window.location.pathname === "/logout" && value !== 5) {
				setValue(5);
			}
			if (
				window.location.pathname === "/customer/approved-adverts" &&
				value !== 6
			) {
				setValue(6);
			}
			if (
				window.location.pathname === "/customer/paid-adverts" &&
				value !== 7
			) {
				setValue(7);
			}
		}

		return () => {
			isMounted = false;
		};
	}, [value, showDrawer]);

	return (
		<Drawer variant="permanent" open={open}>
			<Toolbar />
			<Divider />
			<List>
				<DrawerItem
					text="Dashboard"
					open={open}
					Icon={GridViewIcon}
					linkTo="/customer/dashboard"
					setValue={setValue}
					setItemOnHover={setItemOnHover}
					itemOnHover={itemOnHover}
					value={value}
					itemValue={0}
				/>
				<DrawerItem
					text="Advert Histrory"
					open={open}
					Icon={HistoryIcon}
					linkTo="/customer/advert-history"
					setValue={setValue}
					setItemOnHover={setItemOnHover}
					itemOnHover={itemOnHover}
					value={value}
					itemValue={1}
				/>
				{/* <DrawerItem
					text="Approved Adverts"
					open={open}
					Icon={AssignmentTurnedInIcon}
					linkTo="/customer/approved-adverts"
					setValue={setValue}
					setItemOnHover={setItemOnHover}
					itemOnHover={itemOnHover}
					value={value}
					itemValue={6}
				/>
				<DrawerItem
					text="Paid Adverts"
					open={open}
					Icon={PaidIcon}
					linkTo="/customer/paid-adverts"
					setValue={setValue}
					setItemOnHover={setItemOnHover}
					itemOnHover={itemOnHover}
					value={value}
					itemValue={7}
				/> */}
				<DrawerItem
					text="Analytics"
					open={open}
					Icon={TimelineIcon}
					linkTo="/customer/analytics"
					setValue={setValue}
					setItemOnHover={setItemOnHover}
					itemOnHover={itemOnHover}
					value={value}
					itemValue={2}
				/>
				<DrawerItem
					text="Notifications"
					open={open}
					Icon={NotificationsNoneOutlinedIcon}
					linkTo="/customer/notifications"
					setValue={setValue}
					setItemOnHover={setItemOnHover}
					itemOnHover={itemOnHover}
					value={value}
					itemValue={3}
				/>
				<DrawerItem
					text="Change Password"
					open={open}
					linkTo="/customer/change-password"
					setValue={setValue}
					setItemOnHover={setItemOnHover}
					itemOnHover={itemOnHover}
					value={value}
					itemValue={4}
					Icon={LockResetOutlinedIcon}
				/>
				<DrawerItem
					text="Log out"
					open={open}
					Icon={LogoutOutlinedIcon}
					linkTo="/logout"
					setValue={setValue}
					setItemOnHover={setItemOnHover}
					itemOnHover={itemOnHover}
					value={value}
					itemValue={5}
				/>
			</List>
		</Drawer>
	);
};

export default AdminDrawer;
