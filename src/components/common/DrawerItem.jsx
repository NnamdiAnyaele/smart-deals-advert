import { Link } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const sideBarItemActiveStyles = {
	color: "primary.main",
	borderRight: "0.25rem solid #E41F26",
};

const sideBarItemStyles = {
	color: "#594E4E",
	"&:hover": { ...sideBarItemActiveStyles },
};

const sidebarIconActiveStyles = {
	color: "primary.main",
};

const sideBarIconStyles = {
	color: "#594E4E",
	fontSize: "0.875rem !important",
	"&:hover": { ...sidebarIconActiveStyles },
};

const DrawerItem = ({
	text,
	open,
	Icon,
	linkTo,
	setValue,
	setItemOnHover,
	itemOnHover,
	value,
	itemValue,
}) => {
	return (
		<ListItem
			key={text}
			disablePadding
			sx={{
				display: "block",
				borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
				...sideBarItemStyles,
				...(value === itemValue && sideBarItemActiveStyles),
			}}
			component={Link}
			to={linkTo}
			onClick={() => setValue(itemValue)}
			onMouseEnter={() => setItemOnHover(itemValue)}
			onMouseLeave={() => setItemOnHover(null)}
		>
			<ListItemButton
				sx={{
					minHeight: 48,
					justifyContent: open ? "initial" : "center",
					px: 2.5,
				}}
			>
				<ListItemIcon
					sx={{
						minWidth: 0,
						mr: open ? 3 : "auto",
						justifyContent: "center",
						...sideBarIconStyles,
						...(value === itemValue && sidebarIconActiveStyles),
						...(itemValue === itemOnHover && sidebarIconActiveStyles),
					}}
				>
					{Icon && <Icon />}
				</ListItemIcon>
				<ListItemText
					primary={text}
					sx={{ opacity: open ? 1 : 0, fontSize: "0.875rem !important" }}
				/>
			</ListItemButton>
		</ListItem>
	);
};

export default DrawerItem;
