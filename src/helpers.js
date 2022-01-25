import { STATS_API_URL, EXCHANGES_API_URL, COINS_API_URL } from "./config";

const sendHttp = async function (url) {
	const res = await fetch(url);
	const data = await res.json();

	return data;
};

const getStatsAndCoins = async function () {
	let foundStats = await sendHttp(STATS_API_URL);
	foundStats = foundStats[0];

	const foundExchanges = await sendHttp(EXCHANGES_API_URL);

	const stats = {
		totalCryptos: {
			name: "Total Cryptocurrencies",
			data: foundStats.coins_count,
		},
		totalExchanges: {
			name: "Total Exchanges",
			data: Object.keys(foundExchanges).length,
		},
		totalMarketCap: {
			name: "Total Market Cap",
			data: foundStats.total_mcap,
		},
		total24Volume: {
			name: "Total 24h Volume",
			data: foundStats.total_volume,
		},
		totalMarkets: {
			name: "Total Markets",
			data: foundStats.active_markets,
		},
	};

	let foundCoins = await sendHttp(
		`${COINS_API_URL}&limit=${foundStats.coins_count}`
	);
	foundCoins = foundCoins.coins;

	const coinsList = foundCoins.map(coin => ({
		id: coin.id,
		name: coin.name,
		symbol: coin.symbol,
		rank: coin.rank,
		icon: coin.icon,
		price: coin.price,
		marketCap: coin.marketCap,
		dailyChange: coin.priceChange1d,
		volume: coin.volume,
		website: coin.websiteUrl ? coin.websiteUrl : "",
	}));

	const coins = {
		coinsList,
	};

	return { stats, coins };
};

const getExchanges = async function () {
	let foundExchanges = await sendHttp(EXCHANGES_API_URL);
	foundExchanges = Object.values(foundExchanges);
	foundExchanges.sort((a, b) => b.volume_usd - a.volume_usd);

	let rank = 0;
	const exchanges = foundExchanges.map(ex => {
		rank++;

		return {
			rank,
			name: ex.name,
			tradeVolume: ex.volume_usd,
			url: ex.url,
		};
	});

	return exchanges;
};

export { getStatsAndCoins, getExchanges };
