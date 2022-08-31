import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Layout from "./Layout";

import { drawerWidth } from "../../utils/constants";

const PartnerLayout = () => {
	return (
		<div>
			<Box
				sx={{
					display: "flex",

					maxWidth: "100%",
				}}
			>
				<CssBaseline />
				<Layout />
				<Box
					component="main"
					sx={{
						flexGrow: 1,
						minHeight: "100vh",
						width: { sm: `calc(100% - ${drawerWidth}px)` },
					}}
				>
					<Toolbar />
					<Outlet />
				</Box>
			</Box>
		</div>
	);
};

export default PartnerLayout;
