import Grid from "@mui/material/Grid";

import CryptoView from "./CryptoView";

const CryptoList = function (props) {
	const { cryptos, language } = props;

	return (
		<Grid container spacing={4}>
			{cryptos.map(crypto => {
				const currencyOptions = {
					style: "currency",
					currency: "USD",
					currencyDisplay: "narrowSymbol",
					notation: "compact",
				};

				const id = crypto.id;
				const name = crypto.name;
				const rank = crypto.rank;
				const icon = crypto.icon;
				const dailyChange =
					(crypto.dailyChange >= 0 ? "+" : "") + crypto.dailyChange + "%";

				const price = new Intl.NumberFormat(language, currencyOptions).format(
					crypto.price
				);
				const marketCap = new Intl.NumberFormat(
					language,
					currencyOptions
				).format(crypto.marketCap);

				return (
					<Grid item xs={12} md={6} lg={4} key={id}>
						<CryptoView
							id={id}
							name={name}
							rank={rank}
							icon={icon}
							price={price}
							marketCap={marketCap}
							dailyChange={dailyChange}
						/>
					</Grid>
				);
			})}
		</Grid>
	);
};

export default CryptoList;
