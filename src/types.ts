export interface City {
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
  cities: City[];
  isLoading: boolean;
}

export interface CityItemProps {
  city: City;
}