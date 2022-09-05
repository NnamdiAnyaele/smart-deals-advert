import request from "../httpService";

export async function getCountry() {
	const { data } = await request.get(`/api/getCountry`);
	return data;
}

export async function getState(countryID, region) {
	const { data } = await request.get(
		`/api/getState?countryID=${countryID}&region=${region}`
	);
	return data;
}

export async function getCity(stateId, region) {
	const { data } = await request.get(
		`/api/getCity?stateID=${stateId}&region=${region}`
	);
	return data;
}
