import { Line } from 'react-chartjs-2';
import lodash from 'lodash';
import { Chart as ChartJS } from 'chart.js/auto';

function WaterTemp({ filteredCards }) {
  const findWaterTemp = filteredCards.map(card => card.watertemp);
  const filteredWaterTemp = [...new Set(findWaterTemp)].filter(item => item);
  filteredWaterTemp.sort((a, b) => a - b);

  const watertempArray = filteredWaterTemp.map((data, index) => {
    const filterForWaterTemp = filteredCards.filter(
      card => card.watertemp === data
    );
    const watertemp = filterForWaterTemp.map(data => data.catches.length);
    var numberCatches = lodash.sum(watertemp);
    const obj = { id: index, watertemp: data, catches: numberCatches };
    return obj;
  });

  const waterTemp = {
    labels: watertempArray.map(data => data.watertemp),
    datasets: [
      {
        label: 'catches',
        data: watertempArray.map(data => data.catches),
        fill: true,
        backgroundColor: 'rgba(162, 195, 108, 0.5)',
        borderColor: '#687a48',
        borderWidth: 1.5,
        tension: 0.5,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Catches / ',
        align: 'start',
        color: '#687a48',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={waterTemp} options={options} />;
}

export default WaterTemp;
