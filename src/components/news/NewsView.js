import { LazyLoadImage } from "react-lazy-load-image-component";

import Card from "@mui/material/Card";
import Link from "@mui/material/Link";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

const NewsView = function (props) {
	const { url, title, image, description, source, date } = props;

	return (
		<Card
			sx={{
				width: "100%",
				height: "100%",
			}}
		>
			<CardActionArea
				component={Link}
				href={url}
				target="_blank"
				rel="noreferrer"
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "flex-start",
					height: "100%",
				}}
			>
				<CardMedia height={200} sx={{ width: "100%" }}>
					<LazyLoadImage
						src={image}
						width="100%"
						height={200}
						alt="News image"
						effect="opacity"
						threshold={300}
						style={{ objectFit: "cover" }}
					/>
				</CardMedia>

				<CardContent
					sx={{
						flexGrow: 1,
					}}
				>
					<Grid
						container
						direction="column"
						sx={{
							height: "100%",
						}}
					>
						<Grid item>
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
						</Grid>
						<Grid item>
							<Typography
								variant="body1"
								sx={{
									lineHeight: 1.6,
									mb: "2rem",
								}}
							>
								{description}
							</Typography>
						</Grid>
						<Grid item sx={{ mt: "auto" }}>
							<Grid
								container
								justifyContent="space-between"
								alignItems="center"
								spacing={2}
							>
								<Grid item>
									<Chip label={source} />
								</Grid>
								<Grid item>
									<Typography variant="body2">{date}</Typography>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default NewsView;
