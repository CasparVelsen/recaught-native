import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navigation from './Navigation';

describe('Navigation', () => {
  it('renders a navigation with two links', () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    const formLink = screen.getByRole('link', { name: /formpage/i });
    const homeLink = screen.getByRole('link', { name: /homepage/i });

    expect(formLink).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
  });
});
