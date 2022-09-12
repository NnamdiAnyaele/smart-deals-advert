import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PictureInPictureIcon from "@mui/icons-material/PictureInPicture";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import SettingsOverscanIcon from "@mui/icons-material/SettingsOverscan";
import InputAdornment from "@mui/material/InputAdornment";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";

// import GridItem from "../../components/common/GridItem";
import NumberTextFieldComponent from "../../components/common/NumberTextField";
import TextFieldComponent from "../../components/common/TextFieldComponent";
import AdvertPositionDetails from "../../components/common/AdvertPositionDetails";
// import adsPreview from "../../assets/images/ad-homepage-positons.png";
import AdvertPreviewModal from "../../components/common/AdvertPreviewModal";
import AdvertPositionCard from "../../components/common/AdvertPositionCard";
import TopMerchants from "../../components/Home/TopMerchants";
import { numberFormatter } from "../../utils/helpers/functions";
import { currencySymbolMap } from "../../utils/constants";
import navigationImage from "../../assets/images/advert-page/navigation.png";
import threeStepsImage from "../../assets/images/advert-page/three-steps.png";
import ongoingDealsImage from "../../assets/images/advert-page/ongoing-deals.png";
import popularDealsImage from "../../assets/images/advert-page/popular-deals.png";
import homepageMidImage from "../../assets/images/advert-page/homepage-mid.png";
import footerImage from "../../assets/images/advert-page/footer.png";
import { fetchAdvertPositionInfo, placeAdvert } from "../../api/advert";

const styles = {
	padding: {
		md: "1rem",
		sm: "1rem 1rem",
		xs: "1rem 1rem",
	},
	"&::-webkit-scrollbar": { width: 0 },
	scrollbarWidth: "none",
};

// const gridContainerStyles = { mb: "2rem" };

const selectFieldWidth = "18rem";

const flexContainerStyles = {
	display: "flex",
};

// const advertPreviewContainerStyles = {
// 	display: "flex",
// 	justifyContent: "center",
// 	width: { sm: "40rem", xs: "22rem" },
// 	p: "1rem",
// };

// const adsImageContainer = {
// 	width: { sm: "39rem", xs: "21rem" },
// 	height: { sm: "130rem", xs: "70rem" },
// };

const advertDetailsContainerStyles = {
	mb: "1rem",
	width: "18rem",
};

const buttonStyles = {
	textTransform: "capitalize",
	width: "18rem",
	p: "0.7rem",
};

const advertImageContainerStyles = { width: "100%", height: "auto" };

const bottomAdvertgroupStyles = { m: "2rem 0" };

const bottomAdvertStyles = { height: "13rem" };

const formFieldStyles = {
	width: "18rem",
	mb: "1rem",
};

const loaderStyles = {
	display: "flex",
	alignItems: "center",
	flexGrow: 1,
	m: "2rem 0",
	p: "0 1rem",
};

const validationSchema = yup.object({
	title: yup.string().required("Advert title is required"),
	days: yup.string().required("Number of days is required"),
});

const initialValues = {
	title: "",
	days: "",
};

// const advertPositions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const fileSizeFormatter = (size) => {
	if (!size) {
		return "";
	}
	const sizeNumber = size.split("mb")[0];
	return sizeNumber * 1000000;
};

const intialFileValues = {
	file: "",
	preview: "",
};

const NewAdvert = () => {
	const { user } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const [advertImage, setAdvertImage] = useState(intialFileValues);
	const [advertPreviewModalOpen, setAdvertPreviewModalOpen] = useState(false);
	const [selectedPosition, setSelectedPosition] = useState("");

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: (values) => {
			handleSubmit(values);
		},
	});

	const { mutate: submitAdvert, isLoading: submitAdvertLoading } = useMutation(
		"place-advert",
		placeAdvert,
		{
			onSuccess: (data) => {
				toast.success(data?.message);
				formik.setSubmitting(false);
				formik.resetForm();
				setAdvertImage(intialFileValues);
				navigate("/customer/advert-history");
			},
			onError: (error) => {
				formik.setSubmitting(false);
				if (error.response) {
					toast.error(error.response.data.message);
				} else if (error.request) {
					toast.error("Internal Server Error");
				} else {
					toast.error("Error", error.message);
				}
			},
			onSettled: () => {
				queryClient.invalidateQueries("fetch-adverts");
				queryClient.invalidateQueries("fetch-approved-adverts");
			},
		}
	);

	const handleSubmit = async (values) => {
		if (!values.days) {
			toast.error("Please select number of days");
			return;
		}

		const formData = new FormData();
		formData.append("customerID", user?.customerID);
		formData.append("files", advertImage.file);
		formData.append("username", user?.username);
		formData.append("fullName", user?.fullName || "NA");
		formData.append("emailAddress", user?.emailAddress);
		formData.append("phoneNumber", user?.phoneNumber);
		formData.append("amount", advertsData?.amount);
		formData.append("region", user?.region);
		formData.append("position", selectedPosition);
		formData.append("days", values?.days);
		formData.append("title", values?.title);

		await submitAdvert(formData);
	};

	const {
		data: advertsData = {},
		isLoading: advertsLoading,
		isError: advertsError,
		error: advertsErrorMessage,
	} = useQuery(
		[
			"fetch-advert-position-info",
			{ position: selectedPosition, region: user.region },
		],
		async () =>
			fetchAdvertPositionInfo({
				position: selectedPosition,
				region: user.region,
			}),
		{
			select: (data) => data.data,
			staleTime: 4 * 60 * 1000,
			enabled: Boolean(selectedPosition) && Boolean(user.region),
		}
	);

	useEffect(() => {
		if (advertsError) {
			if (advertsErrorMessage.response) {
				toast.error(advertsErrorMessage.response.data?.message);
			} else if (advertsErrorMessage.request) {
				toast.error("Internal Server Error");
			} else {
				toast.error("Error", advertsErrorMessage.message);
			}
		}
	}, [advertsError, advertsErrorMessage]);

	const handleImageChange = (e) => {
		e.preventDefault();

		const reader = new FileReader();
		const file = e.target.files[0];
		const fileLimit = fileSizeFormatter(advertsData?.size);
		if (file.size > fileLimit) {
			toast.error(`file is too large, max size ${advertsData?.size}`);
			return;
		}
		reader.onloadend = () => {
			setAdvertImage({
				...advertImage,
				file,
				preview: reader.result,
			});
		};

		reader.readAsDataURL(file);
	};

	return (
		<Box sx={styles}>
			{/* <Box
				sx={{ width: { sm: "40rem", xs: "22rem" } }}
				component="form"
				noValidate
				autoComplete="off"
				onSubmit={formik.handleSubmit}
			>
				<Box sx={gridContainerStyles}>
					<Grid container spacing={2}>
						<GridItem>
							<SelectFieldComponent
								width={selectFieldWidth}
								values={advertPositions}
								value={formik.values.position}
								onChange={formik.handleChange}
								label="Advert Position"
								id="position"
								name="position"
								error={
									formik.touched.position && Boolean(formik.errors.position)
								}
								helperText={formik.touched.position && formik.errors.position}
							/>
						</GridItem>
					</Grid>
				</Box>

				{advertsLoading && (
					<Box sx={{ mb: "2rem" }}>
						<Loader />
					</Box>
				)}

				{!advertsLoading && (
					<Box sx={advertDetailsContainerStyles}>
						<Box sx={flexContainerStyles}>
							<AdvertPositionDetails
								Icon={PictureInPictureIcon}
								title="position"
								details={formik.values.position}
							/>
							<AdvertPositionDetails
								Icon={AttachMoneyIcon}
								title="cost per day"
								details={`${currencySymbolMap[user.region]} ${
									numberFormatter(advertsData?.amount) || 0
								}`}
								color="#a65413"
							/>
						</Box>

						<Box sx={flexContainerStyles}>
							<AdvertPositionDetails
								Icon={AspectRatioIcon}
								title="size"
								details={advertsData?.size}
								color="#A790A6"
							/>
							<AdvertPositionDetails
								Icon={SettingsOverscanIcon}
								title="dimension"
								details={
									advertsData?.width &&
									advertsData?.height &&
									`${advertsData?.width} x ${advertsData?.height}`
								}
								color="#3C9A9D"
							/>
						</Box>
					</Box>
				)}

				<Box sx={{ mb: "3rem" }}>
					<Grid container spacing={2}>
						<GridItem>
							<TextField
								id="advert-image"
								label={advertImage?.file?.name || "Advert image"}
								onChange={handleImageChange}
								variant="outlined"
								type="file"
								helperText={`Rec: ${advertsData?.width} x ${advertsData?.height}  png (max 1mb)`}
								sx={{
									input: {
										opacity: 0,
									},
								}}
								InputLabelProps={{
									shrink: false,
								}}
								inputProps={{
									accept: "image/png",
								}}
								// eslint-disable-next-line react/jsx-no-duplicate-props
								InputProps={{
									endAdornment: (
										<InputAdornment position="start">
											<FileUploadOutlinedIcon />
										</InputAdornment>
									),
								}}
							/>
						</GridItem>
						<GridItem>
							<NumberTextFieldComponent
								width={selectFieldWidth}
								value={formik.values.days}
								onChange={formik.handleChange}
								label="Duration (days)"
								id="days"
								name="days"
								required
								error={formik.touched.days && Boolean(formik.errors.days)}
								helperText={formik.touched.days && formik.errors.days}
							/>
						</GridItem>
					</Grid>
				</Box>

				<Box
					sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
				>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						sx={buttonStyles}
					>
						{submitAdvertLoading ? (
							<CircularProgress size="1.5rem" sx={{ color: "#fff" }} />
						) : (
							"submit"
						)}
					</Button>
				</Box>
			</Box> */}

			{/* <Box sx={advertPreviewContainerStyles}>
				<Box>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							mb: "2rem",
						}}
					>
						<Typography
							variant="h6"
							sx={{
								fontWeight: 700,
								textTransform: "capitalize",
								mr: "auto",
								whiteSpace: { sm: "nowrap" },
								textAlign: "center",
							}}
						>
							preview
						</Typography>
					</Box>

					<Card onClick={() => setAdvertPreviewModalOpen(true)}>
						<Box sx={adsImageContainer}>
							<img
								src={adsPreview}
								alt="advert preview"
								width="100%"
								height="auto"
							/>
						</Box>
					</Card>

					<Typography
						variant="body1"
						color="primary"
						sx={{ mt: "1rem", textAlign: "center" }}
						onClick={() => setAdvertPreviewModalOpen(true)}
					>
						Click to zoom
					</Typography>
				</Box>
			</Box> */}

			{/* new layout */}
			<Box>
				<Grid container spacing={2}>
					<Grid item xs={12} md={7}>
						<Box sx={{ mb: "2rem" }}>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Typography
									variant="h6"
									sx={{
										fontWeight: 700,
										textTransform: "capitalize",
										mr: "auto",
										whiteSpace: { sm: "nowrap" },
										textAlign: "center",
									}}
								>
									preview
								</Typography>
							</Box>
							<Typography
								variant="body1"
								sx={{ mt: "1rem", textAlign: "center" }}
							>
								Click to on advert position to select
							</Typography>
						</Box>

						<Card>
							<Box>
								<Box sx={{ p: "1rem" }}>
									<Box sx={advertImageContainerStyles}>
										<img
											src={navigationImage}
											alt=""
											width="100%"
											height="auto"
										/>
									</Box>
									{/* top dvert groups */}
									<Box sx={{ m: "0  0 2rem 0" }}>
										<Grid container spacing={2} sx={{ height: "13rem" }}>
											<Grid item xs={8}>
												<AdvertPositionCard
													number={1}
													isSelected={selectedPosition === 1}
													onPositionSelect={() => setSelectedPosition(1)}
												/>
											</Grid>
											<Grid item xs={2}>
												<Box
													sx={{
														display: "flex",
														flexDirection: "column",
														height: "100%",
														gap: "0.5rem",
													}}
												>
													<AdvertPositionCard
														number={2}
														isSelected={selectedPosition === 2}
														onPositionSelect={() => setSelectedPosition(2)}
													/>
													<AdvertPositionCard
														number={3}
														isSelected={selectedPosition === 3}
														onPositionSelect={() => setSelectedPosition(3)}
													/>
												</Box>
											</Grid>
											<Grid item xs={2}>
												<Box
													sx={{
														display: "flex",
														flexDirection: "column",
														height: "100%",
														gap: "0.5rem",
													}}
												>
													<AdvertPositionCard
														number={4}
														isSelected={selectedPosition === 4}
														onPositionSelect={() => setSelectedPosition(4)}
													/>
													<AdvertPositionCard
														number={5}
														isSelected={selectedPosition === 5}
														onPositionSelect={() => setSelectedPosition(5)}
													/>
												</Box>
											</Grid>
										</Grid>
									</Box>
									<Box sx={advertImageContainerStyles}>
										<img
											src={threeStepsImage}
											alt=""
											width="100%"
											height="auto"
										/>
									</Box>
									<Box sx={advertImageContainerStyles}>
										<img
											src={ongoingDealsImage}
											alt=""
											width="100%"
											height="auto"
										/>
									</Box>
									<Box sx={advertImageContainerStyles}>
										<img
											src={popularDealsImage}
											alt=""
											width="100%"
											height="auto"
										/>
									</Box>
									<Box sx={{ height: "5rem", width: "100%", m: "2rem 0" }}>
										<AdvertPositionCard
											number={6}
											isSelected={selectedPosition === 6}
											onPositionSelect={() => setSelectedPosition(6)}
										/>
									</Box>
									<Box sx={advertImageContainerStyles}>
										<img
											src={homepageMidImage}
											alt=""
											width="100%"
											height="auto"
										/>
									</Box>
									{/* bottom advert groups */}
									<Box sx={bottomAdvertgroupStyles}>
										<Grid container spacing={2}>
											<Grid item xs={3}>
												<Box sx={bottomAdvertStyles}>
													<AdvertPositionCard
														number={7}
														isSelected={selectedPosition === 7}
														onPositionSelect={() => setSelectedPosition(7)}
													/>
												</Box>
											</Grid>
											<Grid item xs={3}>
												<Box sx={bottomAdvertStyles}>
													<AdvertPositionCard
														number={8}
														isSelected={selectedPosition === 8}
														onPositionSelect={() => setSelectedPosition(8)}
													/>
												</Box>
											</Grid>
											<Grid item xs={3}>
												<Box sx={bottomAdvertStyles}>
													<AdvertPositionCard
														number={9}
														isSelected={selectedPosition === 9}
														onPositionSelect={() => setSelectedPosition(9)}
													/>
												</Box>
											</Grid>
											<Grid item xs={3}>
												<Box sx={bottomAdvertStyles}>
													<AdvertPositionCard
														number={10}
														isSelected={selectedPosition === 10}
														onPositionSelect={() => setSelectedPosition(10)}
													/>
												</Box>
											</Grid>
										</Grid>
									</Box>

									{/* top merchants */}
									<TopMerchants smallDisplay />
								</Box>
								<Box sx={advertImageContainerStyles}>
									<img src={footerImage} alt="" width="100%" height="auto" />
								</Box>
							</Box>
						</Card>
					</Grid>

					{/* advert details */}
					<Grid item xs={12} md={5}>
						<Box
							sx={{
								width: { sm: "40rem", xs: "22rem" },
								position: "sticky",
								top: "10%",
							}}
							component="form"
							noValidate
							autoComplete="off"
							onSubmit={formik.handleSubmit}
						>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									mb: "0.5rem",
								}}
							>
								<Typography
									variant="h6"
									sx={{
										fontWeight: 700,
										textTransform: "capitalize",
										mr: "auto",
										whiteSpace: { sm: "nowrap" },
										textAlign: "center",
									}}
								>
									advert details
								</Typography>
							</Box>

							{advertsLoading && (
								<Box sx={loaderStyles}>
									<CircularProgress sx={{ color: "primary.main" }} />
								</Box>
							)}

							{!advertsLoading && (
								<Box sx={advertDetailsContainerStyles}>
									<Box sx={flexContainerStyles}>
										<AdvertPositionDetails
											Icon={PictureInPictureIcon}
											title="position"
											details={selectedPosition}
										/>
										<AdvertPositionDetails
											Icon={AttachMoneyIcon}
											title="cost per day"
											details={`${currencySymbolMap[user.region]} ${
												numberFormatter(advertsData?.amount) || 0
											}`}
											color="#a65413"
										/>
									</Box>

									<Box sx={flexContainerStyles}>
										<AdvertPositionDetails
											Icon={AspectRatioIcon}
											title="size"
											details={advertsData?.size}
											color="#A790A6"
										/>
										<AdvertPositionDetails
											Icon={SettingsOverscanIcon}
											title="dimension"
											details={
												advertsData?.width &&
												advertsData?.height &&
												`${advertsData?.width} x ${advertsData?.height}`
											}
											color="#3C9A9D"
										/>
									</Box>
								</Box>
							)}

							<Box>
								<Box sx={formFieldStyles}>
									<Box sx={formFieldStyles}>
										<TextFieldComponent
											width={selectFieldWidth}
											value={formik.values.title}
											onChange={formik.handleChange}
											label="Title"
											id="title"
											name="title"
											required
											error={
												formik.touched.title && Boolean(formik.errors.title)
											}
											helperText={formik.touched.title && formik.errors.title}
										/>
									</Box>

									<TextField
										id="advert-image"
										label={advertImage?.file?.name || "Advert image"}
										onChange={handleImageChange}
										variant="outlined"
										type="file"
										helperText={`Rec: ${advertsData?.width} x ${advertsData?.height}  png (max ${advertsData?.size})`}
										sx={{
											input: {
												opacity: 0,
											},
										}}
										InputLabelProps={{
											shrink: false,
										}}
										inputProps={{
											accept: "image/png",
										}}
										// eslint-disable-next-line react/jsx-no-duplicate-props
										InputProps={{
											endAdornment: (
												<InputAdornment position="start">
													<FileUploadOutlinedIcon />
												</InputAdornment>
											),
										}}
									/>
								</Box>

								<Box sx={formFieldStyles}>
									<NumberTextFieldComponent
										width={selectFieldWidth}
										value={formik.values.days}
										onChange={formik.handleChange}
										label="Duration (days)"
										id="days"
										name="days"
										required
										error={formik.touched.days && Boolean(formik.errors.days)}
										helperText={formik.touched.days && formik.errors.days}
									/>
								</Box>
							</Box>

							<Box
								sx={{
									display: "flex",
									marginTop: "2rem",
								}}
							>
								<Button
									type="submit"
									variant="contained"
									color="primary"
									sx={buttonStyles}
								>
									{submitAdvertLoading ? (
										<CircularProgress size="1.5rem" sx={{ color: "#fff" }} />
									) : (
										"submit"
									)}
								</Button>
							</Box>
						</Box>
					</Grid>
				</Grid>
			</Box>

			<AdvertPreviewModal
				open={advertPreviewModalOpen}
				handleClose={() => setAdvertPreviewModalOpen(false)}
			/>
		</Box>
	);
};

export default NewAdvert;
