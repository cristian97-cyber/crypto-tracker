import { useState, useEffect } from "react";
import Head from "next/head";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import CryptoList from "../src/components/crypto/CryptoList";
import NewsList from "../src/components/news/NewsList";
import sendHttp from "../src/sendHttp";
import { STATS_API_URL, EXCHANGES_API_URL } from "../src/config";

const Index = function (props) {
	const { stats } = props;

	const [language, setLanguage] = useState("en-US");

	useEffect(() => {
		setLanguage(navigator.language);
	}, []);

	const theme = useTheme();
	const downMd = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<>
			<Head>
				<title>Crypto Tracker | Home</title>
			</Head>
			<Grid
				container
				direction="column"
				spacing={8}
				sx={{
					pt: "2rem",
					pb: "5rem",
				}}
			>
				<Grid item>
					<Box component="section">
						<Container fixed>
							<Typography
								variant="h1"
								align={!downMd ? "left" : "center"}
								sx={{
									mb: "2.5rem",
								}}
							>
								Global Crypto Stats
							</Typography>
							<Grid
								container
								columnSpacing={2}
								rowSpacing={4}
								align={!downMd ? "left" : "center"}
							>
								{Object.values(stats).map(stat => {
									const options = {
										style: "currency",
										currency: "USD",
										currencyDisplay: "narrowSymbol",
										notation: "compact",
									};

									const nf = new Intl.NumberFormat(
										language,
										stat.name === "Total Market Cap" ||
										stat.name === "Total 24h Volume"
											? options
											: undefined
									);

									return (
										<Grid item xs={12} sm={6} key={stat.name}>
											<Typography variant="subtitle1">{stat.name}</Typography>
											<Typography variant="cryptoStats">
												{nf.format(stat.data)}
											</Typography>
										</Grid>
									);
								})}
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
							<Typography
								variant="h1"
								align={!downMd ? "left" : "center"}
								sx={{ mb: "2.5rem" }}
							>
								Top 10 Cryptos In The World
							</Typography>
							<CryptoList />
						</Container>
					</Box>
				</Grid>
				<Grid item>
					<Box component="section">
						<Container fixed>
							<Typography
								variant="h1"
								align={!downMd ? "left" : "center"}
								sx={{ mb: "2.5rem" }}
							>
								Latest Cryptos News
							</Typography>
							<NewsList />
						</Container>
					</Box>
				</Grid>
			</Grid>
		</>
	);
};

export default Index;

export async function getStaticProps() {
	let stats;
	try {
		let foundStats = await sendHttp(STATS_API_URL);
		foundStats = foundStats[0];

		const foundExchanges = await sendHttp(EXCHANGES_API_URL);

		stats = {
			totalCryptos: {
				name: "Total Cryptocurrencies",
				data: foundStats.coins_count,
			},
			totalExchanges: {
				name: "Total Exchanges",
				data: Object.keys(foundExchanges).length,
			},
			totalMarketCap: {
				name: "Total Market Cap",
				data: foundStats.total_mcap,
			},
			total24Volume: {
				name: "Total 24h Volume",
				data: foundStats.total_volume,
			},
			totalMarkets: {
				name: "Total Markets",
				data: foundStats.active_markets,
			},
		};

		return {
			props: {
				stats,
			},
		};
	} catch (err) {}
}
