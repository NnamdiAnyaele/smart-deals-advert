import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import NavbarCountrycard from "./NavbarCountrycard";

const DestopCountryMenu = ({
	open,
	handleClose,
	anchorEl,
	countrySearch,
	setCountrySearch,
	countriesData,
	region,
	handleRegionSelect,
}) => {
	return (
		<Popper
			open={open}
			anchorEl={anchorEl}
			id="desktop-country-menu"
			onClose={handleClose}
			sx={{ zIndex: 1000 }}
		>
			<Paper
				elevation={2}
				sx={{
					width: { md: "400px", xs: "100vw" },
					padding: "1rem",
					overflow: "auto",
					mt: "1rem",
				}}
			>
				<Typography
					variant="h6"
					component="div"
					sx={{ marginBottom: "1rem" }}
					gutterBottom
				>
					Select a Region
				</Typography>
				<TextField
					label="Search"
					id="desktop-country-search"
					fullWidth
					value={countrySearch}
					onChange={(e) => setCountrySearch(e.target.value)}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
					}}
					sx={{ mb: "1rem" }}
				/>
				<Box>
					{countriesData.map((country) => (
						<Box key={country.ID} onClick={() => handleRegionSelect(country)}>
							<NavbarCountrycard
								image={country.logo}
								countryName={country.name}
								isMatched={
									country.name?.toLowerCase() === region.name?.toLowerCase()
								}
							/>
						</Box>
					))}
				</Box>
			</Paper>
		</Popper>
	);
};

export default DestopCountryMenu;
