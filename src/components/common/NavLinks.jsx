import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
// import MuiLink from "@mui/material/Link";

// eslint-disable-next-line no-unused-vars
const NavLink = ({ role, points }) => {
	const { isAuthenticated } = useSelector((state) => state.auth);

	return (
		<div>
			{role?.toLowerCase() !== "admin" && (
				<>
					<Button
						variant="text"
						sx={{ color: "#594E4E", textTransform: "none", mr: "0.5rem" }}
						component={Link}
						to="/how-it-works"
					>
						How it works
					</Button>
				</>
			)}

			{!isAuthenticated && (
				<>
					<Button
						variant="text"
						sx={{ color: "#594E4E", textTransform: "none", mr: "0.5rem" }}
						component={Link}
						to="/login"
					>
						Login
					</Button>

					<Button
						variant="outlined"
						sx={{
							textTransform: "capitalize",
							whiteSpace: "no-wrap",
						}}
						component={Link}
						to="/signup"
					>
						Sign Up
					</Button>
				</>
			)}
		</div>
	);
};

export default NavLink;
