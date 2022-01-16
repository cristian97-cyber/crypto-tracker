import { createTheme } from "@mui/material/styles";

const appOrange = "#FF7324";

const theme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: appOrange,
		},
	},

	typography: {
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
	},
});

export default theme;
