import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";

const NewsPreview = function () {
	return (
		<Card
			sx={{
				width: "100%",
			}}
		>
			<CardMedia component={Skeleton} variant="rectangular" height={200} />
			<CardContent>
				<Skeleton variant="text" width="70%" sx={{ mx: "auto", mb: "1rem" }} />
				<Skeleton variant="text" width="100%" sx={{ mb: "4rem" }} />
				<Grid container justifyContent="space-between" spacing={2}>
					<Grid item>
						<Skeleton variant="text" width={75} />
					</Grid>
					<Grid item>
						<Skeleton variant="text" width={75} />
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
};

export default NewsPreview;
