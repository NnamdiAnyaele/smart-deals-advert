import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "../views/Home";
import Logout from "../../components/common/Logout";
import NotFound from "../views/NotFoundPage/NotFoundPage";
// import Navbar from "../../components/Home/NavBar";
import OtpVerification from "../views/SignupOtpVerfication";
import ForgotPassword from "../views/ForgotPassword";
import LoginSignup from "../views/LoginSignup/LoginSignup";
import ChangePassword from "../views/ChangePassword";
import Notifications from "../views/Notifications";
import ProtectedRoute from "../../components/common/ProtectedRoutes";
import TermsConditions from "../views/TermsConditions";
import PrivacyPolicy from "../views/PrivacyPolicy";
import HowItWorks from "../views/HowItWorks";
import CustomerLayout from "../../components/Customer/CustomerLayout";
import Dashboard from "../views/Dashboard";
import AdvertHistory from "../views/AdvertHistory";
import ApprovedAdverts from "../views/ApprovedAdverts";
import PaidAdvert from "../views/PaidAdvert";
import NewAdvert from "../views/NewAdvert";
import ProfileUpdate from "../views/ProfileUpdate";
import AdvertCallback from "../views/AdvertCallback";

const BaseRoute = () => {
	const { user, role } = useSelector((state) => state.auth);
	const isAllowed = !!user && role?.toLowerCase() === "customer";
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/logout" element={<Logout />} />
				<Route path="/otp-verification" element={<OtpVerification />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/login" element={<LoginSignup />} />
				<Route path="/signup" element={<LoginSignup />} />
				<Route path="/terms-and-conditions" element={<TermsConditions />} />
				<Route path="/privacy-policy" element={<PrivacyPolicy />} />
				<Route path="/how-it-works" element={<HowItWorks />} />

				<Route path="/customer" element={<CustomerLayout />}>
					<Route index element={<Navigate to="dashboard" />} />
					<Route
						path="dashboard"
						element={
							<ProtectedRoute isAllowed={isAllowed}>
								<Dashboard />
							</ProtectedRoute>
						}
					/>
					<Route
						path="advert-history"
						element={
							<ProtectedRoute isAllowed={isAllowed}>
								<AdvertHistory />
							</ProtectedRoute>
						}
					/>
					<Route
						path="approved-adverts"
						element={
							<ProtectedRoute isAllowed={isAllowed}>
								<ApprovedAdverts />
							</ProtectedRoute>
						}
					/>
					<Route
						path="paid-adverts"
						element={
							<ProtectedRoute isAllowed={isAllowed}>
								<PaidAdvert />
							</ProtectedRoute>
						}
					/>
					<Route
						path="change-password"
						element={
							<ProtectedRoute isAllowed={isAllowed}>
								<ChangePassword />
							</ProtectedRoute>
						}
					/>
					<Route
						path="notifications"
						element={
							<ProtectedRoute isAllowed={isAllowed}>
								<Notifications />
							</ProtectedRoute>
						}
					/>
					<Route
						path="new-advert"
						element={
							<ProtectedRoute isAllowed={isAllowed}>
								<NewAdvert />
							</ProtectedRoute>
						}
					/>
					<Route
						path="update-profile"
						element={
							<ProtectedRoute isAllowed={isAllowed}>
								<ProfileUpdate />
							</ProtectedRoute>
						}
					/>
				</Route>
				<Route
					path="/payment/callback/:advertID/:channel"
					element={
						<ProtectedRoute isAllowed={isAllowed}>
							<AdvertCallback />
						</ProtectedRoute>
					}
				/>

				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default BaseRoute;
