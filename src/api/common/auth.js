import request from "../httpService";

export async function signup(payload) {
	const url = `/api/customer/new-account`;
	const { data } = await request.post(url, payload);
	return data;
}

export async function sendOtp(payload) {
	const url = "/api/customer/send-otp";
	const { data } = await request.post(url, payload);
	return data;
}

export async function resendOtp(payload) {
	const url = "/api/customer/resend-otp";
	const { data } = await request.post(url, payload);
	return data;
}

export async function verifyOtp(payload) {
	const url = "/api/customer/verify-otp";
	const { data } = await request.post(url, payload);
	return data;
}

export async function forgotPassword(payload) {
	const url = "/api/forgotPassword";
	const { data } = await request.post(url, payload);
	return data;
}

export async function changePassword(payload) {
	const url = "/api/changePassword";
	const { data } = await request.post(url, payload);
	return data;
}

export async function createAccount(payload) {
	const url = "/api/customer/new-account";
	const { data } = await request.post(url, payload);
	return data;
}

export async function resetPassword(payload) {
	const url = "/api/forgotPasswordChange";
	const { data } = await request.post(url, payload);
	return data;
}

export async function checkUsername(payload) {
	const url = "/api/customer/checkUsername";
	const { data } = await request.get(url, {
		params: payload,
	});
	return data;
}

export async function checkEmailAddress(payload) {
	const url = "/api/customer/checkEmailAddress";
	const { data } = await request.get(url, {
		params: payload,
	});
	return data;
}
