import * as XLSX from "xlsx";
import { format } from "date-fns";

export const formatDate = (date) => {
	const d = new Date(date);
	if (Number.isNaN(d)) return "N/A";
	let month = `${d.getMonth() + 1}`;
	let day = `${d.getDate()}`;
	const year = d.getFullYear();

	if (month.length < 2) month = `0${month}`;
	if (day.length < 2) day = `0${day}`;

	return [day, month, year].join("-");
};

export const formatNumber = (num, point = 2) => {
	const formats = String(num);
	if (Number.isNaN(num)) return 0;
	const toFixed = Number.parseFloat(num).toFixed(point);
	const second = String(toFixed).split(".")[1];
	const first = formats.split(".")[0];
	const third = new Intl.NumberFormat().format(Number(first));
	return `${third}.${second}`;
};

export const convertDateToIso = (dateStr) => {
	const date = new Date(dateStr);
	return date.toISOString();
};

export const isEmpty = (obj) => {
	if (obj && Object.entries(obj).length === 0) return true;
	return false;
};

export const isObjectEmpty = (obj) => {
	return Object.keys(obj).length === 0;
};

export const sum = (obj, prop) => {
	return obj.reduce((item, acc) => item + Number(acc[prop]), 0);
};

export const getDateXDaysAgo = (numOfDays, date = new Date()) => {
	const daysAgo = new Date(date.getTime());

	daysAgo.setDate(date.getDate() - numOfDays);

	return daysAgo;
};

export const getDateXDaysFromNow = (numOfDays, date = new Date()) => {
	const daysAgo = new Date(date.getTime());

	daysAgo.setDate(date.getDate() + numOfDays);

	return daysAgo;
};
export const addMinutes = (minutes, date = new Date()) => {
	return new Date(date.getTime() + minutes * 60000);
};

export const addSeconds = (seconds, date = new Date()) => {
	return new Date(date.getTime() + seconds * 1000);
};

export const numberFormatter = (number, float = 2) => {
	if (number) {
		if (Number.isInteger(Number(number))) {
			return Number(number).toLocaleString("en-US");
		}

		if (!Number.isInteger(Number(number))) {
			return Number(number).toLocaleString("en-US", {
				maximumFractionDigits: float,
				minimumFractionDigits: float,
			});
		}
		return number;
	}
	return "";
};

export const downloadExcel = (dataToExport, title, filename) => {
	const newData = dataToExport.map((row) => {
		const element = row;
		delete element.tableData;
		return element;
	});
	const workSheet = XLSX.utils.json_to_sheet(newData);
	const workBook = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(workBook, workSheet, title);
	//  Buffer
	// eslint-disable-next-line
	const buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
	//  Binary string
	XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
	//  Download
	XLSX.writeFile(workBook, `${filename}.xlsx`);
};

export const discountCalculator = (originalPrice, discountPrice) => {
	const discount =
		(Number(originalPrice) - Number(discountPrice)) / Number(originalPrice);
	return discount * 100;
};

export const dateFormatter = (str) => {
	if (str) {
		try {
			const dateReverse = str.split(" ")[0];
			const dateArray = dateReverse.split("-");
			return format(
				new Date(dateArray[0], Number(dateArray[1]) - 1, dateArray[2]),
				"do MMM yyyy"
			);
		} catch (error) {
			return "";
		}
	}
	return "";
};

export const dateTimeFormatter = (dateStr) => {
	if (dateStr) {
		const dateReverse = dateStr.split(" ")[0];
		const dateArray = dateReverse.split("-");
		const timeArray = dateStr.split(" ")[1].split(":");
		return format(
			new Date(
				dateArray[0],
				Number(dateArray[1]) - 1,
				dateArray[2],
				timeArray[0],
				timeArray[1],
				timeArray[2]
			),
			"do MMM yyyy  h:mm a"
		);
	}
	return dateStr;
};

export const fixedEncodeURIComponent = (str) => {
	return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
		return `%${c.charCodeAt(0).toString(16)}`;
	});
};
