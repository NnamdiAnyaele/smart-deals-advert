import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const NavbarCountrycard = ({ image, countryName, isMatched }) => {
	return (
		<Box
			sx={{
				padding: "0.5rem 0.3rem",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
			}}
		>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<Box sx={{ height: "2rem", width: "2rem", mr: "1rem" }}>
					<img
						src={image}
						alt="country flag"
						height="100%"
						width="100%"
						style={{ objectFit: "cover", borderRadius: "50%" }}
					/>
				</Box>
				<Typography variant="body1">{countryName}</Typography>
			</Box>
			{isMatched && (
				<div
					style={{
						borderRadius: "50%",
						backgroundColor: "#66BB6B",
						height: "0.8rem",
						width: "0.8rem",
					}}
				/>
			)}
		</Box>
	);
};

export default NavbarCountrycard;
