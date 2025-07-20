import Airpressure from './charts/weather/Airpressure';
import styled from 'styled-components';
import Weather from './charts/weather/Weather';
import Temperature from './charts/weather/Temperatur';
import Moon from './charts/weather/Moon';
import Wind from './charts/weather/Wind';
import WindSpeed from './charts/weather/WindSpeed';
import { useState } from 'react';
import WaterTemp from './charts/weather/WaterTemp';
import WaterColor from './charts/weather/WaterColor';
import WaterLevel from './charts/weather/WaterLevel';
import { IoIosArrowDown } from 'react-icons/io';

export default function WeatherStats({ filteredCards }) {
  const [page, setPage] = useState('Weather');

  function handleChange(event) {
    setPage(event.target.value);
    handleSubmit(event);
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <>
      <Wrapper>
        <IoIosArrowDown color="#687a48" />
        <form onSubmit={handleSubmit}>
          <Select id="charts" name="selectedCharts" onChange={handleChange}>
            <option>Weather</option>
            <option>Temperature</option>
            <option>Airpressure</option>
            <option>Moon</option>
            <option>Wind</option>
            <option>Windspeed</option>
            <option>Watertemperature</option>
            <option>Watercolor</option>
            <option>Waterlevel</option>
          </Select>
        </form>
      </Wrapper>
      <div>
        {page === 'Weather' && (
          <StatsContainer>
            <Weather filteredCards={filteredCards} />
          </StatsContainer>
        )}
        {page === 'Temperature' && (
          <StatsContainer>
            <Temperature filteredCards={filteredCards} />
            <Legend> °C</Legend>
          </StatsContainer>
        )}
        {page === 'Airpressure' && (
          <StatsContainer>
            <Airpressure filteredCards={filteredCards} />
            <Legend> hPa</Legend>
          </StatsContainer>
        )}
        {page === 'Moon' && (
          <StatsContainer>
            <Moon filteredCards={filteredCards} />
          </StatsContainer>
        )}
        {page === 'Wind' && (
          <StatsContainer>
            <Wind filteredCards={filteredCards} />
          </StatsContainer>
        )}
        {page === 'Windspeed' && (
          <StatsContainer>
            <WindSpeed filteredCards={filteredCards} />
            <Legend> km/h</Legend>
          </StatsContainer>
        )}
        {page === 'Watertemperature' && (
          <StatsContainer>
            <WaterTemp filteredCards={filteredCards} />
            <Legend> °C</Legend>
          </StatsContainer>
        )}
        {page === 'Watercolor' && (
          <StatsContainer>
            <WaterColor filteredCards={filteredCards} />
          </StatsContainer>
        )}
        {page === 'Waterlevel' && (
          <StatsContainer>
            <WaterLevel filteredCards={filteredCards} />
          </StatsContainer>
        )}
      </div>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 5px;
  margin-bottom: 5px;
`;

const Select = styled.select`
  border: none;
  background-color: transparent;
  color: #687a48;
  font-weight: bold;
  font-size: 1.2rem;
  -webkit-appearance: none; /* verhindert, dass der Browser eigene Styles draufhaut */
  -moz-appearance: none;
  appearance: none;

  &:focus {
    outline: none; /* Keine Umrandung bei Fokus */
    border: none; /* Keine Border bei Fokus */
  }
`;

const StatsContainer = styled.div`
  position: relative;
  padding-right: 10px;
`;

const Legend = styled.div`
  position: absolute;
  left: 60px;
  top: 10px;
  font-size: 0.7rem;
  font-weight: bold;
  color: #687a48;
`;
