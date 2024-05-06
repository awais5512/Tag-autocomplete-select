import { useState } from 'react';
import { TagInput } from './components/tagInput';
import { Country } from './vite-env';
import { useCountriesData } from './hooks/useCountriesData';

function App() {
  const [countriesList, setCountriesList] = useState<Country[]>([]);
  const { loading, error, countries } = useCountriesData();

  return (
    <main className="min-h-screen bg-gray-50">
      <h1 className="text-center pt-24 pb-4 font-bold text-2xl text-gray-500">Autocompletion Tag Input</h1>

      {loading && <p className="py-5 text-center">Loading...</p>}
      {error && <p className="py-5 text-center">Error: {error.message}</p>}

      {countries.length > 0 && (
        <section className="flex items-center justify-center md:w-1/2 px-2 mx-auto">
          <TagInput
            tags={countriesList}
            autoCompleteOptions={countries}
            setTags={(newCountries) => {
              setCountriesList(newCountries);
            }}
          />
        </section>
      )}
    </main>
  );
}

export default App;
