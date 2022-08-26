import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";

const ImageButton = styled(ButtonBase)(({ theme }) => ({
	position: "relative",
	width: "268px",
	height: "380px",
	[theme.breakpoints.down("sm")]: {
		width: "100% !important", // Overrides inline-style
	},
	// zIndex: 1,
	"&:hover, &.Mui-focusVisible": {
		// zIndex: 1,
		"& .MuiImageBackdrop-root": {
			opacity: 0.15,
		},
		"& .MuiImageMarked-root": {
			opacity: 0,
		},
	},
}));

const ImageSrc = styled("span")({
	position: "absolute",
	left: 0,
	right: 0,
	top: 0,
	bottom: 0,
	backgroundSize: "cover",
	backgroundPosition: "center 40%",
});

const Image = styled("span")(({ theme }) => ({
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%,-50%)",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	color: theme.palette.common.white,
	width: "13rem",
	backgroundColor: "rgba(255, 255, 255, 0.4)",
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
	position: "absolute",
	left: 0,
	right: 0,
	top: 0,
	bottom: 0,
	backgroundColor: theme.palette.common.black,
	opacity: 0.2,
	transition: theme.transitions.create("opacity"),
}));

const CategoryCard = ({ image }) => {
	return (
		<ImageButton
			focusRipple
			style={{
				width: 268,
				marginBottom: "1rem",
				marginRight: "1rem",
			}}
		>
			<ImageSrc style={{ backgroundImage: `url(${image})` }} />
			<ImageBackdrop className="MuiImageBackdrop-root" />
			<Image>
				<Typography
					component="span"
					variant="subtitle1"
					color="inherit"
					sx={{
						padding: "0.5rem",
					}}
				>
					Women's Accesories
					<Divider color="white" sx={{ margin: "0.5rem 0" }} />
					<Typography component="span" variant="subtitle2" color="inherit">
						46 items
					</Typography>
				</Typography>
			</Image>
		</ImageButton>
	);
};

export default CategoryCard;
