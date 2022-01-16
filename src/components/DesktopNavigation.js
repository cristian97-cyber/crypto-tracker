import { useState } from "react";

import { useTheme, alpha } from "@mui/material/styles";
import useScrollTrigger from "@mui/material/useScrollTrigger";
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
import Link from "./Link";
import SearchIcon from "@mui/icons-material/Search";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

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

const ScrollTop = function (props) {
	const { children } = props;

	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 100,
	});

	const handleClick = function (event) {
		const anchor = (event.target.ownerDocument || document).querySelector(
			"#top-anchor"
		);

		if (anchor) {
			anchor.scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
		}
	};

	return (
		<Zoom in={trigger}>
			<Box
				onClick={handleClick}
				role="presentation"
				sx={{
					position: "fixed",
					bottom: 16,
					right: 16,
				}}
			>
				{children}
			</Box>
		</Zoom>
	);
};

const DesktopNavigation = function (props) {
	const [tabValue, setTabValue] = useState("/");

	const handleChangeTab = function (event, newValue) {
		setTabValue(newValue);
	};

	const theme = useTheme();

	return (
		<>
			<AppBar position="sticky">
				<Toolbar
					sx={{
						py: "0.5rem",
					}}
				>
					<Button
						color="inherit"
						component={Link}
						href="/"
						sx={{
							mr: "1rem",
						}}
					>
						<Grid container alignItems="center">
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
			<Toolbar
				id="top-anchor"
				sx={{
					minHeight: 0,

					[theme.breakpoints.up("sm")]: {
						minHeight: 0,
					},
				}}
			/>
			<ScrollTop {...props}>
				<Fab color="primary" size="small" aria-label="scroll back to the top">
					<KeyboardArrowUpIcon />
				</Fab>
			</ScrollTop>
		</>
	);
};

export default DesktopNavigation;
