import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../src/createEmotionCache";
import theme from "../src/theme/Theme";
import Navigation from "../src/components/navigation/Navigation";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

	const [language, setLanguage] = React.useState("en-US");

	React.useEffect(() => {
		setLanguage(navigator.language);
	}, []);

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>
			<ThemeProvider theme={theme}>
				{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />

				<Navigation />
				<Component {...pageProps} language={language} />
			</ThemeProvider>
		</CacheProvider>
	);
}

MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	emotionCache: PropTypes.object,
	pageProps: PropTypes.object.isRequired,
};
