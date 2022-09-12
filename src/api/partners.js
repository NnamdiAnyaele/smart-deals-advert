import request from "./httpService";

// eslint-disable-next-line import/prefer-default-export
export async function getTopPartners(region) {
	const url = "/api/getTopPartners";
	const { data } = await request.get(url, {
		params: { region },
	});
	return data;
}
