import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vitest } from 'vitest';
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

  it('Add option to tagged list when enter is pressed', async () => {
    window.HTMLElement.prototype.scrollIntoView = function () {};

    const addTagMock = vitest.fn();
    const renderedTagInput = render(<TagInput tags={[]} autoCompleteOptions={countriesOptions} setTags={addTagMock} />);
    const inputText = 'Afg';
    const expectedTag = 'Afghanistan';
    const input = (await renderedTagInput.findByTestId('tag-input')) as HTMLInputElement;

    input.focus();

    fireEvent.change(input, { target: { value: inputText } });
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });

    await renderedTagInput.findByTestId('tagged-option');

    expect(renderedTagInput.queryByText(expectedTag)).toBeTruthy();
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
