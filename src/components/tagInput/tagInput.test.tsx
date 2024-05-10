import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TagInput } from './tagInput';
import { countriesOptions } from '../../utils';
import { act } from 'react';

describe('TagInput', () => {
  it('should render correctly', async () => {
    render(<TagInput tags={[]} autoCompleteOptions={countriesOptions} setTags={() => {}} />);
  });

  it('show options when input is focused', async () => {
    render(<TagInput tags={[]} autoCompleteOptions={countriesOptions} setTags={() => {}} />);

    const input = screen.getByTestId('tag-input');
    act(() => input.focus());

    const optionsContainer = await screen.findByTestId('options-container');

    expect(optionsContainer).toBeInTheDocument();
  });

  it('Input value should be updated', async () => {
    render(<TagInput tags={[]} autoCompleteOptions={countriesOptions} setTags={() => {}} />);

    const inputText = 'Afg';
    const input = screen.getByTestId('tag-input') as HTMLInputElement;
    input.click();

    fireEvent.change(input, { target: { value: inputText } });

    expect(input.value).toEqual(inputText);
  });
});
