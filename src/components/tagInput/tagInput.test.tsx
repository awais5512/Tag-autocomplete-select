import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vitest } from 'vitest';
import { TagInput } from './tagInput';
import { countriesOptions } from '../../utils';

describe('TagInput', () => {
  it('should render correctly', () => {
    render(<TagInput tags={[]} autoCompleteOptions={countriesOptions} setTags={() => {}} />);
  });

  it('show options when input is focused', async () => {
    render(<TagInput tags={[]} autoCompleteOptions={countriesOptions} setTags={() => {}} />);

    const input = screen.getByTestId('tag-input');
    input.focus();

    const optionsContainer = await screen.findByTestId('options-container');

    expect(optionsContainer).toBeInTheDocument();
  });

  it('Input value should be updated', async () => {
    render(<TagInput tags={[]} autoCompleteOptions={countriesOptions} setTags={() => {}} />);

    const input = screen.getByTestId('tag-input') as HTMLInputElement;
    input.click();

    fireEvent.change(input, { target: { value: 'Pak' } });

    expect(input.value).toEqual('Pak');
  });

  it('Add option to tagged list when enter is pressed', async () => {
    const addTagMock = vitest.fn();

    render(<TagInput tags={[]} autoCompleteOptions={countriesOptions} setTags={addTagMock} />);

    const inputText = 'Pak';
    const input = screen.getByTestId('tag-input') as HTMLInputElement;

    input.focus();

    fireEvent.change(input, { target: { value: inputText } });
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });

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
