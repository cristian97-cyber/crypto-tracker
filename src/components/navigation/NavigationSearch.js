import { useState, useReducer, useEffect } from "react";
import { useRouter } from "next/router";

import { useTheme, alpha } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";

const NavigationSearch = function (props) {
	const { closeDrawer } = props;

	const router = useRouter();

	const [query, setQuery] = useState("");
	const [loading, setLoading] = useState(false);
	const [goBack, setGoBack] = useState(false);
	const [backPath, setBackPath] = useState("/");

	useEffect(() => {
		if (!query) {
			setLoading(false);
			return;
		}

		setLoading(true);

		const timeout = setTimeout(() => {
			router.push(`/search?q=${query}`);
			setLoading(false);
		}, 500);

		return () => clearTimeout(timeout);
	}, [query, router]);

	useEffect(() => {
		if (goBack) {
			router.push(backPath);
			setGoBack(false);
		}
	}, [goBack, router]);

	useEffect(() => {
		if (router.pathname !== "/search") {
			setQuery("");
			setBackPath(router.pathname);
		}
	}, [router]);

	const changeQuery = function (event) {
		setQuery(event.target.value);
		if (event.target.value.length === 0) setGoBack(true);

		return;
	};

	const theme = useTheme();
	const down370 = useMediaQuery(theme.breakpoints.down(370));

	const placeholder = !down370 ? "Search currency" : "";

	return (
		<>
			<TextField
				id="search-currency"
				value={query}
				onChange={changeQuery}
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
		</>
	);
};

export default NavigationSearch;
