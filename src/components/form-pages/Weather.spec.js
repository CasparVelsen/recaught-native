import { render, screen } from '@testing-library/react';
import Weather from './Weather';

describe('Weather', () => {
  it('renders 6 input fields', () => {
    render(<Weather formData />);

    const inputWeather = screen.getByLabelText(/weather/i);
    const inputTemperature = screen.getByLabelText(/temperature/i);
    const inputAirPressure = screen.getByLabelText(/Air pressure/i);
    const inputMoonPhase = screen.getByLabelText(/Moon phase/i);
    const inputWindDirection = screen.getByLabelText(/Wind direction/i);
    const inputWindSpeed = screen.getByLabelText(/Wind speed/i);

    expect(inputWeather).toBeInTheDocument();
    expect(inputTemperature).toBeInTheDocument();
    expect(inputAirPressure).toBeInTheDocument();
    expect(inputMoonPhase).toBeInTheDocument();
    expect(inputWindDirection).toBeInTheDocument();
    expect(inputWindSpeed).toBeInTheDocument();
  });
});
