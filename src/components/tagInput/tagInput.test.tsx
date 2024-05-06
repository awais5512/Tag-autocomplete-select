import { fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vitest } from 'vitest';
import { TagInput } from './tagInput';
import { useCountriesData } from '../../hooks/useCountriesData';

describe('TagInput', () => {
  it('should render correctly', async () => {
    const { result } = renderHook(() => useCountriesData());

    await waitFor(expect(result.current.loading).toBeFalsy);

    render(<TagInput tags={[]} autoCompleteOptions={result.current.countries} setTags={() => {}} />);
  });

  it('show options when input is focused', async () => {
    const { result } = renderHook(() => useCountriesData());

    await waitFor(expect(result.current.loading).toBeFalsy);

    render(<TagInput tags={[]} autoCompleteOptions={result.current.countries} setTags={() => {}} />);

    const input = screen.getByTestId('tag-input');
    input.focus();

    const optionsContainer = await screen.findByTestId('options-container');

    expect(optionsContainer).toBeInTheDocument();
  });

  it('Input value should be updated', async () => {
    const { result } = renderHook(() => useCountriesData());

    await waitFor(expect(result.current.loading).toBeFalsy);

    render(<TagInput tags={[]} autoCompleteOptions={result.current.countries} setTags={() => {}} />);

    const input = screen.getByTestId('tag-input') as HTMLInputElement;
    input.click();

    fireEvent.change(input, { target: { value: 'Afg' } });

    expect(input.value).toEqual('Afg');
  });

  it('Add option to tagged list when enter is pressed', async () => {
    const { result } = renderHook(() => useCountriesData());
    const addTagMock = vitest.fn();

    await waitFor(expect(result.current.loading).toBeFalsy);

    render(<TagInput tags={[]} autoCompleteOptions={result.current.countries} setTags={addTagMock} />);

    const inputText = 'Afg';
    const input = screen.getByTestId('tag-input') as HTMLInputElement;

    input.focus();

    fireEvent.change(input, { target: { value: inputText } });
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(addTagMock).toHaveBeenCalledTimes(1);

    await screen.findByTestId('tagged-option');

    expect(input.value).toEqual(inputText);
  });

  // it('delete tag when clicked on x', async () => {
  //   const addTagMock = vitest.fn();

  //   render(<TagInput tags={[]} autoCompleteOptions={countriesOptions} setTags={addTagMock} />);

  //   const input = (await screen.findByTestId('tag-input')) as HTMLInputElement;

  //   input.focus();

  //   act(() => {
  //     fireEvent.change(input, { target: { value: 'Pak' } });
  //   });

  //   const firstSuggestion = await screen.findByText('Pakistan');
  //   fireEvent.click(firstSuggestion);

  //   screen.logTestingPlaygroundURL();
  //   const deleteButton = await screen.findByTestId('tag-option-0-x');
  //   expect(deleteButton).toBeInTheDocument();
  // });
});
