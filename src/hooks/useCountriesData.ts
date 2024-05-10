import { useEffect, useRef, useState } from "react";
import { Country } from "../vite-env";

export const API_URL = 'https://countriesnow.space/api/v0.1/countries/positions';

export const useCountriesData = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const initialRender = useRef(true);

  useEffect(() => {
    if (!initialRender.current) {
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(API_URL );
        const data = await response.json();
        const filteredCountries = data.data.slice(0, 20);

        setCountries(filteredCountries);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      initialRender.current = false;
    }
  }, [initialRender]);

  return { countries, error, loading };
};
