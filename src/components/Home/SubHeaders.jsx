import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const SubHeaders = ({ text, link }) => {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "space-between",
				mb: { md: "3rem", xs: "1rem" },
			}}
		>
			<Box>
				<Typography
					variant="h5"
					component="div"
					sx={{ fontWeight: 700, textTransform: "uppercase", mb: "0.5rem" }}
				>
					{text}
				</Typography>
				<Divider color="error" sx={{ width: "18%", height: "2px" }} />
			</Box>
			{link && (
				<Link to={link} style={{ color: "red" }}>
					View All
				</Link>
			)}
		</Box>
	);
};

export default SubHeaders;
