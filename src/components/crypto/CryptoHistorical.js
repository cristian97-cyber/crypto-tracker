import { useContext } from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { LanguageContext } from "../../context/languageContext";
import { useTheme } from "@mui/material/styles";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const calculateLabels = function (interval, language) {
	const labels = [];
	const actualTime = Date.now();

	if (interval === "24h") {
		const options = {
			hour: "2-digit",
			minute: "2-digit",
		};

		for (let i = 3; i <= 21; i = i + 3) {
			const labelDate = new Date(actualTime - i * 60 * 60 * 1000);
			const label = new Intl.DateTimeFormat(language, options).format(
				labelDate
			);

			labels.unshift(label);
		}
	}

	if (interval === "1w") {
		const options = {
			month: "short",
			day: "2-digit",
		};

		for (let i = 0; i <= 6; i++) {
			const labelDate = new Date(actualTime - i * 24 * 60 * 60 * 1000);
			const label = new Intl.DateTimeFormat(language, options).format(
				labelDate
			);

			labels.unshift(label);
		}
	}

	if (interval === "1m") {
		const options = {
			month: "short",
			day: "2-digit",
		};

		for (let i = 0; i <= 30; i = i + 5) {
			const labelDate = new Date(actualTime - i * 24 * 60 * 60 * 1000);
			const label = new Intl.DateTimeFormat(language, options).format(
				labelDate
			);

			labels.unshift(label);
		}
	}

	if (interval === "3m") {
		const options = {
			month: "short",
			day: "2-digit",
		};

		for (let i = 0; i <= 90; i = i + 15) {
			const labelDate = new Date(actualTime - i * 24 * 60 * 60 * 1000);
			const label = new Intl.DateTimeFormat(language, options).format(
				labelDate
			);

			labels.unshift(label);
		}
	}

	if (interval === "6m") {
		const options = {
			month: "short",
			day: "2-digit",
		};

		for (let i = 0; i <= 180; i = i + 30) {
			const labelDate = new Date(actualTime - i * 24 * 60 * 60 * 1000);
			const label = new Intl.DateTimeFormat(language, options).format(
				labelDate
			);

			labels.unshift(label);
		}
	}

	if (interval === "1y") {
		const options = {
			year: "numeric",
			month: "short",
		};

		for (let i = 0; i <= 360; i = i + 60) {
			const labelDate = new Date(actualTime - i * 24 * 60 * 60 * 1000);
			const label = new Intl.DateTimeFormat(language, options).format(
				labelDate
			);

			labels.unshift(label);
		}
	}

	return labels;
};

const CryptoHistorical = function (props) {
	const { data, interval } = props;

	const language = useContext(LanguageContext);

	const theme = useTheme();

	const nf = new Intl.NumberFormat(language, {
		style: "currency",
		currency: "USD",
		currencyDisplay: "narrowSymbol",
	});

	const options = {
		responsive: true,
		scales: {
			x: {
				grid: {
					display: false,
					borderWidth: 0,
				},
			},
			y: {
				ticks: {
					callback: value => nf.format(value),
				},
				grid: {
					display: false,
					borderWidth: 0,
				},
			},
		},
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				displayColors: false,
				callbacks: {
					label: item => nf.format(item.raw),
				},
			},
		},
	};

	const labels = calculateLabels(interval, language);

	const chartData = {
		labels,
		datasets: [
			{
				label: "Price",
				data,
				borderColor: theme.palette.primary.main,
				borderWidth: 1,
			},
		],
	};

	return <Line options={options} data={chartData} />;
};

export default CryptoHistorical;
