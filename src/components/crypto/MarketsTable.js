import { useState } from "react";

import { visuallyHidden } from "@mui/utils";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

const headCells = [
	{
		id: "exchange",
		disablePadding: true,
		label: "Exchange",
	},
	{
		id: "price",
		disablePadding: false,
		label: "Price",
	},
	{
		id: "Pair",
		disablePadding: false,
		label: "Pair",
	},
	{
		id: "volume",
		disablePadding: false,
		label: "Volume",
	},
];

const descendingComparator = function (a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) return -1;
	if (b[orderBy] > a[orderBy]) return 1;

	return 0;
};

const getComparator = function (order, orderBy) {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
};

const EnhancedTableHead = function (props) {
	const { order, orderBy, onRequestSort } = props;

	const createSortHandler = function (property) {
		return event => onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{headCells.map(cell => (
					<TableCell
						key={cell.id}
						align="left"
						padding={cell.disablePadding ? "none" : "normal"}
						sortDirection={orderBy === cell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === cell.id}
							direction={orderBy === cell.id ? order : "asc"}
							onClick={createSortHandler(cell.id)}
						>
							{cell.label}
							{orderBy === cell.id ? (
								<Box component="span" sx={visuallyHidden}>
									{order === "desc" ? "sorted descending" : "sorted ascending"}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
};

const MarketsTable = function (props) {
	const { data } = props;

	const [order, setOrder] = useState("asc");
	const [orderBy, setOrderBy] = useState("name");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const handleRequestSort = function (_, property) {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleChangePage = function (_, newPage) {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = function (event) {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

	return (
		<Paper
			elevation={0}
			sx={{
				width: "100%",
				backgroundColor: "transparent",
				backgroundImage: "none",
			}}
		>
			<Table aria-label="Exchanges table">
				<EnhancedTableHead
					order={order}
					orderBy={orderBy}
					onRequestSort={handleRequestSort}
				/>
				<TableBody>
					{data
						.slice()
						.sort(getComparator(order, orderBy))
						.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						.map(row => {
							return (
								<TableRow key={row.exchange} hover>
									<TableCell component="th" scope="row" padding="none">
										{row.exchange}
									</TableCell>
									<TableCell>{row.price}</TableCell>
									<TableCell>{row.pair}</TableCell>
									<TableCell>{row.volume}</TableCell>
								</TableRow>
							);
						})}
					{emptyRows > 0 && (
						<TableRow
							style={{ height: 53 * emptyRows }}
							sx={{
								"&:hover": {
									cursor: "auto",
								},
							}}
						>
							<TableCell colSpan={4} />
						</TableRow>
					)}
				</TableBody>
			</Table>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={data.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
};

export default MarketsTable;
