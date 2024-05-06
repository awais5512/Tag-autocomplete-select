import { useRef, useState } from 'react';
import { TagInputProps } from './interfaces';
import { Country } from '../../vite-env';
import { OptionsContainer } from './optionsContainer';
import { TaggedOption } from './taggedOption';
import { useClickOutside } from '../../hooks/useClickOutside';

export const TagInput = ({ tags, autoCompleteOptions, setTags }: TagInputProps) => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const optionsContainerRef = useRef<HTMLUListElement>(null);
  const tagInputWrapperRef = useRef<HTMLDivElement>(null);

  const addTag = (tag: Country) => {
    setTags([...tags, tag]);
    setInputValue('');
  };

  const clickOutsidehandler = () => {
    setShowOptions(false);
    setSelectedOptionIndex(null);
  };

  useClickOutside(tagInputWrapperRef, clickOutsidehandler);

  const removeTag = (tagID: string) => setTags(tags.filter((t) => t.name !== tagID));

  const filteredAutoCompleteOptions = autoCompleteOptions.filter((option) => {
    return (
      !tags.some((tag) => tag.name === option.name) && option.name?.toLowerCase().includes(inputValue.toLowerCase())
    );
  });

  const inputChangeHandler = (value: string) => {
    setInputValue(value);
    setSelectedOptionIndex(null);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (optionsContainerRef.current) {
      const lastIndex = filteredAutoCompleteOptions.length - 1;

      switch (event.key) {
        case 'ArrowDown': {
          event.preventDefault();

          setSelectedOptionIndex((prevIndex) => (prevIndex === null || prevIndex === lastIndex ? 0 : prevIndex + 1));

          break;
        }
        case 'ArrowUp': {
          event.preventDefault();

          setSelectedOptionIndex((prevIndex) => (prevIndex === null || prevIndex === 0 ? lastIndex : prevIndex - 1));

          break;
        }
        case 'Enter': {
          if (selectedOptionIndex !== null && selectedOptionIndex >= 0) {
            if (filteredAutoCompleteOptions[selectedOptionIndex]) {
              addTag(filteredAutoCompleteOptions[selectedOptionIndex]);
            }

            setSelectedOptionIndex(null);
          }

          break;
        }
        case 'Backspace': {
          if (inputValue === '') {
            removeTag(tags.length > 0 ? tags[tags.length - 1].name : '');
          }

          break;
        }
        default:
          break;
      }
    }
  };

  return (
    <div
      ref={tagInputWrapperRef}
      className="relative p-1 rounded-md border-[1px] flex flex-wrap gap-2 items-center w-full border-gray-400"
    >
      {tags.length > 0 && (
        <div className="flex items-center gap-1 flex-wrap">
          {tags.map((tag) => (
            <TaggedOption key={tag.name} tag={tag} removeTag={removeTag} />
          ))}
        </div>
      )}

      {showOptions && (
        <OptionsContainer
          options={filteredAutoCompleteOptions}
          selectedOptionIndex={selectedOptionIndex}
          addTag={addTag}
          ref={optionsContainerRef}
        />
      )}

      <input
        type="text"
        className="p-2 border-[1px] border-gray-400 rounded-md outline-none w-full"
        placeholder="Add Countries"
        value={inputValue}
        data-testid="tag-input"
        aria-autocomplete="list"
        aria-label="Add Countries Input"
        aria-labelledby="autocomplete-list"
        onKeyDown={handleInputKeyDown}
        onFocus={() => setShowOptions(true)}
        onChange={(e) => inputChangeHandler(e.target.value)}
      />
    </div>
  );
};
