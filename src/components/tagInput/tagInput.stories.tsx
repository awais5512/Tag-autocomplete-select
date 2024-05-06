import { useState } from 'react';
import { Meta } from '@storybook/react';
import { TagInput } from './tagInput';
import { Country } from '../../vite-env';
import { countriesOptions } from '../../utils';

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

export const Default = {
  render: () => {
    const [countries, setCountries] = useState<Country[]>([]);

    return <TagInput tags={countries} autoCompleteOptions={countriesOptions} setTags={setCountries} />;
  },
  args: {
    tags: [],
    countriesOptions,
  },
};
