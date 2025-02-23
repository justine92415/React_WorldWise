import { FormEvent } from 'react';

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
  onClick?: (e: FormEvent) => void;
  children: React.ReactNode;
  type: 'primary' | 'back' | 'position';
}

export interface CitiesContextType {
  cities: ICity[];
  isLoading: boolean;
  currentCity: ICity;
  error: string;
  getCity: (id: string) => Promise<void>;
  createCity: (newCity: NewCity) => Promise<void>;
  deleteCity: (id: string) => Promise<void>;
}

export interface NewCity extends Omit<ICity, 'id'> {}

export interface CitiesReducerState {
  cities?: ICity[];
  isLoading?: boolean;
  currentCity?: ICity;
  error: '';
}

export interface ReducerAction {
  type: ActionType;
  payload?: any;
}

export enum ActionType {
  LOADING = 'loading',
  CITIES_LOADED = 'cities/loaded',
  CITY_LOADED = 'city/loaded',
  CITY_CREATED = 'city/created',
  CITY_DELETED = 'city/deleted',
  REJECT = 'reject',

  LOGIN = 'login',
  LOGOUT = 'logout',
}

export interface AuthContextType {
  user: any;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export interface AuthContextReducerState {
  user?: any;
  isAuthenticated?: boolean;
}
