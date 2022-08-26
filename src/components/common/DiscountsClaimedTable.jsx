import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import { currencySymbolMap } from "../../utils/constants";
import { numberFormatter } from "../../utils/helpers/functions";

export default function StickyHeadTable({ loading, data }) {
	const { region } = useSelector((state) => state.auth);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const firstPageElement = page * rowsPerPage + 1;

	useEffect(() => {
		if (firstPageElement > data?.length) {
			setPage(0);
		}
	}, [data, firstPageElement]);

	const columns = [
		{ id: "S/N", label: "S/N", minWidth: 10 },
		{ id: "username", label: "Username", minWidth: 30 },
		{ id: "emailAddress", label: "Email Address", minWidth: 80 },
		{ id: "phoneNumber", label: "Phone Number", minWidth: 80 },
		{ id: "attendant", label: "Attendant", minWidth: 80 },
		{
			id: "bill",
			label: `Bill (${currencySymbolMap[region.region]})`,
			minWidth: 80,
		},
		{ id: "discount", label: "Discount (%)", minWidth: 80 },
		{
			id: "saving",
			label: `Saving (${currencySymbolMap[region.region]})`,
			minWidth: 80,
		},
		{
			id: "amountPaid",
			label: `Amount Paid (${currencySymbolMap[region.region]})`,
			minWidth: 80,
		},
		{ id: "partnerID", label: "Partner ID", minWidth: 50 },
		{ id: "discountID", label: "Discount ID", minWidth: 50 },
		{ id: "partnerName", label: "Partner Name", minWidth: 170 },
		{ id: "location", label: "Location", minWidth: 80 },
		{ id: "comment", label: "Comment", minWidth: 80 },
		{ id: "rating", label: "Rating", minWidth: 10 },
		{ id: "period", label: "Period", minWidth: 80 },
	];

	return (
		<Paper
			sx={{
				width: "100%",
				overflow: "hidden",
				marginBottom: "3rem",
			}}
		>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
									sx={{
										backgroundColor: "primary.main",
										color: "#fff",
									}}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{!loading &&
							data
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((item, index) => (
									<TableRow key={item.id} hover role="checkbox" tabIndex={-1}>
										<TableCell>{page * rowsPerPage + index + 1}</TableCell>
										<TableCell>{item.username || ""}</TableCell>
										<TableCell>{item.emailAddress || ""}</TableCell>
										<TableCell>{item.phoneNumber || ""}</TableCell>
										<TableCell>{item.attendant || ""}</TableCell>
										<TableCell>{numberFormatter(item.bill) || ""}</TableCell>
										<TableCell>
											{numberFormatter(item.discount) || ""}
										</TableCell>
										<TableCell>{numberFormatter(item.saving) || ""}</TableCell>
										<TableCell>
											{numberFormatter(item.amountPaid) || ""}
										</TableCell>
										<TableCell>{item.partnerID || ""}</TableCell>
										<TableCell>{item.discountID || ""}</TableCell>
										<TableCell>{item.partnerName || ""}</TableCell>
										<TableCell>{item.location || ""}</TableCell>
										<TableCell>{item.transaction_date || ""}</TableCell>
										<TableCell>{numberFormatter(item.rating) || ""}</TableCell>
										<TableCell>{item.period || ""}</TableCell>
									</TableRow>
								))}
					</TableBody>
				</Table>
			</TableContainer>
			{loading && (
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						width: "100%",
						marginTop: "2rem",
					}}
				>
					<CircularProgress size="2rem" />
				</Box>
			)}
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={data.length || 0}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}
