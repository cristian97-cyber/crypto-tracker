import { useContext } from "react";

import Grid from "@mui/material/Grid";

import { LanguageContext } from "../../context/languageContext";
import NewsView from "./NewsView";

const NewsList = function (props) {
	const { news } = props;

	const language = useContext(LanguageContext);

	return (
		<Grid container spacing={4}>
			{news.map((n, i) => {
				const date = new Intl.DateTimeFormat(language).format(new Date(n.date));

				return (
					<Grid item xs={12} md={6} lg={4} key={i}>
						<NewsView
							url={n.url}
							title={n.title}
							description={n.description}
							image={n.image}
							source={n.source}
							date={date}
						/>
					</Grid>
				);
			})}
		</Grid>
	);
};

export default NewsList;
