import { useFormik } from "formik";
import * as yup from "yup";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import PasswordComponent from "./PasswordComponent";
import SubmitButton from "./SubmitButton";

import {
	specialCharacterCheck,
	digitCheck,
	uppercaseCheck,
} from "../../utils/constants";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "33rem",
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
	outline: 0,
};

const ResetPasswordModal = ({
	open,
	handleClose,
	defaultPasswordDetails,
	handleResetPassword,
	loading,
}) => {
	const validationSchema = yup.object({
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
			.string("Please confirm your password")
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
			.required("Confirm Password is required")
			.oneOf([yup.ref("newPassword"), null], "Passwords must match"),
	});

	const formik = useFormik({
		initialValues: defaultPasswordDetails,
		validationSchema,
		onSubmit: (values) => {
			handleResetPassword(values, () => formik.setSubmitting(false));
		},
	});

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Box
					sx={{
						pb: { md: "2rem", xs: "1rem" },
					}}
				>
					<Typography
						variant="h6"
						sx={{
							textAlign: "center",
							fontWeight: 700,
							textTransform: "capitalize",
							color: "primary.main",
							p: { md: "2rem", xs: "1rem" },
						}}
					>
						reset password
					</Typography>
					<Box
						component="form"
						sx={{
							p: { md: "1rem 3rem", xs: "1rem" },
						}}
						noValidate
						autoComplete="off"
						onSubmit={formik.handleSubmit}
					>
						<Box sx={{ mb: "1rem" }}>
							<PasswordComponent
								value={formik.values.newPassword}
								onChange={formik.handleChange}
								required
								label="Password"
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

						<SubmitButton
							text="reset password"
							loading={formik.isSubmitting || loading}
							disabled={!formik.dirty || formik.isSubmitting || loading}
						/>
					</Box>
				</Box>
			</Box>
		</Modal>
	);
};

export default ResetPasswordModal;
