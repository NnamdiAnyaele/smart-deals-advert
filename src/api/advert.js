import request from "./httpService";

export async function fetchMyAdvertImages(payload) {
	const url = "/api/customer/fetchMyAdvertImages";
	const { data } = await request.get(url, {
		params: payload,
	});
	return data;
}

export async function fetchAdvertsForPayment(payload) {
	const url = "/api/customer/fetchAdvertsForPayment";
	const { data } = await request.get(url, {
		params: payload,
	});
	return data;
}

export async function fetchAdvertPositionInfo(payload) {
	const url = "/api/customer/fetchAdvertPositionInfo";
	const { data } = await request.get(url, {
		params: payload,
	});
	return data;
}

export async function placeAdvert(payload) {
	const url = "/api/customer/placeAdvert";
	const { data } = await request.post(url, payload);
	return data;
}
