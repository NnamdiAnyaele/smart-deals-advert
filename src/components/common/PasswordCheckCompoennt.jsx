import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import {
	specialCharacterCheck,
	digitCheck,
	uppercaseCheck,
} from "../../utils/constants";

const style = { textAlign: "center", marginBottom: "1rem" };

const PasswordCheckCompoennt = ({ password }) => {
	const [passwordCheck, setPasswordCheck] = useState(false);
	const [capitalCheck, setCapitalCheck] = useState(false);
	const [specialCharCheck, setSpecialCharCheck] = useState(false);
	const [numberCharCheck, setNumberCharCheck] = useState(false);

	useEffect(() => {
		if (password.length >= 7) {
			setPasswordCheck(true);
		} else {
			setPasswordCheck(false);
		}
		if (uppercaseCheck.test(password)) {
			setCapitalCheck(true);
		} else {
			setCapitalCheck(false);
		}
		if (specialCharacterCheck.test(password)) {
			setSpecialCharCheck(true);
		} else {
			setSpecialCharCheck(false);
		}
		if (digitCheck.test(password)) {
			setNumberCharCheck(true);
		} else {
			setNumberCharCheck(false);
		}
	}, [password]);

	return (
		<Box sx={style}>
			<p>
				Must contain atleast 7 characters{" "}
				<span style={{ color: passwordCheck ? "green" : "red" }}>
					{passwordCheck ? <CheckCircleIcon /> : <CancelIcon />}
				</span>
			</p>
			<p>
				Must contain one uppercase letter{" "}
				<span style={{ color: capitalCheck ? "green" : "red" }}>
					{capitalCheck ? <CheckCircleIcon /> : <CancelIcon />}
				</span>
			</p>
			<p>
				Must contain one special character{" "}
				<span style={{ color: specialCharCheck ? "green" : "red" }}>
					{specialCharCheck ? <CheckCircleIcon /> : <CancelIcon />}
				</span>
			</p>
			<p>
				Must contain one Number{" "}
				<span style={{ color: numberCharCheck ? "green" : "red" }}>
					{numberCharCheck ? <CheckCircleIcon /> : <CancelIcon />}
				</span>
			</p>
		</Box>
	);
};

export default PasswordCheckCompoennt;
