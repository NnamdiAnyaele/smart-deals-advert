import request from "./httpService";

export async function storeProfileImage(payload) {
	const url = "/api/customer/storeProfileImage";
	const { data } = await request.post(url, payload);
	return data;
}

export async function updateProfile(payload) {
	const url = "/api/customer/updateProfile";
	const { data } = await request.post(url, payload);
	return data;
}
