import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import TextFieldComponent from "../../components/common/TextFieldComponent";
import SubmitButton from "../../components/common/SubmitButton";
import FormHeader from "../../components/common/FormHeader";
import FormFooter from "../../components/common/FormFooter";
import ForgotPasswordModal from "../../components/common/ForgotPasswordModal";
import ForgotPasswordOtpModal from "../../components/common/ForgotPasswordOtpModal";
import ResetPasswordModal from "../../components/common/ResetPasswordModal";
import {
	forgotPassword,
	resendOtp,
	verifyOtp,
	sendOtp,
	resetPassword,
} from "../../api/common/auth";
import { ROLEKEY } from "../../utils/constants";
import { useCountdown } from "../../hooks/useCoundown";
import { addSeconds } from "../../utils/helpers/functions";

const validationSchema = yup.object({
	username: yup
		.string("Please enter your username")
		.min(3, "Username should be of minimum 3 characters length")
		.required("Username is required"),
});

const defaultPasswordDetails = {
	newPassword: "",
	confirmPassword: "",
};

const ForgotPassword = () => {
	const [openModal, setOpenModal] = useState(false);
	const [otp, setOtp] = useState("");
	const [openOtpModal, setOpenOtpModal] = useState(false);
	const [targetDate, setTargetDate] = useState(addSeconds(60));
	const [days, hours, minutes, seconds] = useCountdown(targetDate);
	const [forgotPasswordResponse, setForgotPasswordResponse] = useState({});
	const [otpRequestLoading, setOtpRequestLoading] = useState(false);
	const [verifyLoading, setVerifyLoading] = useState(false);
	const [resetPasswordModalOpen, setResetPasswordModalOpen] = useState(false);
	const [resetPasswordLoading, setResetPasswordLoading] = useState(false);

	const navigate = useNavigate();
	const { region, bizFrom, role } = useSelector((state) => state.auth);

	const handleForgotPasswordSubmit = async (values, setSubmitStop) => {
		const localStoredRole = localStorage.getItem(ROLEKEY);
		try {
			const payload = {
				username: values.username,
				region: region.region,
				accountType: role?.toUpperCase() || localStoredRole?.toUpperCase(),
				bizFrom,
			};
			const result = await forgotPassword(payload);
			setForgotPasswordResponse(result?.data);
			await handleOtpRequest(result?.data);
			setSubmitStop();
			setOpenOtpModal(true);
			setTargetDate(addSeconds(60));
		} catch (error) {
			setSubmitStop();
			if (error.response) {
				toast.error(error.response.data?.message);
			} else if (error.request) {
				toast.error("Internal Server Error");
			} else {
				toast.error("Error", error.message);
			}
		}
	};

	const formik = useFormik({
		initialValues: { username: "" },
		validationSchema,
		onSubmit: (values) => {
			handleForgotPasswordSubmit(values, () => formik.setSubmitting(false));
		},
	});

	const handleOtpRequest = async (userData) => {
		setOtpRequestLoading(true);
		setTargetDate(addSeconds(60));
		try {
			const payload = {
				username: userData?.username,
				fullName: userData?.fullName,
				emailAddress: userData?.emailAddress,
				phoneNumber: userData?.phoneNumber,
				region: region.region,
				bizFrom,
			};
			await sendOtp(payload);
			toast.success("OTP sent to registered email adddress");
			setOtpRequestLoading(false);
		} catch (error) {
			setOtpRequestLoading(false);
			if (error.response) {
				toast.error(error.response.data?.message);
			} else if (error.request) {
				toast.error("Internal Server Error");
			} else {
				toast.error("Error", error.message);
			}
		}
	};

	const handleOtpResend = async () => {
		setTargetDate(addSeconds(60));
		try {
			const payload = {
				username: forgotPasswordResponse?.username,
				fullName: forgotPasswordResponse?.fullName,
				emailAddress: forgotPasswordResponse?.emailAddress,
				phoneNumber: forgotPasswordResponse?.phoneNumber,
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
				username: forgotPasswordResponse?.username,
				emailAddress: forgotPasswordResponse?.emailAddress,
				region: region?.region,
			};
			const result = await verifyOtp(payload);
			setResetPasswordModalOpen(true);
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

	const handleResetPassword = async (values, stopSubmitLoading) => {
		if (values.newPassword !== values.confirmPassword) {
			toast.error("New password and confirm password should be same");
			return;
		}
		try {
			setResetPasswordLoading(true);
			const payload = {
				username: formik.values.username,
				otp,
				password: values?.newPassword,
				region: region?.region,
			};
			const result = await resetPassword(payload);
			stopSubmitLoading();
			toast.success(result.message);
			setResetPasswordLoading(false);
			setOpenModal(true);
		} catch (error) {
			setResetPasswordLoading(false);
			if (error.response) {
				toast.error(error.response.data?.message);
			} else if (error.request) {
				toast.error("Internal Server Error");
			} else {
				toast.error("Error", error.message);
			}
		}
	};

	return (
		<div>
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
									sx={{ textTransform: "capitalize", color: "#5F5F5F" }}
								>
									Forgot password
								</Typography>

								<Box
									sx={{
										m: "1rem 0",
										display: "flex",
										justifyContent: "center",
									}}
								>
									<Box sx={{ width: "80%" }}>
										<Typography variant="body1">
											Please enter your username to reset your password.
										</Typography>
									</Box>
								</Box>

								<Box
									component="form"
									noValidate
									autoComplete="off"
									onSubmit={formik.handleSubmit}
								>
									<Box sx={{ mb: "1rem" }}>
										<TextFieldComponent
											value={formik.values.username}
											onChange={formik.handleChange}
											label="Username"
											id="username"
											name="username"
											required
											error={
												formik.touched.username &&
												Boolean(formik.errors.username)
											}
											helperText={
												formik.touched.username && formik.errors.username
											}
										/>
									</Box>

									<SubmitButton
										text="send rest link"
										loading={formik.isSubmitting || otpRequestLoading}
										disabled={!formik.dirty || formik.isSubmitting}
									/>
								</Box>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
			<FormFooter />
			<ForgotPasswordModal
				open={openModal}
				handleClose={() => {
					setOpenModal(false);
				}}
				title="Password reset successfully!"
				subtitle=""
			/>
			<ForgotPasswordOtpModal
				open={openOtpModal}
				handleClose={() => {
					setOpenOtpModal(false);
				}}
				otp={otp}
				setOtp={setOtp}
				time={{ days, hours, minutes, seconds }}
				verifyLoading={verifyLoading}
				handleOtpResend={handleOtpResend}
				handleOtpVerify={handleOtpVerify}
			/>
			<ResetPasswordModal
				open={resetPasswordModalOpen}
				handleClose={() => setResetPasswordModalOpen(false)}
				defaultPasswordDetails={defaultPasswordDetails}
				loading={resetPasswordLoading}
				handleResetPassword={handleResetPassword}
			/>
		</div>
	);
};

export default ForgotPassword;
