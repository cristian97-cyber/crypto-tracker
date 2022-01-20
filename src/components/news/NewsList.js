import Grid from "@mui/material/Grid";

import NewsView from "./NewsView";

const dummyNews = [
	{
		id: 1,
		link: "https://coingape.com/4350-trx-up-grabs-price-prediction/?utm_medium=Organic&utm_source=coinstats",
		title:
			"4350 TRX Up for Grabs on Price Prediction while TRON Gaining Traction on Exchanges and Social Media",
		image: "https://coinchapter.com/wp-content/uploads/2022/01/Bitcoin.jpg",
		description:
			"The cryptocurrency price index Coinraking is giving away 4350 TRX on correct Tron price prediction for November 16. Meanwhile, Tron is getting traction on Twitter",
		source: "Coingape",
		date: "16/01/2022",
	},
	{
		id: 2,
		link: "https://coingape.com/4350-trx-up-grabs-price-prediction/?utm_medium=Organic&utm_source=coinstats",
		title:
			"4350 TRX Up for Grabs on Price Prediction while TRON Gaining Traction on Exchanges and Social Media",
		image: "https://coinchapter.com/wp-content/uploads/2022/01/Bitcoin.jpg",
		description:
			"The cryptocurrency price index Coinraking is giving away 4350 TRX on correct Tron price prediction for November 16. Meanwhile, Tron is getting traction on Twitter",
		source: "Coingape",
		date: "16/01/2022",
	},
	{
		id: 3,
		link: "https://coingape.com/4350-trx-up-grabs-price-prediction/?utm_medium=Organic&utm_source=coinstats",
		title:
			"4350 TRX Up for Grabs on Price Prediction while TRON Gaining Traction on Exchanges and Social Media",
		image: "https://coinchapter.com/wp-content/uploads/2022/01/Bitcoin.jpg",
		description:
			"The cryptocurrency price index Coinraking is giving away 4350 TRX on correct Tron price prediction for November 16. Meanwhile, Tron is getting traction on Twitter",
		source: "Coingape",
		date: "16/01/2022",
	},
	{
		id: 4,
		link: "https://coingape.com/4350-trx-up-grabs-price-prediction/?utm_medium=Organic&utm_source=coinstats",
		title:
			"4350 TRX Up for Grabs on Price Prediction while TRON Gaining Traction on Exchanges and Social Media",
		image: "https://coinchapter.com/wp-content/uploads/2022/01/Bitcoin.jpg",
		description:
			"The cryptocurrency price index Coinraking is giving away 4350 TRX on correct Tron price prediction for November 16. Meanwhile, Tron is getting traction on Twitter",
		source: "Coingape",
		date: "16/01/2022",
	},
	{
		id: 5,
		link: "https://coingape.com/4350-trx-up-grabs-price-prediction/?utm_medium=Organic&utm_source=coinstats",
		title:
			"4350 TRX Up for Grabs on Price Prediction while TRON Gaining Traction on Exchanges and Social Media",
		image: "https://coinchapter.com/wp-content/uploads/2022/01/Bitcoin.jpg",
		description:
			"The cryptocurrency price index Coinraking is giving away 4350 TRX on correct Tron price prediction for November 16. Meanwhile, Tron is getting traction on Twitter",
		source: "Coingape",
		date: "16/01/2022",
	},
	{
		id: 6,
		link: "https://coingape.com/4350-trx-up-grabs-price-prediction/?utm_medium=Organic&utm_source=coinstats",
		title:
			"4350 TRX Up for Grabs on Price Prediction while TRON Gaining Traction on Exchanges and Social Media",
		image: "https://coinchapter.com/wp-content/uploads/2022/01/Bitcoin.jpg",
		description:
			"The cryptocurrency price index Coinraking is giving away 4350 TRX on correct Tron price prediction for November 16. Meanwhile, Tron is getting traction on Twitter",
		source: "Coingape",
		date: "16/01/2022",
	},
	{
		id: 7,
		link: "https://coingape.com/4350-trx-up-grabs-price-prediction/?utm_medium=Organic&utm_source=coinstats",
		title:
			"4350 TRX Up for Grabs on Price Prediction while TRON Gaining Traction on Exchanges and Social Media",
		image: "https://coinchapter.com/wp-content/uploads/2022/01/Bitcoin.jpg",
		description:
			"The cryptocurrency price index Coinraking is giving away 4350 TRX on correct Tron price prediction for November 16. Meanwhile, Tron is getting traction on Twitter",
		source: "Coingape",
		date: "16/01/2022",
	},
	{
		id: 8,
		link: "https://coingape.com/4350-trx-up-grabs-price-prediction/?utm_medium=Organic&utm_source=coinstats",
		title:
			"4350 TRX Up for Grabs on Price Prediction while TRON Gaining Traction on Exchanges and Social Media",
		image: "https://coinchapter.com/wp-content/uploads/2022/01/Bitcoin.jpg",
		description:
			"The cryptocurrency price index Coinraking is giving away 4350 TRX on correct Tron price prediction for November 16. Meanwhile, Tron is getting traction on Twitter",
		source: "Coingape",
		date: "16/01/2022",
	},
	{
		id: 9,
		link: "https://coingape.com/4350-trx-up-grabs-price-prediction/?utm_medium=Organic&utm_source=coinstats",
		title:
			"4350 TRX Up for Grabs on Price Prediction while TRON Gaining Traction on Exchanges and Social Media",
		image: "https://coinchapter.com/wp-content/uploads/2022/01/Bitcoin.jpg",
		description:
			"The cryptocurrency price index Coinraking is giving away 4350 TRX on correct Tron price prediction for November 16. Meanwhile, Tron is getting traction on Twitter",
		source: "Coingape",
		date: "16/01/2022",
	},
	{
		id: 10,
		link: "https://coingape.com/4350-trx-up-grabs-price-prediction/?utm_medium=Organic&utm_source=coinstats",
		title:
			"4350 TRX Up for Grabs on Price Prediction while TRON Gaining Traction on Exchanges and Social Media",
		image: "https://coinchapter.com/wp-content/uploads/2022/01/Bitcoin.jpg",
		description:
			"The cryptocurrency price index Coinraking is giving away 4350 TRX on correct Tron price prediction for November 16. Meanwhile, Tron is getting traction on Twitter",
		source: "Coingape",
		date: "16/01/2022",
	},
];

const NewsList = function () {
	return (
		<Grid container spacing={4}>
			{dummyNews.map(news => (
				<Grid item xs={12} md={6} lg={4} key={news.id}>
					<NewsView
						link={news.link}
						title={news.title}
						image={news.image}
						description={news.description}
						source={news.source}
						date={news.date}
					/>
				</Grid>
			))}
		</Grid>
	);
};

export default NewsList;
