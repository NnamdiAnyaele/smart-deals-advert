import TextField from "@mui/material/TextField";

const NumberTextField = ({
	id,
	label,
	name,
	value,
	onChange,
	variant = "outlined",
	error = null,
	helperText = null,
}) => {
	return (
		<TextField
			id={id}
			label={label}
			variant={variant}
			value={value}
			type="number"
			inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
			name={name}
			onChange={onChange}
			fullWidth
			error={error}
			helperText={helperText}
		/>
	);
};

export default NumberTextField;
