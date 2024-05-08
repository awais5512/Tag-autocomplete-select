import App from './App';
import { describe, it, expect, vitest, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import * as hooks from './hooks/useCountriesData';
import userEvent from '@testing-library/user-event';

vitest.mock('./hooks/useCountriesData', () => ({
  useCountriesData: vitest.fn(),
}));

describe('render', () => {
  beforeEach(() => {
    vitest.clearAllMocks();
  });

  it('renders the main page without crashing', () => {
    vitest.spyOn(hooks, 'useCountriesData').mockReturnValue({
      loading: false,
      error: null,
      countries: [],
    });

    render(<App />);

    expect(screen.getByText(/Autocompletion Tag Input/i)).toBeInTheDocument();
  });

  it('allows users to select a country from autocomplete', async () => {
    vitest.spyOn(hooks, 'useCountriesData').mockReturnValue({
      loading: false,
      error: null,
      countries: [
        { name: 'Afghanistan', iso2: 'AF', long: 65, lat: 33 },
        { name: 'Albania', iso2: 'AL', long: 20, lat: 41 },
      ],
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId('tag-input')).toBeInTheDocument();
    });

    const expectedTaggedOption = 'Afghanistan';

    const input = screen.getByTestId('tag-input');
    userEvent.type(input, 'Afg');

    await waitFor(() => {
      expect(screen.getByText(expectedTaggedOption)).toBeInTheDocument();
    });

    userEvent.click(screen.getByText(expectedTaggedOption));

    await waitFor(() => {
      expect(screen.getAllByTestId('tagged-option')[0]).toBeInTheDocument();
    });

    expect(screen.getAllByTestId('tagged-option')[0].textContent).toBe(`${expectedTaggedOption}x`);
  });

  it('fetches countries from an API and fails gracefully', async () => {
    vitest.spyOn(hooks, 'useCountriesData').mockReturnValue({
      loading: false,
      error: new Error('Something went wrong'),
      countries: [],
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    });
  });
});
