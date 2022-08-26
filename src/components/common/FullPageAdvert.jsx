import { Carousel } from "react-responsive-carousel";
import Box from "@mui/material/Box";

import carouselMain from "../../assets/images/carousel-main.png";
import homeOne from "../../assets/images/home-one.png";

const FullPageAdvert = () => {
	return (
		<Box
			sx={{
				mb: {
					md: "3rem",
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
	);
};

export default FullPageAdvert;
