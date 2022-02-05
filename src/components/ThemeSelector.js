import IconButton from "@mui/material/IconButton";

import Fab from "@mui/material/Fab";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const ThemeSelector = function (props) {
	const { themeStyle, toggleThemeStyle } = props;

	return (
		<IconButton
			color="primary"
			onClick={toggleThemeStyle}
			aria-label={`Switch to ${themeStyle === "dark" ? "light" : "dark"}`}
			sx={{
				ml: "1rem",
			}}
		>
			{themeStyle === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
		</IconButton>
	);
};

export default ThemeSelector;
