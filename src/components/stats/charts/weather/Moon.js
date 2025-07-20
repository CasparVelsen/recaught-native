import { Line } from 'react-chartjs-2';
import lodash from 'lodash';
import { Chart as ChartJS } from 'chart.js/auto';

function Moon({ filteredCards }) {
  const findMoon = filteredCards.map(card => card.moon);
  const filteredMoon = [...new Set(findMoon)].filter(item => item);
  const moonPhaseOrder = [
    'new moon',
    'increasing moon',
    'full moon',
    'waning moon',
  ];

  const moonArray = filteredMoon
    .map((data, index) => {
      const filterForMoon = filteredCards.filter(card => card.moon === data);
      const catches = filterForMoon.map(data => data.catches.length);
      const numberCatches = lodash.sum(catches);
      return { id: index, moon: data, catches: numberCatches };
    })
    .sort((a, b) => {
      return moonPhaseOrder.indexOf(a.moon) - moonPhaseOrder.indexOf(b.moon);
    });

  const moon = {
    labels: moonArray.map(data => data.moon),
    datasets: [
      {
        label: 'catches',
        data: moonArray.map(data => data.catches),
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

  return <Line data={moon} options={options} />;
}

export default Moon;
