import { render, screen } from '@testing-library/react';
import Cards from './Cards';

describe('Cards', () => {
  it('renders a card with date, water, target', ({ data }) => {
    render(<Cards date={data.date} water={data.water} target={data.target} />);

    const date = screen.getByText(/2022-01-01/i);
    const water = screen.getByText(/fluss/i);
    const target = screen.getByText(/fish/i);

    expect(date).toBeInTheDocument();
    expect(water).toBeInTheDocument();
    expect(target).toBeInTheDocument();
  });
});
