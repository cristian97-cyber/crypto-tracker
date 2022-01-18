import Head from "next/head";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";

import NewsList from "../src/components/news/NewsList";

const News = function () {
	return (
		<>
			<Head>
				<title>Crypto Tracker | Latest News About Cryptocurrencies World</title>
			</Head>
			<Box component="section" sx={{ py: "2rem" }}>
				<Container fixed>
					<Grid container direction="column" spacing={6}>
						<Grid item>
							<Typography variant="h1">News</Typography>
						</Grid>
						<Grid item>
							<NewsList />
						</Grid>
						<Grid item>
							<Grid container justifyContent="center">
								<Grid item>
									<Pagination count={10} color="primary" size="large" />
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Container>
			</Box>
		</>
	);
};

export default News;
