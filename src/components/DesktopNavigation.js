import { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const DesktopNavigation = function () {
	const [searchOpen, setSearchOpen] = useState(false);

	return (
		<AppBar>
			<Toolbar
				sx={{
					py: "0.5rem",
				}}
			>
				<Button color="inherit">
					<Grid container alignItems="center" spacing={1}>
						<Grid item>
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
			</Toolbar>
		</AppBar>
	);
};

export default DesktopNavigation;
