import { render, screen } from '@testing-library/react';
import Water from './Water';

describe('Water', () => {
  it('renders 4 input fields', () => {
    render(<Water />);

    const inputWaterTemp = screen.getByLabelText(/water temperature/i);
    const inputStretch = screen.getByLabelText(/stretch/i);
    const inputWaterColor = screen.getByLabelText(/Water Color/i);
    const inputWaterLevel = screen.getByLabelText(/Water Level/i);

    expect(inputStretch).toBeInTheDocument();
    expect(inputWaterTemp).toBeInTheDocument();
    expect(inputWaterColor).toBeInTheDocument();
    expect(inputWaterLevel).toBeInTheDocument();
  });
});
