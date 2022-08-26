import { Carousel } from "react-responsive-carousel";
import Box from "@mui/material/Box";
import carouselMain from "../../assets/images/carousel-main.png";
import homeOne from "../../assets/images/home-one.png";
import smallAdOne from "../../assets/images/small-ad-1.png";
import smallAdTwo from "../../assets/images/small-ad-2.png";
import smallAdThree from "../../assets/images/small-ad-3.png";
import smallAdFour from "../../assets/images/small-ad-4.png";

const TopAdverts = () => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: {
					md: "row",
					xs: "column",
				},
				mb: "2rem",
			}}
		>
			<Box
				sx={{
					width: {
						md: "65%",
						xs: "100%",
					},
					marginRight: {
						md: "1rem",
						xs: 0,
					},
					mb: {
						md: 0,
						xs: "1rem",
					},
					height: { md: "23rem", xs: "18rem" },
				}}
			>
				<Carousel
					infiniteLoop
					showThumbs={false}
					autoPlay
					interval={5000}
					showStatus={false}
				>
					<Box sx={{ height: { md: "23rem", xs: "18rem" } }}>
						<img src={carouselMain} alt="" height="100%" width="100%" />
					</Box>
					<Box sx={{ height: { md: "23rem", xs: "18rem" } }}>
						<img src={carouselMain} alt="" height="100%" width="100%" />
					</Box>
					<Box sx={{ height: { md: "23rem", xs: "18rem" } }}>
						<img src={carouselMain} alt="" height="100%" width="100%" />
					</Box>
					<Box sx={{ height: { md: "23rem", xs: "18rem" } }}>
						<img src={homeOne} alt="" height="100%" width="100%" />
					</Box>
				</Carousel>
			</Box>
			<Box
				sx={{
					width: {
						md: "35%",
						xs: "100%",
					},
					display: "flex",
					justifyContent: {
						md: "flex-start",
						xs: "center",
					},
					height: "23rem",
				}}
			>
				<Box
					sx={{
						mr: "1rem",
						width: "50%",
						height: "23rem",
					}}
				>
					<Box
						sx={{
							mb: "0.3rem",
							height: "11.3rem",
							objectFit: "cover",
						}}
					>
						<img src={smallAdOne} alt="" height="100%" width="100%" />
					</Box>
					<Box
						sx={{
							height: "11.3rem",
							objectFit: "cover",
						}}
					>
						<img src={smallAdTwo} alt="" height="100%" width="100%" />
					</Box>
				</Box>
				<Box sx={{ width: "50%" }}>
					<Box
						sx={{
							mb: "0.3rem",
							height: "11.3rem",
							objectFit: "cover",
						}}
					>
						<img src={smallAdThree} alt="" height="100%" width="100%" />
					</Box>
					<Box
						sx={{
							mb: "0.3rem",
							height: "11.3rem",
							objectFit: "cover",
						}}
					>
						<img src={smallAdFour} alt="" height="100%" width="100%" />
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default TopAdverts;
