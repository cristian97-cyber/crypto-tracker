import Grid from "@mui/material/Grid";

import CryptoView from "./CryptoView";

const dummyCrypto = [
	{
		id: 1,
		rank: 1,
		name: "Bitcoin",
		icon: "https://static.coinstats.app/coins/Bitcoin6l39t.png",
		price: "48.6K",
		marketCap: "914.68",
		dailyChange: "1.86%",
	},
	{
		id: 2,
		rank: 2,
		name: "Bitcoin",
		icon: "https://static.coinstats.app/coins/Bitcoin6l39t.png",
		price: "48.6K",
		marketCap: "914.68",
		dailyChange: "1.86%",
	},
	{
		id: 3,
		rank: 3,
		name: "Bitcoin",
		icon: "https://static.coinstats.app/coins/Bitcoin6l39t.png",
		price: "48.6K",
		marketCap: "914.68",
		dailyChange: "1.86%",
	},
	{
		id: 4,
		rank: 4,
		name: "Bitcoin",
		icon: "https://static.coinstats.app/coins/Bitcoin6l39t.png",
		price: "48.6K",
		marketCap: "914.68",
		dailyChange: "1.86%",
	},
	{
		id: 5,
		rank: 5,
		name: "Bitcoin",
		icon: "https://static.coinstats.app/coins/Bitcoin6l39t.png",
		price: "48.6K",
		marketCap: "914.68",
		dailyChange: "1.86%",
	},
	{
		id: 6,
		rank: 6,
		name: "Bitcoin",
		icon: "https://static.coinstats.app/coins/Bitcoin6l39t.png",
		price: "48.6K",
		marketCap: "914.68",
		dailyChange: "1.86%",
	},
	{
		id: 7,
		rank: 7,
		name: "Bitcoin",
		icon: "https://static.coinstats.app/coins/Bitcoin6l39t.png",
		price: "48.6K",
		marketCap: "914.68",
		dailyChange: "1.86%",
	},
	{
		id: 8,
		rank: 8,
		name: "Bitcoin",
		icon: "https://static.coinstats.app/coins/Bitcoin6l39t.png",
		price: "48.6K",
		marketCap: "914.68",
		dailyChange: "1.86%",
	},
	{
		id: 9,
		rank: 9,
		name: "Bitcoin",
		icon: "https://static.coinstats.app/coins/Bitcoin6l39t.png",
		price: "48.6K",
		marketCap: "914.68",
		dailyChange: "1.86%",
	},
	{
		id: 10,
		rank: 10,
		name: "Bitcoin",
		icon: "https://static.coinstats.app/coins/Bitcoin6l39t.png",
		price: "48.6K",
		marketCap: "914.68",
		dailyChange: "1.86%",
	},
];

const CryptoList = function () {
	return (
		<Grid container spacing={4}>
			{dummyCrypto.map(crypto => (
				<Grid item xs={12} md={6} lg={4} key={crypto.id}>
					<CryptoView
						rank={crypto.rank}
						name={crypto.name}
						icon={crypto.icon}
						price={crypto.price}
						marketCap={crypto.marketCap}
						dailyChange={crypto.dailyChange}
					/>
				</Grid>
			))}
		</Grid>
	);
};

export default CryptoList;
