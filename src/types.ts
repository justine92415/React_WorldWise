import { FormEvent } from "react";

export interface ICity {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: Position;
  id: string;
}

export interface Position {
  lat: number;
  lng: number;
}

export interface CityListProps {
  cities: ICity[];
  isLoading: boolean;
}

export interface CityItemProps {
  city: ICity;
}

export interface CountriesListProps extends CityListProps {}

export interface Country {
  emoji: string;
  country: string;
  id: string;
}

export interface CountryItemProps {
  country: Country;
}

export interface ButtonProps {
  onClick?: (e:FormEvent) => void;
  children: React.ReactNode;
  type: 'primary' | 'back';
}

export interface CitiesContextType {
  cities: ICity[];
  isLoading: boolean;
  currentCity: ICity;
  getCity: (id: string) => Promise<void>;
}