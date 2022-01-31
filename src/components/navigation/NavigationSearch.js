import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

import { useTheme, alpha } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";

import { SearchContext } from "../../context/searchContext";

const NavigationSearch = function (props) {
	const { closeDrawer, changeSearchMode, changeSearchResults } = props;

	const router = useRouter();

	const searchCtx = useContext(SearchContext);
	const coins = searchCtx.coins;

	const [query, setQuery] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!query) {
			setLoading(false);
			changeSearchMode(false);
			changeSearchResults([]);
			return;
		}

		setLoading(true);

		const timeout = setTimeout(() => {
			let filteredCoins = coins.filter(coin =>
				coin.name.toLowerCase().includes(query.toLowerCase())
			);

			if (filteredCoins.length > 12) filteredCoins = filteredCoins.slice(0, 12);

			changeSearchResults(filteredCoins);
			changeSearchMode(true);
			setLoading(false);
		}, 500);

		return () => clearTimeout(timeout);
	}, [query, coins, changeSearchMode, changeSearchResults]);

	useEffect(() => {
		const handleRouteChange = function (url) {
			setQuery("");
		};

		router.events.on("routeChangeStart", handleRouteChange);

		return () => router.events.off("routeChangeStart", handleRouteChange);
	}, [router]);

	const theme = useTheme();
	const down370 = useMediaQuery(theme.breakpoints.down(370));

	const placeholder = !down370 ? "Search currency" : "";

	return (
		<>
			<TextField
				id="search-currency"
				value={query}
				onChange={e => setQuery(e.target.value)}
				placeholder={placeholder}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<SearchIcon />
						</InputAdornment>
					),
					endAdornment: (
						<InputAdornment position="end">
							<CircularProgress
								color="inherit"
								size="1.5rem"
								sx={{
									opacity: loading ? 1 : 0,
								}}
							/>
						</InputAdornment>
					),
					onFocus: closeDrawer,
				}}
				sx={{
					width: "20rem",
					backgroundColor: alpha(theme.palette.common.white, 0.15),
					borderRadius: 2,
					mr: 0,

					"&:hover": {
						backgroundColor: alpha(theme.palette.common.white, 0.25),
					},

					"& .MuiOutlinedInput-notchedOutline": {
						border: "none",
					},

					[theme.breakpoints.down("lg")]: {
						mr: "auto",
					},

					[theme.breakpoints.down("md")]: {
						width: "15rem",
					},

					[theme.breakpoints.down(450)]: {
						width: "100%",
						mx: "1rem",
					},
				}}
			/>

			{/* {pageRendered &&
				ReactDOM.createPortal(
					<Backdrop
						open={backdropVisible}
						sx={{
							height: "100%",
							position: "absolute",
							bottom: "auto",
							backgroundColor: theme.palette.common.baseBackground,
						}}
					>
						<Container fixed>
							{results.length > 0 && <CryptoList cryptos={results} />}
						</Container>
					</Backdrop>,
					document.querySelector("#__next")
				)} */}
		</>
	);
};

export default NavigationSearch;
