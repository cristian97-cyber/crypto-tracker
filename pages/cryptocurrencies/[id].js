import Head from "next/head";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import MarketsTable from "../../src/components/crypto/MarketsTable";
import CryptoHistorical from "../../src/components/crypto/CryptoHistorical";

const tableData = [
	{
		exchange: "BitMEX",
		price: "6294",
		pair: "BTC/USD",
		volume: "1B",
	},
	{
		exchange: "OKEX",
		price: "6294",
		pair: "BTC/USD",
		volume: "1B",
	},
	{
		exchange: "Quoine",
		price: "6294",
		pair: "BTC/USD",
		volume: "1B",
	},
	{
		exchange: "BitForex",
		price: "6294",
		pair: "BTC/USD",
		volume: "1B",
	},
	{
		exchange: "HitBTC",
		price: "6294",
		pair: "BTC/USD",
		volume: "1B",
	},
	{
		exchange: "Simex",
		price: "6294",
		pair: "BTC/USD",
		volume: "1B",
	},
];

const chartData = [1200, 1300, 1500, 1000, 900, 2000, 2500];

const CryptocurrencyDetail = function () {
	const theme = useTheme();

	return (
		<>
			<Head>
				<title>Crypto Tracker | Bitcoin Real-Time Stats</title>
			</Head>
			<Grid
				container
				direction="column"
				spacing={8}
				sx={{
					py: "2rem",
				}}
			>
				<Grid item>
					<Box component="section">
						<Container fixed>
							<Grid
								container
								alignItems="center"
								spacing={2}
								sx={{
									mb: "1.5rem",
								}}
							>
								<Grid item>
									<Typography variant="h1">Bitcoin</Typography>
								</Grid>
								<Grid item>
									<Box
										component="img"
										alt="Cryptocurrency logo"
										src="https://static.coinstats.app/coins/Bitcoin6l39t.png"
										sx={{
											height: "3rem",
										}}
									/>
								</Grid>
							</Grid>
							<Grid container columnSpacing={2} rowSpacing={4}>
								<Grid item xs={6}>
									<Typography variant="subtitle1">Symbol</Typography>
									<Typography variant="cryptoStats">BTC</Typography>
								</Grid>
								<Grid item xs={6}>
									<Typography variant="subtitle1">Rank</Typography>
									<Typography variant="cryptoStats">1</Typography>
								</Grid>
								<Grid item xs={6}>
									<Typography variant="subtitle1">Price</Typography>
									<Typography variant="cryptoStats">48.6K</Typography>
								</Grid>
								<Grid item xs={6}>
									<Typography variant="subtitle1">Volume</Typography>
									<Typography variant="cryptoStats">4B</Typography>
								</Grid>
								<Grid item xs={6}>
									<Typography variant="subtitle1">Market Cap</Typography>
									<Typography variant="cryptoStats">914.68</Typography>
								</Grid>
								<Grid item xs={6}>
									<Typography variant="subtitle1">Website</Typography>
									<Link
										href="https://bitcoin.org"
										underline="hover"
										target="_blank"
										rel="noreferrer"
										sx={{
											fontSize: "1.2rem",
										}}
									>
										https://bitcoin.org
									</Link>
								</Grid>
							</Grid>
						</Container>
					</Box>
				</Grid>
				<Grid item>
					<Box
						component="section"
						sx={{
							backgroundImage: theme.palette.common.surface5,
							py: "5rem",
						}}
					>
						<Container fixed>
							<Typography variant="h1" sx={{ mb: "1.5rem" }}>
								Markets
							</Typography>
							<MarketsTable data={tableData} />
						</Container>
					</Box>
				</Grid>
				<Grid item>
					<Box component="section">
						<Container fixed>
							<Typography variant="h1" sx={{ mb: "1.5rem" }}>
								Historical Price Chart
							</Typography>
							<CryptoHistorical data={chartData} />
						</Container>
					</Box>
				</Grid>
			</Grid>
		</>
	);
};

export default CryptocurrencyDetail;
