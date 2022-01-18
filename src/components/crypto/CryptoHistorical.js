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
	const { data } = props;

	const theme = useTheme();

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
		},
	};

	const labels = [
		"18/01",
		"19/01",
		"20/01",
		"21/01",
		"22/01",
		"23/01",
		"24/01",
	];

	const chartData = {
		labels,
		datasets: [
			{
				label: "Price",
				data,
				borderColor: theme.palette.primary.main,
				backgroundColor: theme.palette.primary.dark,
			},
		],
	};

	return <Line options={options} data={chartData} />;
};

export default CryptoHistorical;
