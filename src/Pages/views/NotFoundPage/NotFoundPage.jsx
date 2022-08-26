import { useState, useEffect } from "react";
import { toast } from "react-toastify";
// import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";

import { getNotFound } from "../../../api/common/request";
import { ROLES } from "../../../utils/constants";
// import logo from "../../../assets/logos/smart-deals-logo.svg";

// const Container = styled("div")({
// 	justifyContent: "center",
// 	width: "100%",
// 	height: "100vh",
// 	backgroundSize: "cover",
// 	backgroundPosition: "center center",
// 	backgroundRepeat: "no-repeat",
// });

// const Content = styled("div")({
// 	display: "flex",
// 	flexDirection: "column",
// 	alignItems: "center",
// });

function NotFoundPage() {
	const { region, role, isAuthenticated } = useSelector((state) => state.auth);
	const [notFoundUrl, setNotFoundUrl] = useState("");

	useEffect(() => {
		let isMounted = true;

		// fetch not found url
		(async () => {
			if (region.region) {
				try {
					const result = await getNotFound(region.region);
					if (isMounted) {
						setNotFoundUrl(result?.url);
					}
				} catch (error) {
					if (error.response) {
						toast.error(error.response.data.message);
					} else if (error.request) {
						toast.error("Internal Server Error");
					} else {
						toast.error("Error", error.message);
					}
				}
			}
		})();

		return () => {
			isMounted = false;
		};
	}, [region.region]);

	return (
		<Box
			sx={{
				width: "100%",
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				// alignItems: "center",
				p: { md: "3rem", xs: "1rem" },
			}}
		>
			<Box
				sx={{
					// backgroundImage: `url(${notFoundUrl})`,
					// backgroundSize: "cover",
					// backgroundPosition: "center center",
					// backgroundRepeat: "no-repeat",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<div
					style={{
						width: 500,
						textAlign: "center",
						fontSize: 16,
						opacity: 0.9,
						marginBottom: "1rem",
					}}
				>
					Oops! Sorry, the page you're looking for doesn't exist. But don't
					worry, try going back to the previous page or visit the{" "}
					<Link
						to={role === ROLES.ADMIN && isAuthenticated ? "/dashboard" : "/"}
					>
						homepage
					</Link>
				</div>

				<div style={{ width: "40rem" }}>
					<img
						src={notFoundUrl}
						alt="not found"
						width="100%"
						height="auto"
						style={{ objectFit: "cover" }}
					/>
				</div>
				{/* <div style={{ margin: "100px 0 15px" }}>
					<img src={logo} width="190" height="auto" alt="Brand logo" />
				</div>
				<div style={{ fontSize: 80, fontWeight: "bold", opacity: 0.9 }}>
					404
				</div> */}
			</Box>
		</Box>
	);
}

export default NotFoundPage;
