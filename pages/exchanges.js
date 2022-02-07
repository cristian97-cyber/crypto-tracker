import { useState } from "react";
import Head from "next/head";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Backdrop from "@mui/material/Backdrop";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";

import ExchangesTable from "../src/components/exchanges/ExchangesTable";
import { getExchanges } from "../src/helpers";

const Exchanges = function (props) {
	const { exchanges, error } = props;

	const [filterName, setFilterName] = useState("");
	const [tablePage, setTablePage] = useState(0);

	const changeFilter = function (event) {
		setTablePage(0);
		setFilterName(event.target.value);
	};

	const changePage = newPage => setTablePage(newPage);

	const filteredExchanges = !filterName
		? exchanges
		: exchanges.filter(ex =>
				ex.name.toLowerCase().includes(filterName.toLowerCase())
		  );

	const theme = useTheme();
	const downMd = useMediaQuery(theme.breakpoints.down("md"));

	if (error)
		return (
			<>
				<Head>
					<title>Crypto Tracker | Page Not Available</title>
				</Head>
				<Backdrop
					open={true}
					sx={{
						zIndex: theme.zIndex.appBar + 1,
					}}
				>
					<Alert
						severity="error"
						sx={{
							justifyContent: "center",
							width: "50%",

							[theme.breakpoints.down("md")]: {
								width: "90%",
							},
						}}
					>
						<Typography variant="body1">{error}</Typography>
					</Alert>
				</Backdrop>
			</>
		);

	return (
		<>
			<Head>
				<title>Crypto Tracker | All Available Exchanges</title>
				<meta
					name="description"
					content="View all available cryptocurrency exchanges and check their rank, name, 24h volume and website."
				/>
			</Head>
			<Box component="section" sx={{ pt: "2rem", pb: "5rem", width: "100%" }}>
				<Container fixed>
					<Grid container direction="column" spacing={6}>
						<Grid item>
							<Typography variant="h1" align={!downMd ? "left" : "center"}>
								Exchanges
							</Typography>
						</Grid>

						<Grid item sx={{ width: "100%" }}>
							<Grid container direction="column" spacing={2}>
								<Grid item sx={{ width: "100%" }}>
									<Grid container justifyContent="flex-end">
										<Grid item>
											<TextField
												id="exchange-name"
												label="Name"
												variant="outlined"
												value={filterName}
												onChange={changeFilter}
											/>
										</Grid>
									</Grid>
								</Grid>
								<Grid item sx={{ width: "100%" }}>
									<ExchangesTable
										data={filteredExchanges}
										page={tablePage}
										setPage={changePage}
									/>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Container>
			</Box>
		</>
	);
};

export default Exchanges;

export async function getStaticProps() {
	try {
		const exchanges = await getExchanges();

		return {
			props: { exchanges },
			revalidate: 60,
		};
	} catch (err) {
		return {
			props: {
				error: "This page is temporarily unreachable",
			},
			revalidate: 60,
		};
	}
}
