import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import UploadIcon from "@mui/icons-material/Upload";

import TextFieldComponent from "../../components/common/TextFieldComponent";
import SelectFieldComponent from "../../components/common/SelectFieldComponent";
import GridItem from "../../components/common/GridItem";
import ProfilePictureModal from "../../components/common/ProfilePictureModal";
import { getCountry, getState, getCity } from "../../api/common/location";
import { storeProfileImage, updateProfile } from "../../api/user";
import { updateProfilePhoto } from "../../slices/authSlice";
import { getCurrentUser } from "../../api/common/auth";
import { USERKEY, PROFILEPHOTOKEY } from "../../utils/constants";

const profileUpdateStyles = {
	padding: {
		md: "3rem",
		sm: "3rem 1rem",
		xs: "3rem 1rem",
	},
	display: "flex",
	flexDirection: "column",
	alignItems: {
		xs: "center",
		sm: "flex-start",
	},
};

const profileAvatarContainerStyles = {
	width: "10rem",
	height: "10rem",
	p: "1rem",
	border: "1px solid #E41F26",
	borderRadius: "50%",
	display: "flex",
	alignItems: "center",
	position: "relative",
};

const profileImageStyles = {
	objectFit: "cover",
	borderRadius: "50%",
};

const profileIconStyles = {
	fontSize: "10rem",
};

const cameraIconstyles = {
	position: "absolute",
	right: "10%",
	bottom: "0%",
	fontSize: "2rem",
};

const pictureCaptionStyles = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

const gridContainerStyles = { mb: "1rem" };

const buttonStyles = {
	textTransform: "capitalize",
	width: "18rem",
	p: "0.7rem",
};

const selectFieldWidth = "18rem";

const genderOptions = [
	{ value: 1, label: "male" },
	{ value: 2, label: "female" },
];

const validationSchema = yup.object({
	firstName: yup
		.string("Please enter first name")
		.min(3, "Firsyyname should be of minimum 3 characters length")
		.required("First name is required"),
	lastName: yup
		.string("Please enter last name")
		.min(3, "last should be of minimum 3 characters length")
		.required("Last name is required"),
	phoneNumber: yup
		.string("Please enter your phone number")
		.min(10, "Phone number should be of minimum 10 characters length")
		.required("Phone number is required"),
	country: yup
		.string("Please choose your country")
		.required("Country is required"),
	state: yup.string("Please choose your state").required("State is required"),
	city: yup.string("Please choose your city").required("City is required"),
	address: yup
		.string("Please enter address")
		.min(3, "Address should be of minimum 3 characters length")
		.required("Address is required"),
	gender: yup.string("Please choose gender").required("Gender is required"),
	igHandle: yup
		.string("Please enter Instagram handle")
		.required("Instagram handle is required"),
	twitterHandle: yup
		.string("Please enter Twitter handle")
		.required("Twitter  is required"),
	facebookHandle: yup
		.string("Please enter Facebook handle")
		.required("Facebook handle is required"),
});

const profileFields = {
	username: "",
	firstName: "",
	lastName: "",
	emailAddress: "",
	phoneNumber: "",
	country: "",
	state: "",
	city: "",
	address: "",
	gender: "",
	igHandle: "",
	twitterHandle: "",
	facebookHandle: "",
};

const ProfileUpdate = () => {
	const { user, role } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [countryId, setCountryId] = useState("");
	const [stateId, setStateId] = useState("");
	const [openProfilePictureModal, setOpenProfilePictureModal] = useState(false);
	const [profileDetails, setProfileDetails] = useState(profileFields);

	const formik = useFormik({
		initialValues: profileDetails,
		validationSchema,
		onSubmit: (values) => {
			handleSubmit(
				values,
				() => formik.setSubmitting(false),
				() => formik.resetForm()
			);
		},
		enableReinitialize: true,
	});

	const {
		data: countriesData = [],
		// isLoading: countriesLoading,
		isError: fetchCountriesError,
		error: fetchCountriesErrorMessage,
	} = useQuery(["get-country"], async () => getCountry(), {
		select: (data) => data,
		staleTime: Infinity,
	});

	const {
		data: statesData = [],
		// isLoading: statesLoading,
		isError: fetchStatesError,
		error: fetchStatesErrorMessage,
	} = useQuery(
		["get-state", countryId],
		async () => getState(countryId, user.region),
		{
			select: (data) => data,
			staleTime: Infinity,
			enabled: Boolean(countryId) && Boolean(user.region),
		}
	);

	const {
		data: citiesData = [],
		// isLoading: CityLoading,
		isError: fetchCitiesError,
		error: fetchCitiesErrorMessage,
	} = useQuery(
		["get-city", stateId],
		async () => getCity(stateId, user.region),
		{
			select: (data) => data.sort((a, b) => a.name.localeCompare(b.name)),
			staleTime: Infinity,
			enabled: Boolean(stateId) && Boolean(user.region),
		}
	);

	useEffect(() => {
		if (fetchCountriesError) {
			if (fetchCountriesErrorMessage.response) {
				toast.error(fetchCountriesErrorMessage.response.data?.message);
			} else if (fetchCountriesErrorMessage.request) {
				toast.error("Internal Server Error");
			} else {
				toast.error("Error", fetchCountriesErrorMessage.message);
			}
		}
		if (fetchStatesError) {
			if (fetchStatesErrorMessage.response) {
				toast.error(fetchStatesErrorMessage.response.data?.message);
			} else if (fetchStatesErrorMessage.request) {
				toast.error("Internal Server Error");
			} else {
				toast.error("Error", fetchStatesErrorMessage.message);
			}
		}
		if (fetchCitiesError) {
			if (fetchCitiesErrorMessage.response) {
				toast.error(fetchCitiesErrorMessage.response.data?.message);
			} else if (fetchCitiesErrorMessage.request) {
				toast.error("Internal Server Error");
			} else {
				toast.error("Error", fetchCitiesErrorMessage.message);
			}
		}
	}, [
		fetchCountriesError,
		fetchCountriesErrorMessage,
		fetchStatesError,
		fetchStatesErrorMessage,
		fetchCitiesError,
		fetchCitiesErrorMessage,
	]);

	useEffect(() => {
		if (countriesData.length && formik.values.country) {
			const selectedCountry = countriesData.find(
				(item) =>
					item?.name?.toLowerCase() === formik.values?.country?.toLowerCase()
			);
			setCountryId(selectedCountry?.ID);
		}
	}, [countriesData, formik.values.country]);

	useEffect(() => {
		if (statesData.length && formik.values.state) {
			const selectedState = statesData.find(
				(item) =>
					item?.name?.toLowerCase() === formik.values.state?.toLowerCase()
			);
			setStateId(selectedState?.ID);
		}
	}, [statesData, formik.values.state]);

	useEffect(() => {
		if (user) {
			setProfileDetails({
				username: user?.username || "",
				firstName: user?.firstName || "",
				lastName: user?.lastName || "",
				emailAddress: user?.emailAddress || "",
				phoneNumber: user?.phoneNumber || "",
				country: user?.country || "",
				state: user?.state || "",
				city: user?.city || "",
				address: user?.address || "",
				gender: user?.gender || "",
				igHandle: user?.igHandle || "",
				twitterHandle: user?.twitterHandle || "",
				facebookHandle: user?.facebookHandle || "",
			});
		}
	}, [user]);

	const { mutate: addImage, isLoading: addImageLoading } = useMutation(
		"save-image",
		storeProfileImage,
		{
			onSuccess: (data) => {
				toast.success(data?.message);
				dispatch(updateProfilePhoto(data?.url));
				const currentUser = getCurrentUser(USERKEY);
				currentUser[PROFILEPHOTOKEY] = data?.url;
				localStorage.setItem(USERKEY, JSON.stringify(currentUser));
				setOpenProfilePictureModal(false);
				window.location.reload();
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

	const { mutate: editProfile, isLoading: editProfileLoading } = useMutation(
		"update-profile",
		updateProfile,
		{
			onSuccess: (data) => {
				toast.success(data?.message);
				navigate("/customer/dashboard");
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
		const payload = {
			...values,
			accountType: role,
			region: user?.region,
		};
		await editProfile(payload);
		setSubmitting(false);
		resetForm();
	};

	return (
		<Box sx={profileUpdateStyles}>
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
					update profile
				</Typography>
			</Box>

			<Box sx={{ mb: "3rem" }} onClick={() => setOpenProfilePictureModal(true)}>
				<Box sx={profileAvatarContainerStyles}>
					{user?.partnerLogo ? (
						<img
							src={user?.partnerLogo}
							alt="avatar"
							width="100%"
							height="100%"
							style={profileImageStyles}
						/>
					) : (
						<AccountCircleIcon color="primary" sx={profileIconStyles} />
					)}
					<CameraAltIcon color="primary" sx={cameraIconstyles} />
				</Box>

				<Box sx={pictureCaptionStyles}>
					<Typography variant="body2" align="center">
						Upload new picture
					</Typography>
					<UploadIcon />
				</Box>
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
							<TextField
								sx={{ width: selectFieldWidth }}
								value={formik.values.username}
								label="Username"
								id="username"
								name="username"
								readOnly
							/>
						</GridItem>
						<GridItem>
							<TextFieldComponent
								width={selectFieldWidth}
								value={formik.values.firstName}
								onChange={formik.handleChange}
								label="First Name"
								id="firstName"
								name="firstName"
								required
								error={
									formik.touched.firstName && Boolean(formik.errors.firstName)
								}
								helperText={formik.touched.firstName && formik.errors.firstName}
							/>
						</GridItem>
					</Grid>
				</Box>

				<Box sx={gridContainerStyles}>
					<Grid container spacing={2}>
						<GridItem>
							<TextFieldComponent
								width={selectFieldWidth}
								value={formik.values.lastName}
								onChange={formik.handleChange}
								label="Last Name"
								id="lastName"
								name="lastName"
								required
								error={
									formik.touched.lastName && Boolean(formik.errors.lastName)
								}
								helperText={formik.touched.lastName && formik.errors.lastName}
							/>
						</GridItem>
						<GridItem>
							<TextField
								sx={{ width: selectFieldWidth }}
								value={formik.values.emailAddress}
								label="Email"
								id="emailAddress"
								name="emailAddress"
								readOnly
							/>
						</GridItem>
					</Grid>
				</Box>

				<Box sx={gridContainerStyles}>
					<Grid container spacing={2}>
						<GridItem>
							<TextFieldComponent
								width={selectFieldWidth}
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
						</GridItem>
						<GridItem>
							<SelectFieldComponent
								width={selectFieldWidth}
								values={genderOptions}
								value={formik.values.gender}
								onChange={formik.handleChange}
								label="Gender"
								id="gender"
								name="gender"
								menuValue="value"
								displayValue="label"
								error={formik.touched.gender && Boolean(formik.errors.gender)}
								helperText={formik.touched.gender && formik.errors.gender}
							/>
						</GridItem>
					</Grid>
				</Box>

				<Box sx={gridContainerStyles}>
					<Grid container spacing={2}>
						<GridItem>
							<SelectFieldComponent
								width={selectFieldWidth}
								values={countriesData}
								value={formik.values.country}
								onChange={formik.handleChange}
								label="Country"
								id="country"
								name="country"
								menuValue="name"
								displayValue="name"
								required
								error={formik.touched.country && Boolean(formik.errors.country)}
								helperText={formik.touched.country && formik.errors.country}
							/>
						</GridItem>
						<GridItem>
							<SelectFieldComponent
								width={selectFieldWidth}
								values={statesData}
								value={formik.values.state}
								onChange={formik.handleChange}
								label="State"
								id="state"
								name="state"
								menuValue="name"
								displayValue="name"
								error={formik.touched.state && Boolean(formik.errors.state)}
								helperText={formik.touched.state && formik.errors.state}
							/>
						</GridItem>
					</Grid>
				</Box>

				<Box sx={gridContainerStyles}>
					<Grid container spacing={2}>
						<GridItem>
							<SelectFieldComponent
								width={selectFieldWidth}
								values={citiesData}
								value={formik.values.city}
								onChange={formik.handleChange}
								label="City"
								id="city"
								name="city"
								menuValue="name"
								displayValue="name"
								required
								error={formik.touched.city && Boolean(formik.errors.city)}
								helperText={formik.touched.city && formik.errors.city}
							/>
						</GridItem>
						<GridItem>
							<TextFieldComponent
								width={selectFieldWidth}
								value={formik.values.address}
								onChange={formik.handleChange}
								label="Address"
								id="address"
								name="address"
								required
								error={formik.touched.address && Boolean(formik.errors.address)}
								helperText={formik.touched.address && formik.errors.address}
							/>
						</GridItem>
					</Grid>
				</Box>

				<Box sx={gridContainerStyles}>
					<Grid container spacing={2}>
						<GridItem>
							<TextFieldComponent
								width={selectFieldWidth}
								value={formik.values.igHandle}
								onChange={formik.handleChange}
								label="Instagram Handle"
								id="igHandle"
								name="igHandle"
								required
								error={
									formik.touched.igHandle && Boolean(formik.errors.igHandle)
								}
								helperText={formik.touched.igHandle && formik.errors.igHandle}
							/>
						</GridItem>
						<GridItem>
							<TextFieldComponent
								width={selectFieldWidth}
								value={formik.values.twitterHandle}
								onChange={formik.handleChange}
								label="Twitter Handle"
								id="twitterHandle"
								name="twitterHandle"
								required
								error={
									formik.touched.twitterHandle &&
									Boolean(formik.errors.twitterHandle)
								}
								helperText={
									formik.touched.twitterHandle && formik.errors.twitterHandle
								}
							/>
						</GridItem>
					</Grid>
				</Box>

				<Box sx={gridContainerStyles}>
					<Grid container spacing={2}>
						<GridItem>
							<TextFieldComponent
								width={selectFieldWidth}
								value={formik.values.facebookHandle}
								onChange={formik.handleChange}
								label="Facebook Handle"
								id="facebookHandle"
								name="facebookHandle"
								required
								error={
									formik.touched.facebookHandle &&
									Boolean(formik.errors.facebookHandle)
								}
								helperText={
									formik.touched.facebookHandle && formik.errors.facebookHandle
								}
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
						{editProfileLoading ? (
							<CircularProgress size="1.5rem" sx={{ color: "#fff" }} />
						) : (
							"update profile"
						)}
					</Button>
				</Box>
			</Box>
			<ProfilePictureModal
				open={openProfilePictureModal}
				handleClose={() => {
					setOpenProfilePictureModal(false);
				}}
				submitLoading={addImageLoading}
				handleImageSubmit={addImage}
			/>
		</Box>
	);
};

export default ProfileUpdate;
