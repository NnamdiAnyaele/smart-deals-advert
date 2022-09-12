import { useEffect } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import Loader from "../common/Loader";
import { getTopPartners } from "../../api/partners";

const style = { textAlign: "center", mb: { md: "4rem", xs: "1rem" } };

const gridItemStyles = {
	display: "flex",
	justifyContent: "center",
};

const Partners = ({ smallDisplay = false }) => {
	const { region } = useSelector((state) => state.auth);

	const {
		data: topPartnersData = [],
		isLoading: topPartnersLoading,
		isError: topPartnersError,
		error: topPartnersErrorMessage,
	} = useQuery(
		["get-top-partners", region.region],
		async () => getTopPartners(region.region),
		{
			select: (data) => data?.mvp?.filter((item) => item.url).slice(0, 8),
			staleTime: 4 * 60 * 1000,
			enabled: Boolean(region.region),
		}
	);

	useEffect(() => {
		if (topPartnersError) {
			if (topPartnersErrorMessage.response) {
				toast.error(topPartnersErrorMessage.response.data?.message);
			} else if (topPartnersErrorMessage.request) {
				toast.error("Internal Server Error");
			} else {
				toast.error("Error", topPartnersErrorMessage.message);
			}
		}
	}, [topPartnersError, topPartnersErrorMessage]);

	return (
		<Box sx={style}>
			{smallDisplay ? (
				<Typography
					variant="caption"
					gutterBottom
					component="div"
					sx={{
						fontWeight: 700,
						mb: "1rem",
						color: "#594E4E",
						fontSize: "0.7rem",
					}}
				>
					SEE OUR TOP PARTNERS
				</Typography>
			) : (
				<Typography
					variant="h5"
					gutterBottom
					component="div"
					sx={{
						fontWeight: 700,
						mb: "3rem",
						color: "#594E4E",
						fontSize: {
							xs: "1rem",
							sm: "1.5rem",
						},
					}}
				>
					SEE OUR TOP PARTNERS
				</Typography>
			)}

			{!topPartnersLoading && (
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						mb: { md: "3rem", xs: 0 },
					}}
				>
					<Grid container>
						{topPartnersData?.map((partner) => (
							<Grid
								item
								xs={smallDisplay ? 3 : 12}
								sm={smallDisplay ? 3 : 6}
								md={smallDisplay ? 3 : 3}
								key={partner.partnerID}
								sx={gridItemStyles}
							>
								<Box
									sx={{
										height: smallDisplay ? "4rem" : "8rem",
										width: smallDisplay ? "6rem" : "13rem",
									}}
								>
									<img src={partner?.url} alt="" height="100%" width="auto" />
								</Box>
							</Grid>
						))}
					</Grid>
				</Box>
			)}

			{topPartnersLoading && <Loader />}
		</Box>
	);
};

export default Partners;
