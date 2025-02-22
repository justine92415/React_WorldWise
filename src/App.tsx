import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './pages/AppLayout';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import Product from './pages/Pricing';
import Pricing from './pages/Pricing';
import PageNotFound from './pages/PageNotFound';
import CityList from './components/CityList';
import { useEffect, useState } from 'react';
import { ICity } from './types';
import CountryList from './components/CountryList';
import City from './components/City';

const BASE_URL = 'http://localhost:9000';

function App() {
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
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Homepage />}></Route>
        <Route path="product" element={<Product />}></Route>
        <Route path="pricing" element={<Pricing />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="app" element={<AppLayout />}>
          <Route
            index
            element={<CityList cities={cities} isLoading={isLoading} />}
          ></Route>
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          ></Route>
          <Route path="cities/:id" element={<City />}></Route>
          <Route
            path="countries"
            element={<CountryList cities={cities} isLoading={isLoading} />}
          ></Route>
          <Route path="form" element={<p>Form</p>}></Route>
        </Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
