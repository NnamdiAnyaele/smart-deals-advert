import Box from "@mui/material/Box";
import advertCard from "../../assets/images/advert-cards.png";

const AdvertCards = () => {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: {
					md: "space-between",
					xs: "flex-start",
				},
				flexWrap: "wrap",
				color: "#5F5F5F",
				mb: { md: "4rem", xs: "1rem" },
			}}
		>
			{[...new Array(4).fill(0)].map((item, index) => (
				<Box
					key={index}
					sx={{
						height: "auto",
						width: {
							md: "15rem",
							xs: "100%",
						},
						mb: {
							lg: 0,
							xs: "1rem",
						},
						mr: { sm: "1rem", xs: 0 },
					}}
				>
					<img
						src={advertCard}
						alt=""
						width="100%"
						height="100%"
						style={{ objectFit: "cover" }}
					/>
				</Box>
			))}
		</Box>
	);
};

export default AdvertCards;
