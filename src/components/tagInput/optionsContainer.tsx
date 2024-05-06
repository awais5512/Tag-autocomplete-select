import { forwardRef } from 'react';
import { OptionsContainerProps } from './interfaces';

export const OptionsContainer = forwardRef<HTMLUListElement, OptionsContainerProps>(
  ({ options, selectedOptionIndex, addTag }, ref) => {
    return (
      <ul
        role="listbox"
        id="autocomplete-list"
        data-testid="options-container"
        ref={ref}
        className="absolute w-full left-0 right-0 top-[100%]"
      >
        {options.length === 0 && <li className="p-2 text-center border-[1px] border-gray-400">No options</li>}

        {options.length > 0 &&
          options.map((tag, index) => (
            <li
              key={tag.id}
              role="option"
              className={`
              border-[1px] border-gray-400 p-2 cursor-pointer select-none hover:bg-gray-400 hover:text-white
              ${selectedOptionIndex === index ? 'text-white bg-gray-500' : ''}
            `}
              onClick={() => addTag(tag)}
            >
              {tag.text}
            </li>
          ))}
      </ul>
    );
  },
);
