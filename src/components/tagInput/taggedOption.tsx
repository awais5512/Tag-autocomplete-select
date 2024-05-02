import { Tag } from '../../vite-env';

type TaggedOptionProps = {
  tag: Tag;
  removeTag: (tagID: number) => void;
};

export const TaggedOption = ({ tag, removeTag }: TaggedOptionProps) => {
  return (
    <div key={tag.id} className="inline-block bg-purple-500 text-white rounded-md px-4 py-1">
      {tag.text}
      <span className="ml-2 cursor-pointer" onClick={() => removeTag(tag.id)}>
        x
      </span>
    </div>
  );
};
