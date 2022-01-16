import { useState } from "react";

import { useTheme, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SearchIcon from "@mui/icons-material/Search";
import Link from "./Link";

const routes = [
	{
		name: "Home",
		link: "/",
	},
	{
		name: "Cryptocurrencies",
		link: "/cryptocurrencies",
	},
	{
		name: "Exchanges",
		link: "/exchanges",
	},
	{
		name: "News",
		link: "/news",
	},
];

const DesktopNavigation = function () {
	const [tabValue, setTabValue] = useState("/");

	const handleChangeTab = function (event, newValue) {
		setTabValue(newValue);
	};

	const theme = useTheme();

	return (
		<AppBar>
			<Toolbar
				sx={{
					py: "0.5rem",
				}}
			>
				<Button color="inherit">
					<Grid
						container
						alignItems="center"
						sx={{
							mr: "1rem",
						}}
					>
						<Grid
							item
							sx={{
								mr: "0.25rem",
							}}
						>
							<Box
								component="img"
								src="/logo.svg"
								alt="Website logo"
								sx={{
									height: "3rem",
								}}
							/>
						</Grid>
						<Grid item>
							<Typography variant="logo">Crypto Tracker</Typography>
						</Grid>
					</Grid>
				</Button>

				<Tabs
					value={tabValue}
					onChange={handleChangeTab}
					aria-label="Navigation tabs"
					sx={{
						mr: "auto",
					}}
				>
					{routes.map(route => (
						<Tab
							key={route.link}
							label={route.name}
							value={route.link}
							component={Link}
							href={route.link}
							sx={{
								...theme.typography.tabs,
								px: "1rem",
							}}
						/>
					))}
				</Tabs>

				<TextField
					id="search-currency"
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
						placeholder: "Search currency",
					}}
					sx={{
						width: "20rem",
						backgroundColor: alpha(theme.palette.common.white, 0.15),
						borderRadius: 2,

						"&:hover": {
							backgroundColor: alpha(theme.palette.common.white, 0.25),
						},

						"& .MuiOutlinedInput-notchedOutline": {
							border: "none",
						},
					}}
				/>
			</Toolbar>
		</AppBar>
	);
};

export default DesktopNavigation;
