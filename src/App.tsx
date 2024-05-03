import { useState } from 'react';
import { TagInput } from './components/tagInput';
import { Tag } from './vite-env';
import { countriesOptions } from './utils';

function App() {
  const [tagsList, setTagsList] = useState<Tag[]>([]);

  return (
    <main className="min-h-screen bg-gray-50">
      <h1 className="text-center pt-24 pb-4 font-bold text-2xl text-gray-500">Autocompletion Tag Input</h1>
      <section className="flex items-center justify-center md:w-1/2 px-2 mx-auto">
        <TagInput
          tags={tagsList}
          autoCompleteOptions={countriesOptions}
          setTags={(newTags) => {
            setTagsList(newTags);
          }}
        />
      </section>
    </main>
  );
}

export default App;
