import { useContext, useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Backdrop from "@mui/material/Backdrop";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";

import { LanguageContext } from "../../src/context/languageContext";
import MarketsTable from "../../src/components/crypto/MarketsTable";
import CryptoHistorical from "../../src/components/crypto/CryptoHistorical";
import { getStatsAndCoins, getCoin, getMarkets } from "../../src/helpers";
import useHttp from "../../src/hooks/use-http";
import { HISTORICAL_API_URL } from "../../src/config";

const calculateStartTime = function (endTime, interval) {
	let startTime;

	switch (interval) {
		case "1w":
			startTime = endTime - 7 * 24 * 60 * 60 * 1000;
			break;
		case "1m":
			startTime = endTime - 30 * 24 * 60 * 60 * 1000;
			break;
		case "3m":
			startTime = endTime - 90 * 24 * 60 * 60 * 1000;
			break;
		case "6m":
			startTime = endTime - 180 * 24 * 60 * 60 * 1000;
			break;
		case "1y":
			startTime = endTime - 365 * 24 * 60 * 60 * 1000;
			break;
		default:
			break;
	}

	return startTime;
};

const CryptocurrencyDetail = function (props) {
	const { coin, markets, error } = props;

	const router = useRouter();

	const language = useContext(LanguageContext);

	const [interval, setInterval] = useState("1w");
	const [chartData, setChartData] = useState([]);
	const [chartLabels, setChartLabels] = useState([]);

	const { loading, error: httpError, sendHttpRequest } = useHttp();

	useEffect(() => {
		const getHistoricalData = async function () {
			const endTime = Date.now();
			const startTime = calculateStartTime(endTime, interval);

			const startDate = new Date(startTime).toISOString().slice(0, 10);
			const endDate = new Date(endTime).toISOString().slice(0, 10);

			let data = await sendHttpRequest(
				{
					url: `${HISTORICAL_API_URL}/${coin.symbol.toLowerCase()}-${coin.name.toLowerCase()}/ohlcv/historical?start=${startDate}&end=${endDate}`,
				},
				"Unable to retrieve historical data"
			);
			if (!data) return;

			const factor = Math.floor(data.length / 7);
			let divisor = 5;

			let positions;
			if (interval === "1w") {
				positions = [1, 2, 3, 4, 5, 6, 7];
			} else {
				positions = [1, 2, 3, 4, 5].map(
					num => num * factor + Math.floor(factor / divisor--)
				);
				positions.unshift(0);
				positions.push(data.length - 1);
			}

			const chartValues = data
				.filter((_, i) => positions.includes(i))
				.map(item => (item.high + item.low) / 2);
			const chartDates = data
				.filter((_, i) => positions.includes(i))
				.map(item => new Date(item.time_open));

			setChartData(chartValues);
			setChartLabels(chartDates);
		};
		getHistoricalData();
	}, [router, interval, sendHttpRequest, coin]);

	const theme = useTheme();
	const downMd = useMediaQuery(theme.breakpoints.down("md"));

	if (error) {
		return (
			<Backdrop
				open={true}
				sx={{
					zIndex: theme.zIndex.appBar + 1,
				}}
			>
				<Alert
					severity="error"
					action={
						<Button color="inherit" onClick={() => router.replace("/")}>
							RETURN TO HOME
						</Button>
					}
					sx={{
						alignItems: "center",
						width: "50%",

						[theme.breakpoints.down("lg")]: {
							width: "70%",
						},

						[theme.breakpoints.down("md")]: {
							width: "90%",
						},

						[theme.breakpoints.down("sm")]: {
							flexDirection: "column",
							textAlign: "center",

							"& .MuiAlert-icon": {
								mr: 0,
							},

							"& .MuiAlert-action": {
								pl: 0,
								ml: 0,
							},
						},
					}}
				>
					<Typography variant="body1">
						The currency you have searched does not exists
					</Typography>
				</Alert>
			</Backdrop>
		);
	}

	const currencyOptions = {
		style: "currency",
		currency: "USD",
		currencyDisplay: "narrowSymbol",
		notation: "compact",
	};
	const cnf = new Intl.NumberFormat(language, currencyOptions);

	const coinPrice = cnf.format(coin.price);
	const coinVolume = cnf.format(coin.volume);
	const coinMarketCap = cnf.format(coin.marketCap);
	const coinDailyChange =
		(coin.dailyChange >= 0 ? "+" : "") + coin.dailyChange + "%";

	return (
		<>
			<Head>
				<title>Crypto Tracker | {coin.name} Real-Time Stats</title>
			</Head>
			<Grid
				container
				direction="column"
				spacing={8}
				sx={{
					py: "2rem",
					pb: "5rem",
				}}
			>
				<Grid item>
					<Box component="section">
						<Container fixed>
							<Grid
								container
								justifyContent={!downMd ? "flex-start" : "center"}
								alignItems="center"
								spacing={2}
								sx={{
									mb: "2.5rem",
								}}
							>
								<Grid item>
									<Typography variant="h1" align={!downMd ? "left" : "center"}>
										{coin.name}
									</Typography>
								</Grid>
								<Grid item>
									<Box
										component="img"
										alt={`${coin.name} logo`}
										src={coin.icon}
										sx={{
											height: "3rem",
										}}
									/>
								</Grid>
							</Grid>
							<Grid
								container
								columnSpacing={2}
								rowSpacing={4}
								align={!downMd ? "left" : "center"}
							>
								<Grid item xs={12}>
									<Typography variant="subtitle1">Symbol</Typography>
									<Typography variant="cryptoStats">{coin.symbol}</Typography>
								</Grid>
								<Grid item xs={12} sm={6}>
									<Typography variant="subtitle1">Rank</Typography>
									<Typography variant="cryptoStats">{coin.rank}</Typography>
								</Grid>
								<Grid item xs={12} sm={6}>
									<Typography variant="subtitle1">Price</Typography>
									<Typography variant="cryptoStats">{coinPrice}</Typography>
								</Grid>
								<Grid item xs={12} sm={6}>
									<Typography variant="subtitle1">Daily change</Typography>
									<Typography
										variant="cryptoStats"
										sx={{
											color: coinDailyChange.includes("+")
												? theme.palette.success.main
												: theme.palette.error.main,
										}}
									>
										{coinDailyChange}
									</Typography>
								</Grid>
								<Grid item xs={12} sm={6}>
									<Typography variant="subtitle1">Volume</Typography>
									<Typography variant="cryptoStats">{coinVolume}</Typography>
								</Grid>
								<Grid item xs={12} sm={6}>
									<Typography variant="subtitle1">Market Cap</Typography>
									<Typography variant="cryptoStats">{coinMarketCap}</Typography>
								</Grid>
								<Grid item xs={12} sm={6}>
									<Typography variant="subtitle1">Website</Typography>
									<Link
										href={coin.websiteUrl}
										underline="hover"
										target="_blank"
										rel="noreferrer"
										sx={{
											fontSize: "1.2rem",
										}}
									>
										{coin.websiteUrl}
									</Link>
								</Grid>
							</Grid>
						</Container>
					</Box>
				</Grid>
				<Grid item sx={{ width: "100%" }}>
					<Box
						component="section"
						sx={{
							backgroundImage: theme.palette.common.surface5,
							py: "5rem",
						}}
					>
						<Container fixed>
							<Typography
								variant="h1"
								align={!downMd ? "left" : "center"}
								sx={{ mb: "2.5rem" }}
							>
								Markets
							</Typography>
							<Box sx={{ width: "100%" }}>
								<MarketsTable data={markets} />
							</Box>
						</Container>
					</Box>
				</Grid>
				<Grid item sx={{ width: "100%" }}>
					<Box component="section">
						<Container fixed>
							<Typography
								variant="h1"
								align={!downMd ? "left" : "center"}
								sx={{ mb: "2.5rem" }}
							>
								Historical Price Chart
							</Typography>
							<Grid container justifyContent="flex-end" sx={{ mb: "2rem" }}>
								<Grid item>
									<FormControl
										sx={{
											width: "15rem",

											[theme.breakpoints.down("sm")]: {
												width: "10rem",
											},
										}}
									>
										<InputLabel id="historical-interval">Interval</InputLabel>
										<Select
											labelId="historical-interval"
											id="select-interval"
											label="Interval"
											value={interval}
											onChange={e => setInterval(e.target.value)}
										>
											<MenuItem value="1w">Weekly</MenuItem>
											<MenuItem value="1m">Monthly</MenuItem>
											<MenuItem value="3m">Three months</MenuItem>
											<MenuItem value="6m">Six months</MenuItem>
											<MenuItem value="1y">Annual</MenuItem>
										</Select>
									</FormControl>
								</Grid>
							</Grid>
							{loading && (
								<Grid
									container
									justifyContent="center"
									sx={{ minHeight: "30rem" }}
								>
									<Grid item>
										<CircularProgress />
									</Grid>
								</Grid>
							)}
							{!loading && httpError && (
								<Alert
									severity="error"
									sx={{
										justifyContent: "center",
										width: "100%",
									}}
								>
									<Typography variant="body1">{httpError}</Typography>
								</Alert>
							)}
							{!loading && !httpError && chartData.length === 0 && (
								<Alert
									severity="info"
									sx={{
										justifyContent: "center",
										width: "100%",
									}}
								>
									<Typography variant="body1">
										There are no data about this currency
									</Typography>
								</Alert>
							)}
							{!loading && !httpError && chartData.length > 0 && (
								<CryptoHistorical
									data={chartData}
									labels={chartLabels}
									interval={interval}
								/>
							)}
						</Container>
					</Box>
				</Grid>
			</Grid>
		</>
	);
};

export default CryptocurrencyDetail;

export async function getStaticPaths() {
	try {
		const { coins } = await getStatsAndCoins();

		const paths = coins.coinsList.map(coin => ({ params: { id: coin.id } }));

		return {
			paths,
			fallback: "blocking",
		};
	} catch (err) {}
}

export async function getStaticProps(context) {
	try {
		const id = context.params.id;

		const coin = await getCoin(id);
		const markets = await getMarkets(id);

		return {
			props: {
				coin,
				markets,
			},
		};
	} catch (err) {
		return {
			props: {
				error: true,
			},
		};
	}
}
