import { Line } from 'react-chartjs-2';
import lodash from 'lodash';
import { Chart as ChartJS } from 'chart.js/auto';

function WaterColor({ filteredCards }) {
  const findWaterColor = filteredCards.map(card => card.watercolor);
  const filteredWaterColor = [...new Set(findWaterColor)].filter(item => item);

  const waterColorOrder = ['cloudy', 'slightly cloudy', 'clear'];

  const watercolorArray = filteredWaterColor
    .map((data, index) => {
      const filterForWaterColor = filteredCards.filter(
        card => card.watercolor === data
      );
      const catches = filterForWaterColor.map(data => data.catches.length);
      const numberCatches = lodash.sum(catches);
      return { id: index, watercolor: data, catches: numberCatches };
    })
    .sort((a, b) => {
      return (
        waterColorOrder.indexOf(a.watercolor) -
        waterColorOrder.indexOf(b.watercolor)
      );
    });

  const waterColor = {
    labels: watercolorArray.map(data => data.watercolor),
    datasets: [
      {
        label: 'catches',
        data: watercolorArray.map(data => data.catches),
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
        text: 'Catches ',
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

  return <Line data={waterColor} options={options} />;
}

export default WaterColor;
