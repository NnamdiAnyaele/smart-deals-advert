import { TOKENKEY, ROLEKEY } from "../constants";

const auth = {
	authenticate: () => {
		const token = localStorage.getItem(TOKENKEY);
		if (token) {
			return true;
		}
		return false;
	},
	getUserRole: () => {
		const role = localStorage.getItem(ROLEKEY);
		if (role) {
			return role;
		}
		return "";
	},
};

export default auth;
