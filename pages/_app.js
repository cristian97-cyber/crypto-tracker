import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";

import LanguageContextProvider from "../src/context/languageContext";
import SearchContextProvider from "../src/context/searchContext";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../src/createEmotionCache";
import Fade from "@mui/material/Fade";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import theme from "../src/theme/Theme";
import Navigation from "../src/components/navigation/Navigation";
import CryptoList from "../src/components/crypto/CryptoList";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

	const [searchMode, setSearchMode] = React.useState(false);
	const [searchResults, setSearchResults] = React.useState([]);

	const changeSearchMode = React.useCallback(mode => setSearchMode(mode), []);
	const changeSearchResults = React.useCallback(
		results => setSearchResults(results),
		[]
	);

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>

			<SearchContextProvider>
				<LanguageContextProvider>
					<ThemeProvider theme={theme}>
						{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
						<CssBaseline />

						<Navigation
							changeSearchMode={changeSearchMode}
							changeSearchResults={changeSearchResults}
						/>
						{!searchMode && <Component {...pageProps} />}
						<Fade in={searchMode}>
							<Container
								fixed
								sx={{
									display: searchResults.length === 0 ? "flex" : "block",
									justifyContent:
										searchResults.length === 0 ? "center" : undefined,
									alignItems: searchResults.length === 0 ? "center" : undefined,
									pt: "2rem",
									pb: "5rem",
								}}
							>
								{searchResults.length > 0 ? (
									<CryptoList cryptos={searchResults} />
								) : (
									<Typography variant="h4">No results</Typography>
								)}
							</Container>
						</Fade>
					</ThemeProvider>
				</LanguageContextProvider>
			</SearchContextProvider>
		</CacheProvider>
	);
}

MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	emotionCache: PropTypes.object,
	pageProps: PropTypes.object.isRequired,
};
