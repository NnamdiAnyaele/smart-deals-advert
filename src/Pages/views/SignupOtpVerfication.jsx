import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import OtpInput from "react-otp-input";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CssBaseline from "@mui/material/CssBaseline";
import CircularProgress from "@mui/material/CircularProgress";

import { useCountdown } from "../../hooks/useCoundown";
import {
	resendOtp,
	verifyOtp,
	sendOtp,
	createAccount,
} from "../../api/common/auth";
import { addSeconds } from "../../utils/helpers/functions";
import { ROLES, DEVICETYPE } from "../../utils/constants";
import FormHeader from "../../components/common/FormHeader";
import FormFooter from "../../components/common/FormFooter";
import AuthSuccessModal from "../../components/common/AuthSuccessModal";

const errorStyle = {
	color: "red",
	border: "1px solid red !important",
};

const EmailOtpVerfication = () => {
	const [otp, setOtp] = useState("");
	const [targetDate, setTargetDate] = useState(addSeconds(60));
	const [openSuccessModal, setOpenSuccessModal] = useState(false);
	const [verifyLoading, setVerifyLoading] = useState(false);
	const [createAccountLoading, setCreateAccountLoading] = useState(false);

	const { bizFrom, region, role } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const matches = useMediaQuery("(min-width:700px)");
	const locationState = useLocation().state;

	const [days, hours, minutes, seconds] = useCountdown(targetDate);

	useEffect(() => {
		let isMounted = true;

		// request otp on page load
		(async () => {
			try {
				const payload = {
					username: locationState?.payload?.username,
					fullName: locationState?.payload?.username,
					emailAddress: locationState?.payload?.email,
					phoneNumber: locationState?.payload?.phoneNumber,
					region: region.region,
					bizFrom,
				};
				const result = await sendOtp(payload);

				if (isMounted) {
					toast.success(result?.message);
				}
			} catch (error) {
				if (error.response) {
					toast.error(error.response.data.message);
				} else if (error.request) {
					toast.error("Internal Server Error");
				} else {
					toast.error("Error", error.message);
				}
			}
		})();

		return () => {
			isMounted = false;
		};
	}, []);

	const handleOtpResend = async () => {
		setTargetDate(addSeconds(60));
		try {
			const payload = {
				username: locationState?.payload?.username,
				fullName: locationState?.payload?.fullName,
				emailAddress: locationState?.payload?.email,
				phoneNumber: locationState?.payload?.phoneNumber,
				region: region.region,
				bizFrom,
			};
			await resendOtp(payload);
			toast.success("OTP sent to registered email adddress");
		} catch (error) {
			if (error.response) {
				toast.error(error.response.data?.message);
			} else if (error.request) {
				toast.error("Internal Server Error");
			} else {
				toast.error("Error", error.message);
			}
		}
	};

	const handleOtpVerify = async () => {
		if (!otp) {
			toast.error("Please enter OTP");
			return;
		}
		try {
			setVerifyLoading(true);
			const payload = {
				otp,
				username: locationState?.payload?.username,
				emailAddress: locationState?.payload?.email,
				region: region?.region,
			};
			const result = await verifyOtp(payload);
			await handleCreateAccount();
			toast.success(result.message);
			setVerifyLoading(false);
		} catch (error) {
			setVerifyLoading(false);
			if (error.response) {
				toast.error(error.response.data?.message);
			} else if (error.request) {
				toast.error("Internal Server Error");
			} else {
				toast.error("Error", error.message);
			}
		}
	};

	const handleCreateAccount = async () => {
		try {
			setCreateAccountLoading(true);
			const partnerPayload = {
				otp,
				partnerName: locationState?.payload?.merchantName,
				username: locationState?.payload?.username,
				password: locationState?.payload?.password,
				emailAddress: locationState?.payload?.email,
				phoneNumber: locationState?.payload?.phoneNumber,
				referrer: locationState?.payload?.referralCode || "N/A",
				bizFrom,
				deviceType: DEVICETYPE,
				accountType: role,
				region: region?.region,
			};

			const memberPayload = {
				otp,
				username: locationState?.payload?.username,
				password: locationState?.payload?.password,
				emailAddress: locationState?.payload?.email,
				phoneNumber: locationState?.payload?.phoneNumber,
				referrer: locationState?.payload?.referralCode || "N/A",
				bizFrom,
				deviceType: DEVICETYPE,
				accountType: role,
				region: region?.region,
			};
			const result =
				role === ROLES?.PARTNER
					? await createAccount(partnerPayload)
					: await createAccount(memberPayload);
			toast.success(result.message);
			setOtp("");
			setOpenSuccessModal(true);
			setCreateAccountLoading(false);
		} catch (error) {
			setCreateAccountLoading(false);
			if (error.response) {
				toast.error(error.response.data?.message);
			} else if (error.request) {
				toast.error("Internal Server Error");
			} else {
				toast.error("Error", error.message);
			}
		}
	};

	const inputStyle = matches
		? {
				width: "3rem",
				height: "3rem",
				margin: "0 1rem",
				fontSize: "2rem",
				borderRadius: 4,
				border: "1px solid rgba(0,0,0,0.3)",
		  }
		: {
				width: "3rem",
				height: "3rem",
				margin: "0 0.1rem",
				fontSize: "2rem",
				borderRadius: 4,
				border: "1px solid rgba(0,0,0,0.3)",
		  };
	return (
		<div>
			<CssBaseline />

			<Box
				sx={{
					minHeight: "100vh",
					backgroundColor: "#fff",
					width: "100vw",
					position: "relative",
				}}
			>
				<Box
					sx={{
						padding: { md: "2rem", sm: "1rem", xs: 0 },
					}}
				>
					<FormHeader />
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
						}}
					>
						<Box
							sx={{
								width: "33rem",
								maxWidth: "33rem",
								border: "1px solid #E6E6E6",
								borderRadius: "4px",
								p: "1rem",
							}}
						>
							<Box>
								<IconButton onClick={() => navigate(-1)}>
									<ArrowBackIcon sx={{ color: "#999", mr: "1rem" }} />
									<Typography
										variant="body1"
										sx={{ textTransform: "capitalize", fontWeight: 300 }}
									>
										back
									</Typography>
								</IconButton>
							</Box>
							<Box sx={{ textAlign: "center", color: "#999", padding: "2rem" }}>
								<Typography
									variant="h6"
									sx={{ textTransform: "uppercase", color: "#5F5F5F" }}
								>
									otp verification
								</Typography>

								<Box
									sx={{
										m: "2rem 0",
										display: "flex",
										justifyContent: "center",
									}}
								>
									<Box>
										<Typography variant="body1">
											A verification code was sent to{" "}
										</Typography>
										<Typography
											variant="body1"
											sx={{ color: "#000", wordBreak: "break-all" }}
										>
											{locationState?.payload?.email}
										</Typography>
										<Typography variant="body1">
											Kindly enter the pin below
										</Typography>
									</Box>
								</Box>

								<Box
									sx={{
										display: "flex",
										justifyContent: "center",
										mb: "2rem",
										maxWidth: "100%",
									}}
								>
									<OtpInput
										inputStyle={inputStyle}
										value={otp}
										isInputNum
										onChange={(value) => setOtp(value)}
										numInputs={6}
										shouldAutoFocus
										errorStyle={errorStyle}
										separator={<span />}
									/>
								</Box>
								{days + hours + minutes + seconds > 0 && (
									<Typography
										variant="body1"
										component="div"
										sx={{ mb: "2rem" }}
									>
										Resend code in{" "}
										<Typography
											variant="body1"
											color="secondary"
											component="span"
										>
											{`(00:${
												seconds > 0 ? String(seconds).padStart(2, "0") : "00"
											})`}
										</Typography>
									</Typography>
								)}

								{days + hours + minutes + seconds <= 0 && (
									<Button
										variant="text"
										color="secondary"
										sx={{ mb: "2rem" }}
										onClick={handleOtpResend}
									>
										resend otp
									</Button>
								)}

								<Button
									variant="contained"
									fullWidth
									sx={{ padding: "1rem" }}
									onClick={handleOtpVerify}
									disabled={verifyLoading || createAccountLoading}
								>
									{verifyLoading || createAccountLoading ? (
										<CircularProgress color="primary" size="1.5rem" />
									) : (
										"verify"
									)}
								</Button>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
			<FormFooter />
			<AuthSuccessModal
				open={openSuccessModal}
				handleClose={setOpenSuccessModal}
				title="Account created successfully!"
				subtitle="A welcome email has been sent to your email address."
			/>
		</div>
	);
};

export default EmailOtpVerfication;
