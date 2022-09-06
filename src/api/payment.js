import request from "./httpService";

export async function getPaymentEndpoint(payload) {
	const url = "/api/customer/getPaymentEndpoint";
	const { data } = await request.get(url, {
		params: payload,
	});
	return data;
}

export async function getPaymentTransactionDetails(payload) {
	const url = "/api/customer/getPaymentTransactionDetails";
	const { data } = await request.post(url, payload);
	return data;
}

export async function getZenithPaymentTransactionDetails(payload) {
	const url = "/api/customer/getZenithPaymentTransactionDetails";
	const { data } = await request.post(url, payload);
	return data;
}
