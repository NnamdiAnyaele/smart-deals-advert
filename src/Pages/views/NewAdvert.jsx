import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
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

import GridItem from "../../components/common/GridItem";
import NumberTextFieldComponent from "../../components/common/NumberTextField";
import SelectFieldComponent from "../../components/common/SelectFieldComponent";
import AdvertPositionDetails from "../../components/common/AdvertPositionDetails";
import Loader from "../../components/common/Loader";
import adsPreview from "../../assets/images/ad-homepage-positons.png";
import AdvertPreviewModal from "../../components/common/AdvertPreviewModal";
import { numberFormatter } from "../../utils/helpers/functions";
import { currencySymbolMap } from "../../utils/constants";
import { fetchAdvertPositionInfo, placeAdvert } from "../../api/advert";

const paddingStyles = {
	padding: {
		md: "3rem",
		sm: "3rem 1rem",
		xs: "3rem 1rem",
	},
};

const gridContainerStyles = { mb: "2rem" };

const selectFieldWidth = "18rem";

const flexContainerStyles = {
	display: "flex",
};

const advertPreviewContainerStyles = {
	display: "flex",
	justifyContent: "center",
	width: { sm: "40rem", xs: "22rem" },
	mt: "2rem",
	p: "1rem",
};

const adsImageContainer = {
	width: { sm: "39rem", xs: "21rem" },
	height: { sm: "130rem", xs: "70rem" },
};

const advertDetailsContainerStyles = {
	mb: "2rem",
};

const buttonStyles = {
	textTransform: "capitalize",
	width: "18rem",
	p: "0.7rem",
};

const validationSchema = yup.object({
	position: yup.number().required("Advert position is required"),
	days: yup.string().required("Number of days is required"),
});

const initialValues = {
	position: 1,
	days: "",
};

const advertPositions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const NewAdvert = () => {
	const { user } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	const [advertImage, setAdvertImage] = useState({
		file: "",
		preview: "",
	});
	const [advertPreviewModalOpen, setAdvertPreviewModalOpen] = useState(false);

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: (values) => {
			handleSubmit(
				values,
				() => formik.setSubmitting(false),
				() => formik.resetForm()
			);
		},
	});

	const { mutate: submitAdvert, isLoading: submitAdvertLoading } = useMutation(
		"place-advert",
		placeAdvert,
		{
			onSuccess: (data) => {
				toast.success(data?.message);
				navigate("/customer/advert-history");
			},
			onError: (error) => {
				if (error.response) {
					toast.error(error.response.data.message);
				} else if (error.request) {
					toast.error("Internal Server Error");
				} else {
					toast.error("Error", error.message);
				}
			},
		}
	);

	const handleSubmit = async (values, setSubmitting, resetForm) => {
		if (!values.days) {
			toast.error("Please select number of days");
			return;
		}

		const formData = new FormData();
		formData.append("customerID", user?.customerID);
		formData.append("files", advertImage.file);
		formData.append("username", user?.username);
		formData.append("emailAddress", user?.emailAddress);
		formData.append("phoneNumber", user?.phoneNumber);
		formData.append("amount", advertsData?.amount);
		formData.append("region", user?.region);
		formData.append("position", values?.position);
		formData.append("days", values?.days);

		await submitAdvert(formData);
		setSubmitting(false);
		resetForm();
	};

	const {
		data: advertsData = {},
		isLoading: advertsLoading,
		isError: advertsError,
		error: advertsErrorMessage,
	} = useQuery(
		[
			"fetch-advert-position-info",
			{ position: formik.values.position, region: user.region },
		],
		async () =>
			fetchAdvertPositionInfo({
				position: formik.values.position,
				region: user.region,
			}),
		{
			select: (data) => data.data,
			staleTime: 4 * 60 * 1000,
			enabled: Boolean(formik.values.position) && Boolean(user.region),
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
		if (file.size > 1000000) {
			toast.error("file is too large, max size 1mb");
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
		<Box sx={paddingStyles}>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
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
					}}
				>
					ads setup
				</Typography>
			</Box>

			<Box
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

				{advertsLoading && <Loader />}

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
								title="amount per day"
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
								title="proportion"
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
			</Box>

			<Box sx={advertPreviewContainerStyles}>
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
			</Box>

			<AdvertPreviewModal
				open={advertPreviewModalOpen}
				handleClose={() => setAdvertPreviewModalOpen(false)}
			/>
		</Box>
	);
};

export default NewAdvert;
