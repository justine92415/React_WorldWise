import { createContext, useContext, useEffect, useState } from 'react';
import { CitiesContextType, ICity } from '../types';
const BASE_URL = 'http://localhost:9000';

const CitiesContext = createContext<CitiesContextType | null>(null);

function CitiesProvider({ children }: { children: React.ReactNode }) {
  const [cities, setCities] = useState<ICity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === null) {
    throw new Error('useCities must be used within a CitiesProvider');
  }
  return context;
}

export { CitiesProvider, useCities };
