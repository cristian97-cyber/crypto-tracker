import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Backdrop from "@mui/material/Backdrop";
import Alert from "@mui/material/Alert";

import CryptoList from "../../src/components/crypto/CryptoList";
import { getStatsAndCoins } from "../../src/helpers";
import { setCoins } from "../../src/store/searchSlice";

const Cryptocurrencies = function (props) {
	const { coins, error } = props;

	const dispatch = useDispatch();

	const router = useRouter();

	useEffect(() => {
		dispatch(setCoins(coins.coinsList));
	}, [coins]);

	const theme = useTheme();
	const downMd = useMediaQuery(theme.breakpoints.down("md"));
	const downSm = useMediaQuery(theme.breakpoints.down("sm"));
	const down300 = useMediaQuery(theme.breakpoints.down(300));

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

	const page = router.query.page ? +router.query.page : 1;
	const numItems = coins.coinsList.length;
	const itemsPerPage = 12;
	const numPages = Math.ceil(numItems / itemsPerPage);

	const changePage = function (newPage) {
		router.push(`${router.pathname}?page=${newPage}`);
	};

	return (
		<>
			<Head>
				<title>Crypto Tracker | Cryptocurrencies Real-Time Data</title>
			</Head>
			<Box component="section" sx={{ pt: "2rem", pb: "5rem" }}>
				<Container fixed>
					<Grid container direction="column" spacing={6}>
						<Grid item>
							<Typography variant="h1" align={!downMd ? "left" : "center"}>
								All Cryptocurrencies
							</Typography>
						</Grid>
						<Grid item>
							<CryptoList
								cryptos={coins.coinsList.slice(
									(page - 1) * itemsPerPage,
									page * itemsPerPage
								)}
							/>
						</Grid>
						<Grid item>
							<Grid container justifyContent="center">
								<Grid item>
									<Pagination
										count={numPages}
										color="primary"
										size={!downSm ? "large" : !down300 ? "medium" : "small"}
										siblingCount={!downSm ? 1 : 0}
										page={page}
										onChange={(_, page) => changePage(page)}
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

export default Cryptocurrencies;

export async function getStaticProps() {
	try {
		const { coins } = await getStatsAndCoins();

		return {
			props: { coins },
			revalidate: 60,
		};
	} catch (err) {
		return {
			props: {
				error: "This page is temporarily unreachable",
			},
		};
	}
}
