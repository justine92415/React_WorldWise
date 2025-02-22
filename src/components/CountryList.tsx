import { CountriesListProps, Country } from '../types';
import CityItem from './CityItem';
import CountryItem from './CountryItem';
import styles from './CountryList.module.css';
import Message from './Message';
import Spinner from './Spinner';

function CountryList({ cities, isLoading }: CountriesListProps) {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries = cities.reduce(function (acc, city) {
    if (!acc.map((el) => el.country).includes(city.country))
      return [...acc, { emoji: city.emoji, country: city.country, id: city.id }];
    else return acc;
  }, [] as Country[]);

  return (
    <ul className={styles.countryList}>
      {countries.map(function (country) {
        return <CountryItem country={country} key={country.id} />;
      })}
    </ul>
  );
}

export default CountryList;
