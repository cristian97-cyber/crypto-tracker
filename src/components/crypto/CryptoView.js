import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const CryptoView = function (props) {
	const { rank, name, icon, price, marketCap, dailyChange } = props;

	return (
		<Card sx={{ width: "100%" }}>
			<CardActionArea>
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
								alt="Currency icon"
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
						Price: {price}
					</Typography>
					<Typography variant="body1" sx={{ mb: "0.75rem" }}>
						Market Cap: {marketCap}
					</Typography>
					<Typography variant="body1">Daily Change: {dailyChange}</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default CryptoView;
