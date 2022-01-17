import Head from "next/head";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import ExchangesTable from "../src/components/exchanges/ExchangesTable";

const Exchanges = function () {
	const tableData = [
		{
			name: "Binance",
			tradeVolume: "$22.3B",
			markets: "1.2K",
			change: "24.2%",
		},
		{
			name: "Asdrubale",
			tradeVolume: "$22.3B",
			markets: "1.2K",
			change: "24.2%",
		},
		{
			name: "Savastano",
			tradeVolume: "$22.3B",
			markets: "1.2K",
			change: "24.2%",
		},
		{
			name: "Jesus",
			tradeVolume: "$22.3B",
			markets: "1.2K",
			change: "24.2%",
		},
		{
			name: "Pasquale",
			tradeVolume: "$22.3B",
			markets: "1.2K",
			change: "24.2%",
		},
		{
			name: "Mio zio",
			tradeVolume: "$22.3B",
			markets: "1.2K",
			change: "24.2%",
		},
		{
			name: "House",
			tradeVolume: "$22.3B",
			markets: "1.2K",
			change: "24.2%",
		},
		{
			name: "Jerry Scotti",
			tradeVolume: "$22.3B",
			markets: "1.2K",
			change: "24.2%",
		},
	];

	return (
		<>
			<Head>
				<title>Crypto Tracker | All Available Exchanges</title>
			</Head>
			<Box component="section" sx={{ py: "2rem" }}>
				<Container fixed>
					<Grid container direction="column" spacing={6}>
						<Grid item>
							<Typography variant="h1">Exchanges</Typography>
						</Grid>
						<Grid item>
							<Box sx={{ width: "100%" }}>
								<ExchangesTable data={tableData} />
							</Box>
						</Grid>
					</Grid>
				</Container>
			</Box>
		</>
	);
};

export default Exchanges;
