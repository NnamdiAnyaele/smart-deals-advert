import request from "../httpService";

export async function getCountry() {
	const { data } = await request.get(`/api/getCountry`);
	return data;
}

export async function getState(countryID) {
	const { data } = await request.get(`/api/getState?countryID=${countryID}`);
	return data;
}

export async function getCity(stateId) {
	const { data } = await request.get(`/api/getCity?stateID=${stateId}`);
	return data;
}
