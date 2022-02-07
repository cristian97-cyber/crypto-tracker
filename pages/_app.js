import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";

import LanguageContextProvider from "../src/context/languageContext";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, useTheme } from "@emotion/react";
import createEmotionCache from "../src/createEmotionCache";

import darkTheme from "../src/theme/DarkTheme";
import lightTheme from "../src/theme/LightTheme";
import Navigation from "../src/components/navigation/Navigation";
import ThemeSelector from "../src/components/ThemeSelector";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

	const [themeStyle, setThemeStyle] = React.useState("light");

	const toggleThemeStyle = function () {
		setThemeStyle(prev => (prev === "dark" ? "light" : "dark"));
	};

	React.useEffect(() => {
		const savedThemeStyle = localStorage.getItem("theme-style");
		if (savedThemeStyle) setThemeStyle(savedThemeStyle);
	}, []);

	React.useEffect(() => {
		localStorage.setItem("theme-style", themeStyle);
	}, [themeStyle]);

	const theme = themeStyle === "dark" ? darkTheme : lightTheme;

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="initial-scale=1, width=device-width" />
				<link
					rel="shortcut icon"
					href={themeStyle === "dark" ? "/logo_orange.svg" : "/logo_blue.svg"}
				/>
			</Head>

			<LanguageContextProvider>
				<ThemeProvider theme={theme}>
					{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
					<CssBaseline />
					<Navigation
						themeStyle={themeStyle}
						toggleThemeStyle={toggleThemeStyle}
					/>
					<Component {...pageProps} />
				</ThemeProvider>
			</LanguageContextProvider>
		</CacheProvider>
	);
}

MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	emotionCache: PropTypes.object,
	pageProps: PropTypes.object.isRequired,
};
