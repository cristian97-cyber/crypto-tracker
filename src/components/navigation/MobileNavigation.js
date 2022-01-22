import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PaidIcon from "@mui/icons-material/Paid";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import Typography from "@mui/material/Typography";
import Link from "../Link";
import Box from "@mui/material/Box";

const MobileNavigation = function (props) {
	const { routes, drawerOpen, toggleDrawer, activeRoute } = props;

	const theme = useTheme();

	return (
		<>
			<IconButton
				onClick={toggleDrawer}
				aria-label="open-navigation"
				sx={{ width: "auto", height: "auto" }}
			>
				<MenuRoundedIcon
					sx={{
						width: "2rem",
						height: "2rem",
					}}
				/>
			</IconButton>
			<SwipeableDrawer
				anchor="left"
				open={drawerOpen}
				onOpen={toggleDrawer}
				onClose={toggleDrawer}
				sx={{
					zIndex: theme.zIndex.appBar - 1,
				}}
			>
				<Box sx={{ minHeight: theme.mixins.toolbar.minHeight + 30 }}></Box>
				<List>
					{routes.map(route => (
						<ListItem key={route.links[0]} disablePadding>
							<ListItemButton
								component={Link}
								href={route.links[0]}
								onClick={toggleDrawer}
								selected={route.links[0] === activeRoute}
								sx={{
									py: "1rem",
								}}
							>
								<ListItemIcon
									sx={{
										opacity: route.links[0] === activeRoute ? 1 : 0.7,
									}}
								>
									{route.name === "Home" && <HomeIcon />}
									{route.name === "Cryptocurrencies" && <PaidIcon />}
									{route.name === "Exchanges" && <CurrencyExchangeIcon />}
									{route.name === "News" && <NewspaperIcon />}
								</ListItemIcon>
								<ListItemText disableTypography>
									<Typography
										variant="tabs"
										sx={{
											opacity: route.links[0] === activeRoute ? 1 : 0.7,
										}}
									>
										{route.name}
									</Typography>
								</ListItemText>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</SwipeableDrawer>
		</>
	);
};

export default MobileNavigation;
