import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import closeIcon from "../../assets/icons/close-icon.svg";
import logo from "../../assets/logos/smart-deals-logo.svg";

export default function ResponsiveDialog({
	open,
	handleClose,
	title,
	subtitle,
	handleDelete,
	loading,
}) {
	const handlesubmit = async (e) => {
		e.preventDefault();
		await handleDelete();
	};

	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
				sx={{
					borderRadius: "50px",
					"& .MuiDialog-paper": {
						borderRadius: "50px",
					},
				}}
			>
				<DialogTitle id="responsive-dialog-title">
					<Box
						sx={{
							display: "flex",
							justifyContent: "flex-end",
						}}
					>
						<Button
							variant="text"
							sx={{ height: "3rem", width: "3rem" }}
							onClick={handleClose}
							endIcon={
								<img
									src={closeIcon}
									height="100%"
									width="100%"
									alt="close modal"
								/>
							}
						/>
					</Box>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Box sx={{ height: "5.25rem" }}>
							<img
								src={logo}
								height="100%"
								width="auto"
								alt="Cardinalstone logo"
							/>
						</Box>
						<Typography
							variant="h6"
							component="div"
							sx={{ color: "primary.main", fontWeight: 700 }}
						>
							{title}
						</Typography>
						<Typography
							variant="h6"
							gutterBottom
							component="div"
							sx={{ color: "primary.main", fontWeight: 700 }}
						>
							{subtitle}
						</Typography>
					</Box>
				</DialogTitle>
				<DialogContent
					sx={{
						paddingLeft: "2rem",
						paddingRight: "2rem",
						textAlign: "center",
					}}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							marginBottom: "1rem",
						}}
					>
						<Box
							component="form"
							sx={{
								"& .MuiTextField-root": { m: 1, width: "45ch" },
							}}
							noValidate
							autoComplete="off"
							onSubmit={handlesubmit}
						>
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									marginTop: "1rem",
								}}
							>
								<Stack direction="row" spacing={2} sx={{ alignSelf: "center" }}>
									<Button
										sx={{
											backgroundColor: "#10AF6A",
											paddingLeft: "2rem",
											paddingRight: "2rem",
											"&:hover": {
												backgroundColor: "#0a6940",
											},
										}}
										variant="contained"
										type="submit"
										disabled={loading}
									>
										{loading ? (
											<CircularProgress size="1.5rem" sx={{ color: "#fff" }} />
										) : (
											"confirm deletion"
										)}
									</Button>
									<Button
										sx={{
											backgroundColor: "primary.main",
											paddingLeft: "3rem",
											paddingRight: "3rem",
										}}
										variant="contained"
										onClick={() => {
											handleClose();
										}}
									>
										cancel
									</Button>
								</Stack>
							</Box>
						</Box>
					</Box>
				</DialogContent>
			</Dialog>
		</div>
	);
}
