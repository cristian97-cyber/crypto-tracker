import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Link from "../Link";

const CryptoView = function (props) {
	const { id, rank, name, icon, price, marketCap, dailyChange } = props;

	const theme = useTheme();

	return (
		<Card sx={{ width: "100%" }}>
			<CardActionArea component={Link} href={`/cryptocurrencies/${id}`}>
				<CardContent>
					<Grid
						container
						justifyContent="space-between"
						alignItems="center"
						spacing={2}
					>
						<Grid item>
							<Typography variant="h4">
								{rank}. {name}
							</Typography>
						</Grid>
						<Grid item>
							<Box
								component="img"
								src={icon}
								alt={`Coin icon`}
								sx={{
									height: "2rem",
								}}
							/>
						</Grid>
					</Grid>
				</CardContent>
				<Divider />
				<CardContent>
					<Typography variant="body1" sx={{ mb: "0.75rem" }}>
						<Box
							component="span"
							sx={{ color: theme.palette.common.grey400, fontWeight: 500 }}
						>
							Price:{" "}
						</Box>
						{price}
					</Typography>
					<Typography variant="body1" sx={{ mb: "0.75rem" }}>
						<Box
							component="span"
							sx={{ color: theme.palette.common.grey400, fontWeight: 500 }}
						>
							Market Cap:{" "}
						</Box>
						{marketCap}
					</Typography>
					<Typography
						variant="body1"
						sx={{
							color: dailyChange.includes("+")
								? theme.palette.success.main
								: theme.palette.error.main,
						}}
					>
						<Box
							component="span"
							sx={{ color: theme.palette.common.grey400, fontWeight: 500 }}
						>
							Daily Change:{" "}
						</Box>
						{dailyChange}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default CryptoView;
