import { useContext, useState, useEffect } from "react";

import { useTheme, alpha } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";

import { CoinsContext } from "../../context/coinsContext";

const NavigationSearch = function (props) {
	const { closeDrawer } = props;

	const coinsCtx = useContext(CoinsContext);

	const [query, setQuery] = useState("");
	const [loading, setLoading] = useState(false);

	const changeQuery = e => setQuery(e.target.value);

	useEffect(() => {
		if (!query) {
			setLoading(false);
			return;
		}

		setLoading(true);

		const timeout = setTimeout(() => {
			setLoading(false);
		}, 500);

		return () => clearTimeout(timeout);
	}, [query]);

	const theme = useTheme();
	const down370 = useMediaQuery(theme.breakpoints.down(370));

	const placeholder = !down370 ? "Search currency" : "";

	return (
		<TextField
			id="search-currency"
			value={query}
			onChange={changeQuery}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<SearchIcon />
					</InputAdornment>
				),
				endAdornment: (
					<InputAdornment position="end">
						<CircularProgress
							size="1.5rem"
							sx={{
								color: loading ? "inherit" : "transparent",
							}}
						/>
					</InputAdornment>
				),
				placeholder: placeholder,
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
	);
};

export default NavigationSearch;
