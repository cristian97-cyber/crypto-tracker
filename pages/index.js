import { useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

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
import CryptoList from "../src/components/crypto/CryptoList";
import NewsList from "../src/components/news/NewsList";
import { getStatsAndCoins, getStoredNews } from "../src/helpers";

const Index = function (props) {
	const { stats, coins, news, generalError, newsError } = props;

	const language = useContext(LanguageContext);

	const router = useRouter();

	const theme = useTheme();
	const downMd = useMediaQuery(theme.breakpoints.down("md"));

	if (generalError)
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
					<Typography variant="body1">{generalError}</Typography>
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
							{!newsError && <NewsList news={news.slice(0, 6)} />}
							{newsError && (
								<Alert
									severity="error"
									action={
										<Button color="inherit" onClick={() => router.reload()}>
											Try again
										</Button>
									}
									sx={{
										width: "100%",
									}}
								>
									<Typography variant="body1">{newsError}</Typography>
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
	let stats, coins;

	try {
		const { stats: foundStats, coins: foundCoins } = await getStatsAndCoins();
		stats = foundStats;
		coins = foundCoins;

		const news = await getStoredNews();

		return {
			props: {
				stats,
				coins,
				news,
			},
			revalidate: 60,
		};
	} catch (err) {
		if (stats && coins) {
			return {
				props: {
					stats,
					coins,
					newsError: "Impossible to retrieve te latest news",
				},
			};
		}

		return {
			props: {
				generalError: "This page is temporarily unreachable",
			},
		};
	}
}
