import { createTheme } from "@mui/material/styles";

const appOrange = "#FF7324";

const grey400 = "#bdbdbd";

const theme = createTheme({
	palette: {
		mode: "dark",
		common: {
			orange: appOrange,
			lightBackground: "#1a1a1a",
		},
		primary: {
			main: appOrange,
		},
	},

	typography: {
		h1: {
			fontFamily: "Roboto",
			fontSize: "2rem",
			fontWeight: 500,
		},
		h4: {
			color: grey400,
			fontFamily: "Roboto",
			fontSize: "1rem",
			fontWeight: 500,
		},
		subtitle1: {
			color: grey400,
			fontFamily: "Roboto",
			fontSize: "1rem",
			fontWeight: 400,
		},
		body1: {
			fontFamily: "Roboto",
			fontSize: "0.9rem",
			fontWeight: 400,
		},
		body2: {
			fontFamily: "Roboto",
			fontSize: "0.7rem",
			fontWeight: 400,
		},
		logo: {
			fontFamily: "Roboto",
			fontSize: "1.2rem",
			fontWeight: 500,
			textTransform: "none",
		},
		tabs: {
			fontFamily: "Roboto",
			fontSize: "1rem",
			fontWeight: 400,
			textTransform: "none",
		},
		cryptoStats: {
			fontFamily: "Roboto",
			fontSize: "1.5rem",
			fontWeight: 500,
			textTransform: "uppercase",
		},
	},
});

export default theme;
