import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Navbar from "../Home/NavBar";
import Drawer from "./Drawer";

const Layout = () => {
	const [open, setOpen] = useState(true);

	const theme = useTheme();
	const showDrawer = useMediaQuery(theme.breakpoints.up("md"));

	return (
		<div>
			<Navbar openDrawer={open} toggleDrawer={setOpen} />
			{showDrawer && <Drawer open={open} setOpen={setOpen} />}
		</div>
	);
};

export default Layout;
