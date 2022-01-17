import Head from "next/head";

import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import CryptoList from "../src/components/crypto/CryptoList";
import NewsList from "../src/components/news/NewsList";

const Index = function () {
	const theme = useTheme();

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
					py: "2rem",
				}}
			>
				<Grid item>
					<Box component="section">
						<Container fixed>
							<Typography
								variant="h1"
								sx={{
									mb: "1.5rem",
								}}
							>
								Global Crypto Stats
							</Typography>
							<Grid container columnSpacing={2} rowSpacing={4}>
								<Grid item xs={6}>
									<Typography variant="subtitle1">
										Total Cryptocurrencies
									</Typography>
									<Typography variant="cryptoStats">12,176</Typography>
								</Grid>
								<Grid item xs={6}>
									<Typography variant="subtitle1">Total Exchanges</Typography>
									<Typography variant="cryptoStats">373</Typography>
								</Grid>
								<Grid item xs={6}>
									<Typography variant="subtitle1">Total Market Cap</Typography>
									<Typography variant="cryptoStats">$2.4T</Typography>
								</Grid>
								<Grid item xs={6}>
									<Typography variant="subtitle1">Total 24th Volume</Typography>
									<Typography variant="cryptoStats">$92.3B</Typography>
								</Grid>
								<Grid item xs={6}>
									<Typography variant="subtitle1">Total Markets</Typography>
									<Typography variant="cryptoStats">80K</Typography>
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
								Top 10 Cryptos In The World
							</Typography>
							<CryptoList />
						</Container>
					</Box>
				</Grid>
				<Grid item>
					<Box component="section">
						<Container fixed>
							<Typography variant="h1" sx={{ mb: "1.5rem" }}>
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
