import { useState } from 'react';
import { Meta } from '@storybook/react';
import { TagInput } from './tagInput';
import { Tag } from '../../vite-env';

export default {
  title: 'Components/TagInput',
  component: TagInput,
  argTypes: {
    tags: {
      control: { type: 'object' },
      description: 'An array of tags to display',
      defaultValue: [],
    },
    autoCompleteOptions: {
      control: { type: 'object' },
      description: 'An array of tag options for auto-completion',
      defaultValue: [],
    },
    setTags: {
      table: { disable: true },
    },
  },
} as Meta;

const autoCompleteOptions = [
  { id: 0, text: 'Pakistan' },
  { id: 1, text: 'Afghanistan' },
  { id: 2, text: 'India' },
  { id: 3, text: 'Australia' },
  { id: 4, text: 'Bangladesh' },
  { id: 5, text: 'Canada' },
  { id: 6, text: 'Nepal' },
];

export const Default = {
  render: () => {
    const [tags, setTags] = useState<Tag[]>([]);

    return <TagInput tags={tags} autoCompleteOptions={autoCompleteOptions} setTags={setTags} />;
  },
  args: {
    tags: [],
    autoCompleteOptions,
  },
};
