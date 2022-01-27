import { useState, useEffect } from "react";
import { useRouter } from "next/router";

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
		links: ["/"],
	},
	{
		name: "Cryptocurrencies",
		links: ["/cryptocurrencies", "/cryptocurrencies/[id]"],
	},
	{
		name: "Exchanges",
		links: ["/exchanges"],
	},
	{
		name: "News",
		links: ["/news"],
	},
];

const ScrollTop = function (props) {
	const { children } = props;

	const triggerTop = useScrollTrigger({
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
		<Zoom in={triggerTop}>
			<Box
				onClick={handleClick}
				role="presentation"
				sx={{
					position: "fixed",
					bottom: 16,
					right: 16,
					zIndex: theme => theme.zIndex.appBar,
				}}
			>
				{children}
			</Box>
		</Zoom>
	);
};

const Navigation = function (props) {
	const router = useRouter();

	let initialRoute;
	routes.forEach(route => {
		if (route.links.includes(router.pathname)) initialRoute = route.links[0];
	});

	const [activeRoute, setActiveRoute] = useState(initialRoute);
	const [drawerOpen, setDrawerOpen] = useState(false);

	useEffect(() => {
		const handleRouteChange = function (url) {
			routes.forEach(route => {
				if (route.links.includes(url)) setActiveRoute(route.links[0]);
			});
		};

		router.events.on("routeChangeStart", handleRouteChange);

		return () => router.events.off("routeChangeStart", handleRouteChange);
	}, [router]);

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
							<DesktopNavigation routes={routes} activeRoute={activeRoute} />
							<NavigationSearch />
						</>
					) : (
						<>
							<NavigationSearch closeDrawer={closeDrawer} />
							<MobileNavigation
								routes={routes}
								activeRoute={activeRoute}
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
				<Fab
					color="primary"
					size="small"
					onClick={closeDrawer}
					aria-label="scroll back to the top"
				>
					<KeyboardArrowUpIcon />
				</Fab>
			</ScrollTop>
		</>
	);
};

export default Navigation;
