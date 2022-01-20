import Head from "next/head";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";

import NewsList from "../src/components/news/NewsList";

const News = function () {
	const theme = useTheme();
	const downMd = useMediaQuery(theme.breakpoints.down("md"));
	const downSm = useMediaQuery(theme.breakpoints.down("sm"));
	const down300 = useMediaQuery(theme.breakpoints.down(300));

	return (
		<>
			<Head>
				<title>Crypto Tracker | Latest News About Cryptocurrencies World</title>
			</Head>
			<Box component="section" sx={{ pt: "2rem", pb: "5rem" }}>
				<Container fixed>
					<Grid container direction="column" spacing={6}>
						<Grid item>
							<Typography variant="h1" align={!downMd ? "left" : "center"}>
								News
							</Typography>
						</Grid>
						<Grid item>
							<NewsList />
						</Grid>
						<Grid item>
							<Grid container justifyContent="center">
								<Grid item>
									<Pagination
										count={10}
										color="primary"
										size={!downSm ? "large" : !down300 ? "medium" : "small"}
										siblingCount={!downSm ? 1 : 0}
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

export default News;
