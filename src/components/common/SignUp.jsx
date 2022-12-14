import { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";

import PasswordComponent from "./PasswordComponent";
import TextFieldComponent from "./TextFieldComponent";
import {
	specialCharacterCheck,
	digitCheck,
	uppercaseCheck,
	ROLES,
} from "../../utils/constants";
import { checkUsername, checkEmailAddress } from "../../api/common/auth";

const partnerValidationSchema = yup.object({
	username: yup
		.string("Please enter your username")
		.min(3, "Username should be of minimum 3 characters length")
		.required("Username is required"),
	merchantName: yup
		.string("Please enter your merchant name")
		.min(3, "Merchant name should be of minimum 3 characters length")
		.required("Merchant name is required"),
	email: yup
		.string("Please enter your email")
		.email("Please enter a valid email")
		.required("Email is required"),
	phoneNumber: yup
		.string("Please enter your phone number")
		.min(10, "Phone number should be of minimum 10 characters length")
		.required("Phone number is required"),
	password: yup
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
});

const merchantValidationSchema = yup.object({
	username: yup
		.string("Please enter your username")
		.min(3, "Username should be of minimum 3 characters length")
		.required("Username is required"),
	email: yup
		.string("Please enter your email")
		.email("Please enter a valid email")
		.required("Email is required"),
	phoneNumber: yup
		.string("Please enter your phone number")
		.min(10, "Phone number should be of minimum 10 characters length")
		.required("Phone number is required"),
	password: yup
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
});

const SignUp = ({ signUpFields, handleSubmit }) => {
	const { role, region } = useSelector((state) => state.auth);

	const [existUsernameMessage, setExistUsernameMessage] = useState("");
	const [existEmailMessage, setExistEmailMessage] = useState("");

	const formik = useFormik({
		initialValues: signUpFields,
		validationSchema:
			role === ROLES.PARTNER
				? partnerValidationSchema
				: merchantValidationSchema,
		onSubmit: (values) => {
			handleSubmit(
				values,
				() => formik.setSubmitting(false),
				() => formik.resetForm()
			);
		},
	});

	const checkUsernameExist = useCallback(
		debounce(async (query) => {
			try {
				if (role && region) {
					const payload = {
						username: query,
						region: region.region,
						accountType: role,
					};
					await checkUsername(payload);
					setExistEmailMessage("");
				}
			} catch (error) {
				if (error.response) {
					setExistUsernameMessage(error.response?.data?.message);
				} else if (error.request) {
					toast.error("Internal Server Error");
				} else {
					toast.error("Error", error.message);
				}
			}
		}, 500),
		[role]
	);

	const checkEmailExist = useCallback(
		debounce(async (query) => {
			try {
				if (role && region) {
					const payload = {
						emailAddress: query,
						region: region.region,
						accountType: role,
					};
					await checkEmailAddress(payload);
					setExistEmailMessage("");
				}
			} catch (error) {
				if (error.response) {
					setExistEmailMessage(error.response?.data?.message);
				} else if (error.request) {
					toast.error("Internal Server Error");
				} else {
					toast.error("Error", error.message);
				}
			}
		}, 500),
		[role]
	);

	useEffect(() => {
		if (formik.values.username && !formik.errors.username) {
			checkUsernameExist(formik.values.username);
		}
		if (formik.values.email && !formik.errors.email) {
			checkEmailExist(formik.values.email);
		}
	}, [
		formik.values.username,
		formik.errors.username,
		formik.values.email,
		formik.errors.email,
	]);

	return (
		<div>
			<Box sx={{ mb: "1rem" }}>
				<Typography
					variant="body1"
					sx={{ textAlign: "center", fontWeight: 700 }}
				>
					Create an account
				</Typography>

				<Box
					component="form"
					sx={{
						padding: "3rem",
					}}
					noValidate
					autoComplete="off"
					onSubmit={formik.handleSubmit}
				>
					<Box sx={{ mb: "2rem" }}>
						<Box sx={{ mb: "1rem" }}>
							<TextFieldComponent
								value={formik.values.username}
								onChange={formik.handleChange}
								label="Username"
								id="username"
								name="username"
								required
								error={
									Boolean(existUsernameMessage) ||
									(formik.touched.username && Boolean(formik.errors.username))
								}
								helperText={
									existUsernameMessage ||
									(formik.touched.username && formik.errors.username)
								}
							/>
						</Box>
						{role === ROLES.PARTNER && (
							<Box sx={{ mb: "1rem" }}>
								<TextFieldComponent
									value={formik.values.merchantName}
									onChange={formik.handleChange}
									label="Merchant Name"
									id="merchantName"
									name="merchantName"
									required
									error={
										formik.touched.merchantName &&
										Boolean(formik.errors.merchantName)
									}
									helperText={
										formik.touched.merchantName && formik.errors.merchantName
									}
								/>
							</Box>
						)}
						<Box sx={{ mb: "1rem" }}>
							<TextFieldComponent
								value={formik.values.referralCode}
								onChange={formik.handleChange}
								label="Referral code (optional)"
								id="referralCode"
								name="referralCode"
							/>
						</Box>
						<Box sx={{ mb: "1rem" }}>
							<TextFieldComponent
								value={formik.values.email}
								onChange={formik.handleChange}
								label="Email"
								id="email"
								name="email"
								required
								error={
									Boolean(existEmailMessage) ||
									(formik.touched.email && Boolean(formik.errors.email))
								}
								helperText={
									existEmailMessage ||
									(formik.touched.email && formik.errors.email)
								}
							/>
						</Box>
						<Box sx={{ mb: "1rem" }}>
							<TextFieldComponent
								value={formik.values.phoneNumber}
								onChange={formik.handleChange}
								label="Phone Number"
								id="phoneNumber"
								name="phoneNumber"
								required
								error={
									formik.touched.phoneNumber &&
									Boolean(formik.errors.phoneNumber)
								}
								helperText={
									formik.touched.phoneNumber && formik.errors.phoneNumber
								}
							/>
						</Box>
						<Box sx={{ mb: "1rem" }}>
							<PasswordComponent
								value={formik.values.password}
								onChange={formik.handleChange}
								required
								error={
									formik.touched.password && Boolean(formik.errors.password)
								}
								helperText={formik.touched.password && formik.errors.password}
							/>
						</Box>
						<FormControlLabel
							control={
								<Checkbox
									checked={formik.values.isChecked}
									onChange={() =>
										formik.setFieldValue("isChecked", !formik.values.check)
									}
									name="terms"
								/>
							}
							label={
								<p>
									I accept Smart Deal's{" "}
									<span style={{ color: "#002564" }}>Terms and conditions</span>{" "}
									and Privacy policy
								</p>
							}
						/>
					</Box>

					<Button
						type="submit"
						variant="contained"
						color="primary"
						fullWidth
						sx={{ padding: "1rem" }}
						disabled={
							formik.isSubmitting ||
							Boolean(existUsernameMessage) ||
							Boolean(existEmailMessage)
						}
					>
						{formik.isSubmitting ? (
							<CircularProgress size="1.5rem" />
						) : (
							"create account"
						)}
					</Button>
				</Box>
			</Box>
		</div>
	);
};

export default SignUp;
