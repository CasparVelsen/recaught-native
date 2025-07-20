import { Line } from 'react-chartjs-2';
import lodash from 'lodash';
import { Chart as ChartJS } from 'chart.js/auto';

function Weather({ filteredCards }) {
  const findWeather = filteredCards.map(card => card.weather);
  const filteredWeather = [...new Set(findWeather)].filter(item => item);
  const weatherOrder = ['rainy', 'cloudy', 'sunny'];

  const weatherArray = filteredWeather
    .map((data, index) => {
      const filterForWeather = filteredCards.filter(
        card => card.weather === data
      );
      const catches = filterForWeather.map(data => data.catches.length);
      const numberCatches = lodash.sum(catches);
      return { id: index, weather: data, catches: numberCatches };
    })
    .sort((a, b) => {
      return weatherOrder.indexOf(a.weather) - weatherOrder.indexOf(b.weather);
    });

  const weather = {
    labels: weatherArray.map(data => data.weather),
    datasets: [
      {
        label: 'catches',
        data: weatherArray.map(data => data.catches),
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

  return <Line data={weather} options={options} />;
}

export default Weather;
