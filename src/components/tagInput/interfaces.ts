import { Country } from "../../vite-env";

export interface TagInputProps {
  tags: Country[];
  autoCompleteOptions: Country[];
  setTags: (tags: Country[]) => void;
}

export interface OptionsContainerProps {
  options: Country[];
  selectedOptionIndex: number | null;
  addTag: (tag: Country) => void;
}
