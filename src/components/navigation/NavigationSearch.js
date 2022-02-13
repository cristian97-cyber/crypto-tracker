import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";

import { useTheme, alpha } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

const generateBackPath = function (router) {
	const pathname = router.pathname;
	const pathStructure = pathname.split("/").slice(1);

	let dynamicRouteName = "";
	const newPathStructure = pathStructure.map(str => {
		if (!str.includes("[")) return str;

		dynamicRouteName = str.slice(1, -1);
		const dynamicRouteValue = router.query[dynamicRouteName];
		return dynamicRouteValue;
	});

	if (router.query) {
		let routeParams = "";
		let first = true;

		for (const [paramName, paramValue] of Object.entries(router.query)) {
			if (paramName === dynamicRouteName) break;

			routeParams += `${first ? "?" : "&"}${paramName}=${paramValue}`;
			first = false;
		}

		newPathStructure[newPathStructure.length - 1] = `${
			newPathStructure[newPathStructure.length - 1]
		}${routeParams}`;
	}

	return `/${newPathStructure.join("/")}`;
};

const NavigationSearch = function (props) {
	const { closeDrawer } = props;

	const router = useRouter();

	const [query, setQuery] = useState("");
	const [backPath, setBackPath] = useState("/");

	useEffect(() => {
		if (router.pathname !== "/search") {
			setBackPath(generateBackPath(router));
			setQuery("");
		} else {
			setQuery(router.query.q ? router.query.q : "");
		}
	}, [router]);

	const changeQuery = function (event) {
		setQuery(event.target.value);

		if (event.target.value.length > 0) {
			router.push(encodeURI(`/search?q=${event.target.value}`));
			// router.push(`/search?q=${event.target.value}`);
		} else {
			router.push(backPath);
		}
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
					onFocus: closeDrawer,
				}}
				sx={{
					width: "20rem",
					backgroundColor:
						theme.palette.mode === "dark"
							? alpha(theme.palette.common.white, 0.15)
							: alpha(theme.palette.common.black, 0.1),
					borderRadius: 2,
					mr: 0,

					"&:hover": {
						backgroundColor:
							theme.palette.mode === "dark"
								? alpha(theme.palette.common.white, 0.25)
								: alpha(theme.palette.common.black, 0.15),
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
