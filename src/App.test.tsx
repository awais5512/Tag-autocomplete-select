import App from './App';
import { describe, it, expect, test } from 'vitest';
import { render } from '@testing-library/react';

test('demo', () => {
  expect(true).toBe(true);
});

describe('render', () => {
  it('renders the main page', () => {
    render(<App />);
    expect(true).toBeTruthy();
  });

  it('should render correctly', async () => {
    render(<App />);
  });
});
