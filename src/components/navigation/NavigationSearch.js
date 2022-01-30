import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useTheme, alpha } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import { setQuery, setResults, setLoading } from "../../store/searchSlice";

const NavigationSearch = function (props) {
	const { closeDrawer } = props;

	const searchSlice = useSelector(state => state.search);
	const dispatch = useDispatch();

	useEffect(() => {
		const query = searchSlice.query;
		const coins = searchSlice.coins;

		if (!query) {
			dispatch(setResults([]));
			dispatch(setLoading(false));
			return;
		}

		dispatch(setLoading(true));

		const timeout = setTimeout(() => {
			const filteredCoins = coins.filter(coin =>
				coin.name.toLowerCase().includes(searchSlice.query.toLowerCase())
			);

			dispatch(setResults(filteredCoins));
			dispatch(setLoading(false));
		}, 500);

		return () => clearTimeout(timeout);
	}, [searchSlice.query, searchSlice.coins, dispatch, setResults, setLoading]);

	const theme = useTheme();
	const down370 = useMediaQuery(theme.breakpoints.down(370));

	const placeholder = !down370 ? "Search currency" : "";

	return (
		<>
			<TextField
				id="search-currency"
				value={searchSlice.query}
				onChange={e => dispatch(setQuery(e.target.value))}
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
									opacity: searchSlice.loading ? 1 : 0,
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
		</>
	);
};

export default NavigationSearch;
