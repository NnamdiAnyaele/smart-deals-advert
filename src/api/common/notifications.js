import request from "../httpService";

export async function fetchNotifications(
	username,
	region,
	bizFrom,
	accountType
) {
	const url = "/api/customer/fetchNotifications";
	const { data } = await request.get(url, {
		params: { username, region, bizFrom, accountType },
	});
	return data;
}

export async function fetchUnreadNotifications(
	username,
	region,
	bizFrom,
	accountType
) {
	const url = "/api/customer/fetchUnreadNotifications";
	const { data } = await request.get(url, {
		params: { username, region, bizFrom, accountType },
	});
	return data;
}

export async function readOneNotification(payload) {
	const url = "/api/customer/readNotification";
	const { data } = await request.post(url, payload);
	return data;
}

export async function readAllNotifications(payload) {
	const url = "/api/customer/readNotifications";
	const { data } = await request.post(url, payload);
	return data;
}

export async function deleteNotification(payload) {
	const url = "/api/customer/deleteNotification";
	const { data } = await request.post(url, payload);
	return data;
}

export async function deleteNotifications(payload) {
	const url = "/api/customer/deleteNotifications";
	const { data } = await request.post(url, payload);
	return data;
}
