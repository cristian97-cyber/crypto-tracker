import { useState } from "react";

import { useTheme } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "../Link";

const DesktopNavigation = function (props) {
	const { routes, activeRoute } = props;

	const [tabValue, setTabValue] = useState(activeRoute);

	const handleChangeTab = function (_, newValue) {
		setTabValue(newValue);
	};

	const theme = useTheme();

	return (
		<Tabs
			value={tabValue}
			onChange={handleChangeTab}
			aria-label="Navigation tabs"
			sx={{ mr: "auto" }}
		>
			{routes.map(route => (
				<Tab
					key={route.links[0]}
					label={route.name}
					value={route.links[0]}
					component={Link}
					href={route.links[0]}
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
