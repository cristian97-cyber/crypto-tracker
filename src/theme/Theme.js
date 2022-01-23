import { createTheme } from "@mui/material/styles";

const appOrange = "#FF7324";

const grey400 = "#bdbdbd";

const theme = createTheme({
	components: {
		MuiPaper: {
			styleOverrides: {
				root: {
					backgroundImage:
						"linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))",
				},
			},
		},
		MuiTable: {
			styleOverrides: {
				root: {
					borderCollapse: "separate",
				},
			},
		},
		MuiTableBody: {
			styleOverrides: {
				root: {
					"& .MuiTableRow-root": {
						cursor: "pointer",
					},
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
		mode: "dark",
		common: {
			orange: appOrange,
			grey400: grey400,
			surface5:
				"linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
			surface9:
				"linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))",
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
