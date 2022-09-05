import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Navbar from "../../../components/Home/NavBar";
import FormFooter from "../../../components/common/FormFooter";
import LoginTabs from "../../../components/common/LoginTabs";
import Login from "../../../components/common/Login";
import SignUp from "../../../components/common/SignUp";
import { SIGNUPTABS } from "../../../constants/stringConstants";
import { ROLES, DEVICETYPE, ROLEKEY } from "../../../utils/constants";
import { login } from "../../../slices/authSlice";

const containerStyles = {
	minHeight: "100vh",
	backgroundColor: "#fff",
	width: "100vw",
	position: "relative",
};

const mainContainerStyles = {
	padding: { md: "2rem", sm: "1rem", xs: 0 },
};

const flexContainer = {
	display: "flex",
	justifyContent: "center",
	pb: { md: "3rem", xs: "2rem" },
};

const formContainerStyles = {
	width: "33rem",
	border: "1px solid #E6E6E6",
	borderRadius: "4px",
};

const defaultSignUpFields = {
	username: "",
	name: "",
	email: "",
	phoneNumber: "",
	password: "",
	isChecked: false,
	referralCode: "",
};

const defaultLoginFields = {
	username: "",
	password: "",
};

const userRedirectLinks = {
	[ROLES.CUSTOMER]: "/customer/dashboard",
};

const LoginSignup = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const { bizFrom, region, role } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	const [tab, setTab] = useState(SIGNUPTABS.SIGNUP);

	useEffect(() => {
		if (location.pathname === "/login") {
			setTab(SIGNUPTABS.LOGIN);
		}
		if (location.pathname === "/signup") {
			setTab(SIGNUPTABS.SIGNUP);
		}
	}, [location.pathname]);

	const handleLoginSubmit = async (values, stopSubmitLoading, resetForm) => {
		const localStoredRole = localStorage.getItem(ROLEKEY);
		try {
			const payload = {
				username: values.username.trim(),
				password: values.password.trim(),
				region: region.region,
				bizFrom,
				accountType: role?.toUpperCase() || localStoredRole?.toUpperCase(),
				deviceType: DEVICETYPE,
			};
			const result = await dispatch(login(payload)).unwrap();
			stopSubmitLoading();
			resetForm();
			toast.success(result.message);
			window.location = userRedirectLinks[role || localStoredRole];
		} catch (error) {
			stopSubmitLoading();
			toast.error(error);
		}
	};

	const handleSignUpSubmit = async (values, stopSubmitLoading, resetForm) => {
		stopSubmitLoading();
		resetForm();
		const payload = {
			username: values.username.trim(),
			name: values.name.trim(),
			email: values.email.trim(),
			phoneNumber: values.phoneNumber.trim(),
			password: values.password.trim(),
			isChecked: values.isChecked,
			referralCode: values.referralCode.trim(),
		};
		navigate("/otp-verification", { state: { payload } });
	};

	return (
		<div>
			<Box sx={containerStyles}>
				<Navbar toggleFlag />
				<Toolbar />
				<Box sx={mainContainerStyles}>
					<Box sx={flexContainer}>
						<Box sx={formContainerStyles}>
							<LoginTabs
								activeTab={tab}
								onSignupClick={() => setTab(SIGNUPTABS.SIGNUP)}
								onLoginCLick={() => setTab(SIGNUPTABS.LOGIN)}
							/>
							{tab === SIGNUPTABS.LOGIN && (
								<Login
									loginFields={defaultLoginFields}
									handleSubmit={handleLoginSubmit}
								/>
							)}
							{tab === SIGNUPTABS.SIGNUP && (
								<SignUp
									signUpFields={defaultSignUpFields}
									handleSubmit={handleSignUpSubmit}
								/>
							)}
						</Box>
					</Box>
				</Box>
			</Box>
			<FormFooter />
		</div>
	);
};

export default LoginSignup;
