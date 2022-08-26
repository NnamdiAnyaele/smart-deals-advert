import Box from "@mui/material/Box";
import middleAdvert from "../../assets/images/middle-advert.png";

const MiddleAdvert = () => {
	return (
		<Box
			sx={{
				width: "100%",
				height: "12.68rem",
				mb: { md: "4rem", xs: "1rem" },
			}}
		>
			<img
				src={middleAdvert}
				alt="advert"
				width="100%"
				height="auto"
				style={{ objectFit: "cover" }}
			/>
		</Box>
	);
};

export default MiddleAdvert;
