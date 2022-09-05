const specialCharacterCheck = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
const digitCheck = /[0-9]/;
const uppercaseCheck = /[A-Z]/;
const TOKENKEY = "accessToken";
const USERKEY = "user";
const ROLEKEY = "role";

const ROLES = {
	ADMIN: "admin",
	MEMBER: "member",
	PARTNER: "partner",
	CUSTOMER: "customer",
};

const currencySymbolMap = {
	NG: "₦",
	KE: "Ksh",
	GH: "GH₵",
	ZA: "ZAR",
	ZM: "ZK",
};

const drawerWidth = 230;

const DEVICETYPE = "WEB";

const PROFILEPHOTOKEY = "partnerLogo";

export {
	specialCharacterCheck,
	digitCheck,
	uppercaseCheck,
	TOKENKEY,
	USERKEY,
	ROLEKEY,
	ROLES,
	currencySymbolMap,
	drawerWidth,
	DEVICETYPE,
	PROFILEPHOTOKEY,
};
