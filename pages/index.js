import { useContext, useState, useEffect } from "react";
import Head from "next/head";
import { LanguageContext } from "../src/context/languageContext";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import useHttp from "../src/hooks/useHttp";
import CryptoList from "../src/components/crypto/CryptoList";
import NewsList from "../src/components/news/NewsList";
import sendHttp from "../src/sendHttp";
import {
	STATS_API_URL,
	COINS_API_URL,
	EXCHANGES_API_URL,
	NEWS_DB_URL,
} from "../src/config";

const DUMMY_NEWS = [
	{
		date: 1642951465000,
		description:
			"The central Asian country became No. 2 in the world for Bitcoin mining. But political turmoil and power cuts have hit hard, and the future looks bleak.",
		image:
			"https://media.wired.com/photos/61de2d453e654a13e9a16ef0/191:100/w_1280,c_limit/Business_Kazakhstan-2HDE52K.jpg",
		source: "Wired",
		title: "As Kazakhstan Descends into Chaos, Crypto Miners Are at a Loss",
		url: "https://www.wired.com/story/kazakhstan-cryptocurrency-mining-unrest-energy/",
	},
	{
		date: 1642346665000,
		description:
			"Block is working on building an “open Bitcoin mining system,” its CEO Jack Dorsey has announced. The company’s goals for the system are for it to be easily available, reliable, and relatively power efficient.",
		image:
			"https://cdn.vox-cdn.com/thumbor/NE548fVufAlHoBliurOdnG-lfuw=/0x215:3000x1786/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/23168502/1321753348.jpg",
		source: "The Verge",
		title: "Jack Dorsey’s Block is working to make Bitcoin mining easier",
		url: 'https://www.theverge.com/2022/1/14/22883500/jack-dorsey-block-bitcoin-mining-system-open-source-mainstream"',
	},
	{
		date: 1637076265000,
		description:
			"Block founder Jack Dorsey has announced on Twitter that the company is officially building an open bitcoin mining system. Dorsey first announced in October last year that the digital payments provider, then known as Square, was considering working on the proj…",
		image:
			"https://s.yimg.com/os/creatr-uploaded-images/2021-12/b08eca30-67a7-11ec-bfef-a5351ba20ef6",
		source: "Engadget",
		title:
			"Block is officially building an 'open Bitcoin mining system,' says founder Jack Dorsey",
		url: 'https://www.engadget.com/jack-dorseys-block-is-officially-building-an-open-bitcoin-mining-system-114033482.html"',
	},
];

const Index = function (props) {
	const { stats, coins } = props;

	const language = useContext(LanguageContext);

	const [news, setNews] = useState();

	const [loading, sendHttpRequest] = useHttp();

	useEffect(() => {
		const getUpdatedNews = async function () {
			const updatedNews = await sendHttpRequest(
				"https://crypto-tracker-6391a-default-rtdb.firebaseio.com/news.json",
				{
					method: "PUT",
					body: JSON.stringify(DUMMY_NEWS),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			return updatedNews;
		};

		const getStoredNews = async function () {
			let foundNews = await sendHttpRequest(`${NEWS_DB_URL}`);

			if (foundNews) {
				foundNews.sort((a, b) => b.date - a.date);

				const actualTime = Date.now();
				const latestTime = foundNews[0].date;
				const timeDifference = (actualTime - latestTime) / 1000 / 60;

				if (timeDifference >= 60) foundNews = await getUpdatedNews();
			} else {
				foundNews = await getUpdatedNews();
			}

			setNews(foundNews);
		};
		getStoredNews();
	}, [sendHttpRequest]);

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

							<CryptoList cryptos={coins.coinsList.slice(0, 10)} />
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
							<NewsList loading={loading} news={news} />
						</Container>
					</Box>
				</Grid>
			</Grid>
		</>
	);
};

export default Index;

export async function getStaticProps() {
	try {
		let foundStats = await sendHttp(STATS_API_URL);
		foundStats = foundStats[0];

		const foundExchanges = await sendHttp(EXCHANGES_API_URL);

		const stats = {
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

		let foundCoins = await sendHttp(
			`${COINS_API_URL}&limit=${foundStats.coins_count}`
		);
		foundCoins = foundCoins.coins;

		const coinsList = foundCoins.map(coin => ({
			id: coin.id,
			name: coin.name,
			symbol: coin.symbol,
			rank: coin.rank,
			icon: coin.icon,
			price: coin.price,
			marketCap: coin.marketCap,
			dailyChange: coin.priceChange1d,
			volume: coin.volume,
			website: coin.websiteUrl ? coin.websiteUrl : "",
		}));

		const coins = {
			coinsList,
		};

		return {
			props: {
				stats,
				coins,
			},
			revalidate: 60,
		};
	} catch (err) {}
}
