import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";

const PaginationBox = ({ count, page, handlePageChange }) => {
	return (
		<Box
			sx={{
				mt: "2rem",
				display: "flex",
				justifyContent: "Center",
			}}
		>
			<Pagination
				count={count || 0}
				page={page}
				onChange={handlePageChange}
				color="primary"
				showFirstButton
				showLastButton
			/>
		</Box>
	);
};

export default PaginationBox;
