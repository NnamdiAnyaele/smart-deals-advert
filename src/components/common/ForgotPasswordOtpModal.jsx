import OtpInput from "react-otp-input";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import useMediaQuery from "@mui/material/useMediaQuery";

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
};

const errorStyle = {
	color: "red",
	border: "1px solid red !important",
};

const ForgotPasswordOtpModal = ({
	open,
	handleClose,
	otp,
	setOtp,
	handleOtpResend,
	handleOtpVerify,
	verifyLoading,
	time,
}) => {
	const matches = useMediaQuery("(min-width:700px)");

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
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Box
					sx={{
						m: "2rem 0",
						display: "flex",
						justifyContent: "center",
					}}
				>
					<Box>
						<Typography variant="body1">
							Please enter the OTP sent to your email
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

				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					{time.days + time.hours + time.minutes + time.seconds > 0 && (
						<Typography variant="body1" component="div" sx={{ mb: "1rem" }}>
							Resend code in{" "}
							<Typography variant="body1" color="secondary" component="span">
								{`(00:${
									time.seconds > 0
										? String(time.seconds).padStart(2, "0")
										: "00"
								})`}
							</Typography>
						</Typography>
					)}

					{time.days + time.hours + time.minutes + time.seconds <= 0 && (
						<Button
							variant="text"
							color="secondary"
							sx={{ mb: "1rem" }}
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
						disabled={verifyLoading}
					>
						{verifyLoading ? (
							<CircularProgress color="primary" size="1.5rem" />
						) : (
							"verify"
						)}
					</Button>
				</Box>
			</Box>
		</Modal>
	);
};

export default ForgotPasswordOtpModal;
