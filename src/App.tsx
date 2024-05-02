import { useState } from 'react';
import { TagInput } from './components/tagInput';
import { Tag } from './vite-env';

const autoCompleteOptions = [
  { id: 0, text: 'Pakistan' },
  { id: 1, text: 'Afghanistan' },
  { id: 2, text: 'India' },
  { id: 3, text: 'Australia' },
  { id: 4, text: 'Bangladesh' },
  { id: 5, text: 'Canada' },
  { id: 6, text: 'Nepal' },
];

function App() {
  const [tagsList, setTagsList] = useState<Tag[]>([]);

  return (
    <main className="min-h-screen bg-gray-50">
      <h1 className="text-center pt-24 pb-4 font-bold text-2xl text-gray-500">Autocompletion Tag Input</h1>
      <section className="flex items-center justify-center md:w-1/2 px-2 mx-auto">
        <TagInput
          tags={tagsList}
          autoCompleteOptions={autoCompleteOptions}
          setTags={(newTags) => {
            setTagsList(newTags);
          }}
        />
      </section>
    </main>
  );
}

export default App;
