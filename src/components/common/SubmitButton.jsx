import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const SubmitButton = ({ text, loading = false, disabled = false }) => {
	return (
		<Button
			type="submit"
			variant="contained"
			color="primary"
			fullWidth
			sx={{ padding: "1rem" }}
			disabled={disabled}
		>
			{loading ? <CircularProgress size="1.5rem" /> : text}
		</Button>
	);
};

export default SubmitButton;
