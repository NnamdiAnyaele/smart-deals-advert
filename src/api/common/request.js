import request from "../httpService";

export async function getBusinessCategory() {
	const url = "/api/getBusinessCategory";
	const { data } = await request.get(url);
	return data;
}

export async function getBusinessType(businessCategory, region) {
	const url = "/api/getBusinessType";
	const { data } = await request.get(url, {
		params: { businessCategory, region },
	});
	return data;
}

export async function getProductCategory(bizFrom, region) {
	const url = "/api/getProductCategory";
	const { data } = await request.get(url, {
		params: { bizFrom, region },
	});
	return data;
}

export async function getProductMedium() {
	const url = "/api/getProductMedium";
	const { data } = await request.get(url);
	return data;
}

export async function getNotFound(region) {
	const url = "/api/notFound";
	const { data } = await request.get(url, {
		params: { region },
	});
	return data;
}
