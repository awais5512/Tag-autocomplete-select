import { Tag } from "../../vite-env";

export interface TagInputProps {
  tags: Tag[];
  autoCompleteOptions: Tag[];
  setTags: (tags: Tag[]) => void;
}

export interface OptionsContainerProps {
  options: Tag[];
  selectedOptionIndex: number | null;
  addTag: (tag: Tag) => void;
}
