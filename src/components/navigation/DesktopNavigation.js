import { useTheme } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "../Link";

const DesktopNavigation = function (props) {
	const { routes, activeRoute } = props;

	const theme = useTheme();

	return (
		<Tabs value={activeRoute} aria-label="Navigation tabs" sx={{ mr: "auto" }}>
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
	);
};

export default DesktopNavigation;
