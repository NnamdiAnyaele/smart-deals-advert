import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import PasswordComponent from "../../components/common/PasswordComponent";
import SubmitButton from "../../components/common/SubmitButton";
import { changePassword } from "../../api/common/auth";
import {
	specialCharacterCheck,
	digitCheck,
	uppercaseCheck,
} from "../../utils/constants";
import PasswordCheckCompoennt from "../../components/common/PasswordCheckCompoennt";

const fields = {
	currentPassword: "",
	newPassword: "",
	confirmPassword: "",
};

const validationSchema = yup.object({
	currentPassword: yup
		.string("Please enter your password")
		.min(7, "Password should be of minimum 7 characters length")
		.matches(
			specialCharacterCheck,
			"Password should contain at least one special character"
		)
		.matches(digitCheck, "Password should contain at least one digit")
		.matches(
			uppercaseCheck,
			"Password should contain at least one uppercase character"
		)
		.required("Password is required"),
	newPassword: yup
		.string("Please enter your password")
		.min(7, "Password should be of minimum 7 characters length")
		.matches(
			specialCharacterCheck,
			"Password should contain at least one special character"
		)
		.matches(digitCheck, "Password should contain at least one digit")
		.matches(
			uppercaseCheck,
			"Password should contain at least one uppercase character"
		)
		.required("Password is required"),
	confirmPassword: yup
		.string("Please enter your password")
		.min(7, "Password should be of minimum 7 characters length")
		.matches(
			specialCharacterCheck,
			"Password should contain at least one special character"
		)
		.matches(digitCheck, "Password should contain at least one digit")
		.matches(
			uppercaseCheck,
			"Password should contain at least one uppercase character"
		)
		.required("Password is required")
		.oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

const ChangePassword = () => {
	const { user } = useSelector((state) => state.auth);

	const handleSubmit = async (values, stopSubmitLoading, resetForm) => {
		if (values.newPassword !== values.confirmPassword) {
			toast.error("New password and confirm password should be same");
			return;
		}
		try {
			const payload = {
				username: user.username,
				newPassword: values.newPassword,
				oldPassword: values.currentPassword,
				region: user.region,
			};

			await changePassword(payload);
			toast.success("Password changed successfully");
			stopSubmitLoading();
			resetForm();
		} catch (err) {
			stopSubmitLoading();
			if (err.response) {
				toast.error(err.response.data.message);
			} else if (err.request) {
				toast.error("Internal Server Error");
			} else {
				toast.error("Error", err.message);
			}
		}
	};

	const formik = useFormik({
		initialValues: fields,
		validationSchema,
		onSubmit: (values) => {
			handleSubmit(
				values,
				() => formik.setSubmitting(false),
				() => formik.resetForm()
			);
		},
	});

	return (
		<Box
			sx={{
				minHeight: "100vh",
				backgroundColor: "#fff",
				position: "relative",
			}}
		>
			<Box
				sx={{
					padding: { md: "3rem", sm: "1rem", xs: 0 },
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
							width: "33rem",
							border: "1px solid #E6E6E6",
							borderRadius: "4px",
							pb: { md: "2rem", xs: "1rem" },
						}}
					>
						<Typography
							variant="h6"
							sx={{
								textAlign: "center",
								fontWeight: 700,
								textTransform: "capitalize",
								color: "#303030",
								p: { md: "2rem", xs: "1rem" },
							}}
						>
							password
						</Typography>
						<Box
							component="form"
							sx={{
								p: { md: "1rem 3rem", xs: "1rem" },
								// border: "1px solid red",
							}}
							noValidate
							autoComplete="off"
							onSubmit={formik.handleSubmit}
						>
							<Box sx={{ mb: "1rem" }}>
								<PasswordComponent
									value={formik.values.currentPassword}
									onChange={formik.handleChange}
									required
									label="Current Password"
									name="currentPassword"
									error={
										formik.touched.currentPassword &&
										Boolean(formik.errors.currentPassword)
									}
									helperText={
										formik.touched.currentPassword &&
										formik.errors.currentPassword
									}
								/>
							</Box>
							<Box sx={{ mb: "1rem" }}>
								<PasswordComponent
									value={formik.values.newPassword}
									onChange={formik.handleChange}
									required
									label="New Password"
									name="newPassword"
									error={
										formik.touched.newPassword &&
										Boolean(formik.errors.newPassword)
									}
									helperText={
										formik.touched.newPassword && formik.errors.newPassword
									}
								/>
							</Box>
							<Box sx={{ mb: "1rem" }}>
								<PasswordComponent
									value={formik.values.confirmPassword}
									onChange={formik.handleChange}
									required
									label="Confirm Password"
									name="confirmPassword"
									error={
										formik.touched.confirmPassword &&
										Boolean(formik.errors.confirmPassword)
									}
									helperText={
										formik.touched.confirmPassword &&
										formik.errors.confirmPassword
									}
								/>
							</Box>

							<PasswordCheckCompoennt password={formik.values.newPassword} />

							<SubmitButton
								text="update password"
								loading={formik.isSubmitting}
								disabled={!formik.dirty || formik.isSubmitting}
							/>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default ChangePassword;
