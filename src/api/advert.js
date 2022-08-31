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
