import {
	STATS_API_URL,
	EXCHANGES_API_URL,
	COINS_API_URL,
	COIN_API_URL,
	NEWS_API_URL,
	NEWS_DB_URL,
} from "./config";

const sendHttp = async function (url, params) {
	const res = await fetch(url, params);
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

const getCoin = async function (id) {
	let coin = await sendHttp(`${COIN_API_URL}/${id}?currency=USD`);
	coin = coin.coin;

	return {
		name: coin.name,
		icon: coin.icon,
		symbol: coin.symbol,
		rank: coin.rank,
		price: coin.price,
		dailyChange: coin.priceChange1d,
		volume: coin.volume,
		marketCap: coin.marketCap,
		websiteUrl: coin.websiteUrl ? coin.websiteUrl : "",
	};
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

const getUpdatedNews = async function () {
	let updatedNews = [];
	const titles = [];

	for (let page = 0; page < 8; page++) {
		const foundNews = await sendHttp(`${NEWS_API_URL}&page=${page}`);
		if (!foundNews) break;

		foundNews.results.forEach(res => {
			if (res.image_url && !titles.includes(res.title)) {
				updatedNews.push({
					url: res.link,
					title: res.title,
					description: res.description,
					image: res.image_url,
					source:
						res.source_id.charAt(0).toUpperCase() + res.source_id.slice(1),
					date: new Date(res.pubDate).getTime(),
					updateDate: Date.now(),
				});

				titles.push(res.title);
			}
		});
		if (!foundNews.nextPage) break;
	}

	if (updatedNews.length === 0) return;

	updatedNews = await sendHttp(NEWS_DB_URL, {
		method: "PUT",
		body: JSON.stringify(updatedNews),
		headers: {
			"Content-Type": "application/json",
		},
	});

	return updatedNews;
};

const getStoredNews = async function () {
	let foundNews = await sendHttp(NEWS_DB_URL);

	if (foundNews) {
		const actualTime = Date.now();
		const lastUpdateTime = foundNews[0].updateDate;
		const timeDifference = (actualTime - lastUpdateTime) / 1000 / 60;
		if (timeDifference >= 60) foundNews = await getUpdatedNews();

		if (foundNews) foundNews.sort((a, b) => b.date - a.date);
	} else {
		foundNews = await getUpdatedNews();
	}

	return foundNews;
};

export { getStatsAndCoins, getCoin, getExchanges, getStoredNews };
