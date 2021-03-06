import { useState, useContext } from "react";

import { visuallyHidden } from "@mui/utils";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";

import { LanguageContext } from "../../context/languageContext";

const headCells = [
	{
		id: "rank",
		disablePadding: true,
		label: "Rank",
	},
	{
		id: "name",
		disablePadding: false,
		label: "Name",
	},
	{
		id: "tradeVolume",
		disablePadding: false,
		label: "Volume (24h)",
	},
	{
		id: "url",
		disablePadding: false,
		label: "Url",
	},
];

const descendingComparator = function (a, b, orderBy) {
	let aData = a[orderBy];
	let bData = b[orderBy];
	if (typeof aData === "string") {
		aData = aData.toLowerCase();
		bData = bData.toLowerCase();
	}

	if (bData < aData) return -1;
	if (bData > aData) return 1;

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

const ExchangesTable = function (props) {
	const { data, page, setPage } = props;

	const language = useContext(LanguageContext);

	const [order, setOrder] = useState("asc");
	const [orderBy, setOrderBy] = useState("rank");
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
			<TableContainer>
				<Table aria-label="Exchanges table" sx={{ minWidth: 500 }}>
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
								const nf = new Intl.NumberFormat(language, {
									style: "currency",
									currency: "USD",
									currencyDisplay: "narrowSymbol",
									notation: "compact",
								});

								const tradeVolume =
									row.tradeVolume !== undefined
										? nf.format(row.tradeVolume)
										: undefined;

								return (
									<TableRow key={row.name} hover>
										<TableCell component="th" scope="row" padding="none">
											{row.rank}
										</TableCell>
										<TableCell>{row.name}</TableCell>
										<TableCell>{tradeVolume ? tradeVolume : "N/A"}</TableCell>
										<TableCell>
											{row.url ? (
												<Link
													href={row.url}
													underline="hover"
													target="_blank"
													rel="noreferrer"
												>
													{row.url}
												</Link>
											) : (
												"N/A"
											)}
										</TableCell>
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
			</TableContainer>
		</Paper>
	);
};

export default ExchangesTable;
