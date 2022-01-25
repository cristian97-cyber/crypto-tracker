import { useContext, useState, useEffect } from "react";
import Head from "next/head";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

import { LanguageContext } from "../src/context/languageContext";
import useHttp from "../src/hooks/useHttp";
import CryptoList from "../src/components/crypto/CryptoList";
import NewsList from "../src/components/news/NewsList";
import { getStatsAndCoins } from "../src/helpers";
import { NEWS_API_URL, NEWS_DB_URL } from "../src/config";

const Index = function (props) {
	const { stats, coins, error } = props;

	const language = useContext(LanguageContext);

	const [news, setNews] = useState();

	const [loading, httpError, sendHttpRequest] = useHttp();

	const getUpdatedNews = async function () {
		let updatedNews = [];

		for (let page = 0; page < 6; page++) {
			const foundNews = await sendHttpRequest(
				{
					url: `${NEWS_API_URL}&page=${page}`,
				},
				"Unable to retrieve the latest news"
			);
			if (!foundNews) break;

			foundNews.results.forEach(res => {
				if (res.image_url) {
					updatedNews.push({
						url: res.link,
						title: res.title,
						description: res.description,
						image: res.image_url,
						source:
							res.source_id.charAt(0).toUpperCase() + res.source_id.slice(1),
						date: new Date(res.pubDate).getTime(),
						updateDate: Date.now(),
					});
				}
			});
			if (!foundNews.nextPage) break;
		}

		if (updatedNews.length === 0) return;

		updatedNews = await sendHttpRequest(
			{
				url: `${NEWS_DB_URL}`,
				params: {
					method: "PUT",
					body: JSON.stringify(updatedNews),
					headers: {
						"Content-Type": "application/json",
					},
				},
			},
			"Unable to retrieve the latest news"
		);

		return updatedNews;
	};

	const getStoredNews = async function () {
		let foundNews = await sendHttpRequest(
			{
				url: `${NEWS_DB_URL}`,
			},
			"Unable to retrieve the latest news"
		);

		if (foundNews) {
			const actualTime = Date.now();
			const lastUpdateTime = foundNews[0].updateDate;
			const timeDifference = (actualTime - lastUpdateTime) / 1000 / 60;
			if (timeDifference >= 60) foundNews = await getUpdatedNews();

			if (foundNews) foundNews.sort((a, b) => b.date - a.date);
		} else {
			foundNews = await getUpdatedNews();
		}

		if (foundNews) setNews(foundNews);
	};

	useEffect(() => {
		getStoredNews();
	}, [sendHttpRequest]);

	const theme = useTheme();
	const downMd = useMediaQuery(theme.breakpoints.down("md"));

	if (error)
		return (
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
		);

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
							{!httpError && (
								<NewsList
									loading={loading}
									news={news ? news.slice(0, 6) : undefined}
								/>
							)}
							{!loading && httpError && (
								<Alert
									severity="error"
									action={
										<Button color="inherit" onClick={getStoredNews}>
											Try again
										</Button>
									}
									sx={{
										width: "100%",
									}}
								>
									<Typography variant="body1">{httpError}</Typography>
								</Alert>
							)}
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
		const { stats, coins } = await getStatsAndCoins();

		return {
			props: {
				stats,
				coins,
			},
			revalidate: 60,
		};
	} catch (err) {
		return {
			props: {
				error: "The site is temporarily unreachable",
			},
		};
	}
}
