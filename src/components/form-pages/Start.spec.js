import { render, screen } from '@testing-library/react';
import Start from './Start';

describe('Start', () => {
  it('renders 3 input fields', () => {
    render(<Start formData />);

    const inputDate = screen.getByLabelText(/Date/i);
    const inputWater = screen.getByLabelText(/Waters/i);
    const inputTarget = screen.getByLabelText(/Target species/i);

    expect(inputDate).toBeInTheDocument();
    expect(inputWater).toBeInTheDocument();
    expect(inputTarget).toBeInTheDocument();
  });
});
