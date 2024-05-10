import { Country } from '../../vite-env';

type TaggedOptionProps = {
  tag: Country;
  removeTag: (tagID: string) => void;
};

export const TaggedOption = ({ tag, removeTag }: TaggedOptionProps) => {
  return (
    <div
      key={tag.name}
      data-testid="tagged-option"
      className="inline-block bg-purple-500 text-white rounded-md px-4 py-1"
    >
      {tag.name}
      <span className="ml-2 cursor-pointer" onClick={() => removeTag(tag.name)}>
        x
      </span>
    </div>
  );
};
