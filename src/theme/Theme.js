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
			fontSize: "1.5rem",
			fontWeight: 300,
			textTransform: "none",
		},
	},
});

export default theme;
