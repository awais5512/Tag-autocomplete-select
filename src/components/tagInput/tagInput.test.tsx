import { act, fireEvent, render, screen } from '@testing-library/react';
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

  it('Add tag to tagged list and clear input upon selection', async () => {
    const addTagMock = vitest.fn();

    render(<TagInput tags={[]} autoCompleteOptions={countriesOptions} setTags={addTagMock} />);

    const input = screen.getByTestId('tag-input') as HTMLInputElement;
    input.focus();

    act(() => {
      fireEvent.change(input, { target: { value: 'Pak' } });
    });

    const firstSuggestion = await screen.findByText('Pakistan');
    fireEvent.click(firstSuggestion);

    expect(addTagMock).toHaveBeenCalled();

    const taggedElement = await screen.findByRole('tag-option');

    expect(taggedElement).toHaveTextContent('Pakistan');
    expect(input.value).toBe('');
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
