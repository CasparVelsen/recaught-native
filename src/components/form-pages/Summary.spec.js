import { render, screen } from '@testing-library/react';
import Summary from './Summary';

describe('Summary', () => {
  it('renders 2 input fields', () => {
    render(<Summary formData />);

    const inputBites = screen.getByLabelText(/Total bites/i);
    const inputLost = screen.getByLabelText(/Lost fish/i);

    expect(inputBites).toBeInTheDocument();
    expect(inputLost).toBeInTheDocument();
  });
});
