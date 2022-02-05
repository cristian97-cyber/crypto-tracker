import { createTheme } from "@mui/material/styles";

const appBlue = "#1C1CE1";

const grey400 = "#808080";

const theme = createTheme({
	components: {
		MuiTable: {
			styleOverrides: {
				root: {
					borderCollapse: "separate",
				},
			},
		},
		MuiTableCell: {
			styleOverrides: {
				root: {
					fontSize: "0.9rem",
				},
			},
		},
		MuiTablePagination: {
			styleOverrides: {
				root: {
					fontSize: "0.9rem",

					"& .MuiSvgIcon-root": {
						fontSize: "1.3rem",
					},
				},
				selectLabel: {
					fontSize: "0.9rem",
				},
				displayedRows: {
					fontSize: "0.9rem",
				},
			},
		},
	},

	palette: {
		mode: "light",
		common: {
			orange: appBlue,
			grey400: grey400,
			baseBackground: "#121212",
			surface5: "linear-gradient(rgba(0, 0, 0, 0.025), rgba(0, 0, 0, 0.025))",
		},
		primary: {
			main: appBlue,
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
