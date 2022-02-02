import { useState } from "react";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Fade from "@mui/material/Fade";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";

import CryptoList from "../crypto/CryptoList";

const SearchView = function (props) {
	const { visible, results } = props;

	const itemsPerPage = 12;

	const numPages = Math.ceil(results.length / itemsPerPage);
	const [page, setPage] = useState(1);

	const theme = useTheme();
	const downSm = useMediaQuery(theme.breakpoints.down("sm"));
	const down300 = useMediaQuery(theme.breakpoints.down(300));

	return (
		<Fade in={visible} mountOnEnter unmountOnExit>
			<Container
				fixed
				sx={{
					display: results.length === 0 ? "flex" : "block",
					justifyContent: results.length === 0 ? "center" : undefined,
					alignItems: results.length === 0 ? "center" : undefined,
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
							<Typography variant="h4" sx={{ mb: "2rem" }}>
								No results
							</Typography>
						)}
					</Grid>
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
				</Grid>
			</Container>
		</Fade>
	);
};

export default SearchView;
