import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import TextFieldComponent from "./TextFieldComponent";
import PasswordComponent from "./PasswordComponent";
import {
	specialCharacterCheck,
	digitCheck,
	uppercaseCheck,
} from "../../utils/constants";

const validationSchema = yup.object({
	username: yup
		.string("Please enter your username")
		.min(3, "Username should be of minimum 3 characters length")
		.required("Username is required"),
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

const Login = ({ loginFields, handleSubmit }) => {
	const formik = useFormik({
		initialValues: loginFields,
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
		<div>
			<Box>
				<Typography
					variant="body1"
					sx={{ textAlign: "center", fontWeight: 700, color: "#5F5F5F" }}
				>
					Enter your login details
				</Typography>

				<Box
					component="form"
					sx={{
						p: { md: "3rem", xs: "1rem" },
					}}
					noValidate
					autoComplete="off"
					onSubmit={formik.handleSubmit}
				>
					<Box>
						<Box sx={{ mb: "1rem" }}>
							<TextFieldComponent
								value={formik.values.username}
								onChange={formik.handleChange}
								label="Username"
								id="username"
								name="username"
								required
								error={
									formik.touched.username && Boolean(formik.errors.username)
								}
								helperText={formik.touched.username && formik.errors.username}
							/>
						</Box>
						<Box>
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
					</Box>

					<Box sx={{ display: "flex", mb: "1rem" }}>
						<Button
							variant="text"
							component={Link}
							to="/forgot-password"
							sx={{ textTransform: "none", marginLeft: "auto" }}
							color="secondary"
						>
							Forgot password
						</Button>
					</Box>

					<Button
						type="submit"
						variant="contained"
						color="primary"
						fullWidth
						sx={{ padding: "1rem" }}
						disabled={formik.isSubmitting}
					>
						{formik.isSubmitting ? <CircularProgress size="1.5rem" /> : "login"}
					</Button>
				</Box>
			</Box>
		</div>
	);
};

export default Login;
