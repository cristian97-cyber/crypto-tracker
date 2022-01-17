import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

const NewsView = function (props) {
	const { link, title, image, description, source, date } = props;

	return (
		<Card
			sx={{
				width: "100%",
			}}
		>
			<CardActionArea>
				<CardMedia
					component="img"
					height={140}
					image={image}
					alt="News image"
				/>
				<CardContent>
					<Typography
						variant="h4"
						align="center"
						sx={{
							lineHeight: 1.6,
							mb: "1rem",
						}}
					>
						{title}
					</Typography>
					<Typography
						variant="body1"
						sx={{
							lineHeight: 1.6,
							mb: "2rem",
						}}
					>
						{description}...
					</Typography>
					<Grid
						container
						justifyContent="space-between"
						alignItems="center"
						spacing={2}
					>
						<Grid item>
							<Chip label="Business Insider" />
						</Grid>
						<Grid item>
							<Typography variant="body2">2 hours ago</Typography>
						</Grid>
					</Grid>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default NewsView;
