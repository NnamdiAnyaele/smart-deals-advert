import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { useSelector } from "react-redux";
import Home from "../views/Home";
import Logout from "../../components/common/Logout";
import NotFound from "../views/NotFoundPage/NotFoundPage";
// import Navbar from "../../components/Home/NavBar";
import OtpVerification from "../views/SignupOtpVerfication";
import ForgotPassword from "../views/ForgotPassword";
import LoginSignup from "../views/LoginSignup/LoginSignup";
// import ChangePassword from "../views/ChangePassword";
// import Notifications from "../views/Notifications";
// import ProtectedRoute from "../../components/common/ProtectedRoutes";

const BaseRoute = () => {
	// const { user } = useSelector((state) => state.auth);
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/logout" element={<Logout />} />
				<Route path="/otp-verification" element={<OtpVerification />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/login" element={<LoginSignup />} />
				<Route path="/signup" element={<LoginSignup />} />

				{/* <Route path="/customer" element={<PartnerLayout />}>
					<Route index element={<Navigate to="dashboard" />} />
					<Route
						path="dashboard"
						element={
							<ProtectedRoute
								isAllowed={!!user && role?.toLowerCase() === "partner"}
							>
								<PartnerDashboard />
							</ProtectedRoute>
						}
					/>
					<Route
						path="change-password"
						element={
							<ProtectedRoute
								isAllowed={!!user && role?.toLowerCase() === "partner"}
							>
								<ChangePassword />
							</ProtectedRoute>
						}
					/>
					<Route
						path="notifications"
						element={
							<ProtectedRoute
								isAllowed={!!user && role?.toLowerCase() === "partner"}
							>
								<Notifications />
							</ProtectedRoute>
						}
					/>
					<Route
						path="share-link"
						element={
							<ProtectedRoute
								isAllowed={!!user && role?.toLowerCase() === "partner"}
							>
								<ShareLink />
							</ProtectedRoute>
						}
					/>
				</Route> */}

				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default BaseRoute;
