import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";

import NotificationDiv from "../../components/common/NotificationDiv";
import Loader from "../../components/common/Loader";
import NotificationModal from "../../components/common/NotificationModal";
import {
	fetchNotifications,
	readOneNotification,
	readAllNotifications,
	deleteNotification,
	deleteNotifications,
} from "../../api/common/notifications";

const size = 4;

const Notifications = () => {
	const [active, setActive] = useState(0);
	const [unReadNotifications, setUnReadNotifications] = useState([]);
	const [allNotificationsPage, setAllNotificationsPage] = useState(1);
	const [allNotictaionsDisplayed, setAllNotictaionsDisplayed] = useState([]);
	const [unreadPage, setUnreadPage] = useState(1);
	const [unreadDisplayed, setUnreadDisplayed] = useState([]);
	const [selectedItem, setSelectedItem] = useState({});
	const [openNotificationModal, setOpenNotificationModal] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const { user, bizFrom } = useSelector((state) => state.auth);
	const queryClient = useQueryClient();

	const {
		data: allNotificationsData = [],
		isLoading: allNotificationsLoading,
		isError: allNotificationsError,
		error: allNotificationsErrorMessage,
	} = useQuery(
		["get-notitfications", user.username, user.region, bizFrom, user.role],
		async () =>
			fetchNotifications(user.username, user.region, bizFrom, user.role),
		{
			select: (data) => data.data,
			staleTime: Infinity,
			enabled:
				Boolean(user.region) &&
				Boolean(user.username) &&
				Boolean(bizFrom) &&
				Boolean(user.role),
		}
	);

	useEffect(() => {
		if (allNotificationsError) {
			if (allNotificationsErrorMessage.response) {
				toast.error(allNotificationsErrorMessage.response.data?.message);
			} else if (allNotificationsErrorMessage.request) {
				toast.error("Internal Server Error");
			} else {
				toast.error("Error", allNotificationsErrorMessage.message);
			}
		}
	}, [allNotificationsError, allNotificationsErrorMessage]);

	useEffect(() => {
		if (allNotificationsData.length && !allNotificationsLoading) {
			const unReads = allNotificationsData.filter(
				(notification) => Number(notification.status) === 1
			);
			setUnReadNotifications(unReads);
		}
	}, [allNotificationsData, allNotificationsLoading]);

	useEffect(() => {
		if (allNotificationsData.length && !allNotificationsLoading) {
			const sliceData = allNotificationsData.slice(
				(allNotificationsPage - 1) * size,
				allNotificationsPage * size
			);
			setAllNotictaionsDisplayed(sliceData);
		}
	}, [allNotificationsData, allNotificationsLoading, allNotificationsPage]);

	useEffect(() => {
		if (
			unReadNotifications.length &&
			!allNotificationsLoading &&
			allNotificationsData.length
		) {
			const sliceData = unReadNotifications.slice(
				(unreadPage - 1) * size,
				unreadPage * size
			);
			setUnreadDisplayed(sliceData);
		}
	}, [
		unReadNotifications,
		allNotificationsLoading,
		unreadPage,
		allNotificationsData,
	]);

	const { mutate: readNotification } = useMutation(
		"read-notification",
		readOneNotification,
		{
			onSuccess: (dataSuccess) => {
				toast.success(dataSuccess?.message);
			},
			onError: (errors) => {
				if (errors.response) {
					toast.error(errors.response.data.message);
				} else if (errors.request) {
					toast.error("Internal Server Error");
				} else {
					toast.error("Error", errors.message);
				}
			},
			onSettled: () => {
				queryClient.invalidateQueries("get-notitfications");
				queryClient.invalidateQueries("get-notifications-summary");
			},
		}
	);

	const handleReadNotification = async (selectedNotifcation) => {
		const payload = {
			username: selectedNotifcation.username,
			ID: selectedNotifcation.id,
			region: user.region,
			bizFrom,
			accountType: user.role?.toUpperCase(),
		};
		await readNotification(payload);
	};

	const { mutate: readNotifications } = useMutation(
		"read-notifications",
		readAllNotifications,
		{
			onSuccess: (dataSuccess) => {
				toast.success(dataSuccess?.message);
			},
			onError: (errors) => {
				if (errors.response) {
					toast.error(errors.response.data.message);
				} else if (errors.request) {
					toast.error("Internal Server Error");
				} else {
					toast.error("Error", errors.message);
				}
			},
			onSettled: () => {
				queryClient.invalidateQueries("get-notitfications");
				queryClient.invalidateQueries("get-notifications-summary");
			},
		}
	);

	const { mutate: deleteAllNotifications } = useMutation(
		"delete-notifications",
		deleteNotifications,
		{
			onSuccess: (dataSuccess) => {
				toast.success(dataSuccess?.message);
			},
			onError: (errors) => {
				if (errors.response) {
					toast.error(errors.response.data.message);
				} else if (errors.request) {
					toast.error("Internal Server Error");
				} else {
					toast.error("Error", errors.message);
				}
			},
			onSettled: () => {
				queryClient.invalidateQueries("get-notitfications");
				queryClient.invalidateQueries("get-notifications-summary");
			},
		}
	);

	const { mutate: deleteOneNotifications } = useMutation(
		"delete-notification",
		deleteNotification,
		{
			onSuccess: (dataSuccess) => {
				toast.success(dataSuccess?.message);
			},
			onError: (errors) => {
				if (errors.response) {
					toast.error(errors.response.data.message);
				} else if (errors.request) {
					toast.error("Internal Server Error");
				} else {
					toast.error("Error", errors.message);
				}
			},
			onSettled: () => {
				queryClient.invalidateQueries("get-notitfications");
				queryClient.invalidateQueries("get-notifications-summary");
			},
		}
	);

	const handleReadNotifications = async () => {
		const payload = {
			username: user.username,
			region: user.region,
			bizFrom,
			accountType: user.role?.toUpperCase(),
		};
		await readNotifications(payload);
	};

	const handleDeleteAllNotifications = async () => {
		const payload = {
			username: user.username,
			region: user.region,
			bizFrom,
			accountType: user.role?.toUpperCase(),
		};
		await deleteAllNotifications(payload);
	};

	const handleDeleteNotification = async (selectedNotifcation) => {
		const payload = {
			username: selectedNotifcation.username,
			ID: selectedNotifcation.id,
			region: user.region,
			accountType: user.role?.toUpperCase(),
		};
		await deleteOneNotifications(payload);
	};

	return (
		<Box
			sx={{
				p: {
					md: "3rem",
					xs: "1rem",
				},
			}}
		>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
				}}
			>
				<Box
					sx={{
						width: { md: "80%", xs: "100%" },
						border: "1px solid #E6E6E6",
						borderRadius: "4px",
						p: "1rem",
					}}
				>
					<Box>
						{/* header */}
						<Box sx={{ mb: "2rem" }}>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									mb: "1rem",
								}}
							>
								<Typography
									variant="h6"
									sx={{
										fontWeight: 700,
										textTransform: "capitalize",
										mr: "auto",
									}}
									gutterBottom
								>
									Notifications
								</Typography>

								<IconButton
									id="all-read-button"
									aria-controls={open ? "all-read-menu" : undefined}
									aria-haspopup="true"
									aria-expanded={open ? "true" : undefined}
									onClick={handleClick}
								>
									<MoreHorizIcon />
								</IconButton>
							</Box>
							<Box sx={{ p: "0" }}>
								<Stack direction="row" spacing={2}>
									<Button
										variant={active === 0 ? "contained" : "outlined"}
										color="primary"
										sx={{ textTransform: "none" }}
										onClick={() => setActive(0)}
									>
										All
									</Button>
									<Button
										variant={active === 1 ? "contained" : "outlined"}
										color="primary"
										sx={{ textTransform: "none" }}
										onClick={() => setActive(1)}
									>
										Unread
									</Button>
								</Stack>
							</Box>
						</Box>

						{!allNotificationsLoading && active === 0 && (
							<Box>
								{allNotictaionsDisplayed.map((notification) => (
									<Box key={notification.id}>
										<NotificationDiv
											notification={notification}
											handleNotificationDelete={handleDeleteNotification}
											handleNotificationRead={async () => {
												setSelectedItem(notification);
												setOpenNotificationModal(true);
												await handleReadNotification(notification);
											}}
										/>
									</Box>
								))}
								<Box
									sx={{
										mt: "2rem",
										display: "flex",
										justifyContent: "Center",
									}}
								>
									<Pagination
										count={Math.ceil(allNotificationsData?.length / size) || 0}
										page={allNotificationsPage}
										onChange={(event, value) => {
											setAllNotificationsPage(value);
										}}
										color="primary"
									/>
								</Box>
							</Box>
						)}

						{!allNotificationsLoading && active === 1 && (
							<Box>
								{unreadDisplayed.map((notification) => (
									<Box key={notification.id}>
										<NotificationDiv
											notification={notification}
											handleNotificationDelete={handleDeleteNotification}
											handleNotificationRead={async () => {
												setSelectedItem(notification);
												setOpenNotificationModal(true);
												await handleReadNotification(notification);
											}}
										/>
									</Box>
								))}
								<Box
									sx={{
										mt: "2rem",
										display: "flex",
										justifyContent: "Center",
									}}
								>
									<Pagination
										count={Math.ceil(unReadNotifications?.length / size) || 0}
										page={unreadPage}
										onChange={(event, value) => {
											setUnreadPage(value);
										}}
										color="primary"
									/>
								</Box>
							</Box>
						)}

						{allNotificationsLoading && <Loader />}
					</Box>
				</Box>
			</Box>
			<Menu
				id="all-read-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "all-read-button",
				}}
			>
				<MenuItem
					onClick={() => {
						handleReadNotifications();
						handleClose();
					}}
				>
					Mark all as read
				</MenuItem>
				<MenuItem
					onClick={() => {
						handleDeleteAllNotifications();
						handleClose();
					}}
				>
					Delete all notifications
				</MenuItem>
			</Menu>
			<NotificationModal
				open={openNotificationModal}
				handleClose={() => {
					setSelectedItem({});
					setOpenNotificationModal(false);
				}}
				title={selectedItem?.title}
				message={selectedItem?.message}
				date={selectedItem?.createDate}
			/>
		</Box>
	);
};

export default Notifications;
