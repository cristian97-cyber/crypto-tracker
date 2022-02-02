import { useState } from "react";
import { useRouter } from "next/router";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Backdrop from "@mui/material/Backdrop";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";

import { getStatsAndCoins } from "../src/helpers";
import CryptoList from "../src/components/crypto/CryptoList";

const Search = function (props) {
	const { coins, error } = props;

	const router = useRouter();

	const theme = useTheme();
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

	const query = router.query.q ? router.query.q : "";
	const results = coins.coinsList.filter(coin =>
		coin.name.toLowerCase().includes(query.toLowerCase())
	);

	const itemsPerPage = 12;
	const numPages = Math.ceil(results.length / itemsPerPage);
	const [page, setPage] = useState(1);

	return (
		<Container
			fixed
			sx={{
				pt: "2rem",
				pb: "5rem",
			}}
		>
			<Grid container direction="column" spacing={6}>
				<Grid item>
					{results.length > 0 ? (
						<CryptoList
							cryptos={results.slice(
								(page - 1) * itemsPerPage,
								page * itemsPerPage
							)}
							sx={{ mb: "2rem" }}
						/>
					) : (
						<Typography variant="h4" align="center" sx={{ mb: "2rem" }}>
							No results
						</Typography>
					)}
				</Grid>
				{results.length > 0 && (
					<Grid item>
						<Grid container justifyContent="center">
							<Pagination
								count={numPages}
								color="primary"
								size={!downSm ? "large" : !down300 ? "medium" : "small"}
								siblingCount={!downSm ? 1 : 0}
								page={page}
								onChange={(_, newPage) => setPage(newPage)}
							/>
						</Grid>
					</Grid>
				)}
			</Grid>
		</Container>
	);
};

export default Search;

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
