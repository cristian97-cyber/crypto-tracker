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

const CryptoHistorical = function (props) {
	const { data, interval } = props;
	let { labels } = props;

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

	const df = new Intl.DateTimeFormat(
		language,
		interval !== "1y"
			? { month: "short", day: "2-digit" }
			: { year: "numeric", month: "short" }
	);

	labels = labels.map(label => df.format(label));

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
