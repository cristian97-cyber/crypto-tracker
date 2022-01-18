import Head from "next/head";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";

import CryptoList from "../../src/components/crypto/CryptoList";

const Cryptocurrencies = function () {
	return (
		<>
			<Head>
				<title>Crypto Tracker | Cryptocurrencies Real-Time Data</title>
			</Head>
			<Box component="section" sx={{ py: "2rem" }}>
				<Container fixed>
					<Grid container direction="column" spacing={6}>
						<Grid item>
							<Typography variant="h1">All Cryptocurrencies</Typography>
						</Grid>
						<Grid item>
							<CryptoList />
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

export default Cryptocurrencies;
