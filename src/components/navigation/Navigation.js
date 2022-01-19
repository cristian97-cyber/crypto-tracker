import { useState } from "react";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Link from "../Link";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";
import NavigationSearch from "./NavigationSearch";

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

const Navigation = function (props) {
	const [drawerOpen, setDrawerOpen] = useState(false);

	const toggleDrawer = function (event) {
		if (
			event &&
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		)
			return;

		setDrawerOpen(prev => !prev);
	};

	const closeDrawer = () => setDrawerOpen(false);

	const theme = useTheme();
	const downLg = useMediaQuery(theme.breakpoints.down("lg"));
	const downSm = useMediaQuery(theme.breakpoints.down("sm"));

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
						onClick={closeDrawer}
						sx={{
							mr: "1rem",

							[theme.breakpoints.down("lg")]: {
								mr: "auto",
							},
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
							{!downSm && (
								<Grid item>
									<Typography variant="logo">Crypto Tracker</Typography>
								</Grid>
							)}
						</Grid>
					</Button>

					{!downLg ? (
						<>
							<DesktopNavigation routes={routes} />
							<NavigationSearch />
						</>
					) : (
						<>
							<NavigationSearch closeDrawer={closeDrawer} />
							<MobileNavigation
								routes={routes}
								drawerOpen={drawerOpen}
								toggleDrawer={toggleDrawer}
							/>
						</>
					)}
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

export default Navigation;
