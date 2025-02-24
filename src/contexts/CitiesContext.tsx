import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import {
  ActionType,
  CitiesContextType,
  ReducerAction,
  CitiesReducerState,
  ICity,
  NewCity,
} from '../types';
const BASE_URL = 'http://localhost:9000';

const CitiesContext = createContext<CitiesContextType | null>(null);

const initialState: CitiesReducerState = {
  cities: [],
  isLoading: false,
  currentCity: {} as ICity,
  error: '',
};

function reducer(
  state: CitiesReducerState,
  action: ReducerAction
): CitiesReducerState {
  switch (action.type) {
    case ActionType.LOADING:
      return { ...state, isLoading: true };
    case ActionType.CITIES_LOADED:
      return { ...state, isLoading: false, cities: action.payload };
    case ActionType.CITY_LOADED:
      return { ...state, isLoading: false, currentCity: action.payload };
    case ActionType.CITY_CREATED:
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities!, action.payload],
        currentCity: action.payload,
      };
    case ActionType.CITY_DELETED:
      return {
        ...state,
        isLoading: false,
        cities: state.cities!.filter((city) => city.id !== action.payload),
        currentCity: {} as ICity,
      };
    case ActionType.REJECT:
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error('Unknown action type');
  }
}

function CitiesProvider({ children }: { children: React.ReactNode }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(function () {
    async function fetchCities() {
      try {
        dispatch({ type: ActionType.LOADING });
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: ActionType.CITIES_LOADED, payload: data });
      } catch {
        dispatch({
          type: ActionType.REJECT,
          payload: 'There was an error loading the cities...',
        });
      }
    }

    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id: string) {
      if (id === currentCity!.id) return;
      dispatch({ type: ActionType.LOADING });
      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: ActionType.CITY_LOADED, payload: data });
      } catch {
        dispatch({
          type: ActionType.REJECT,
          payload: 'There was an error loading the city...',
        });
      }
    },
    [currentCity?.id]
  );

  async function createCity(newCity: NewCity) {
    try {
      dispatch({ type: ActionType.LOADING });
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      dispatch({ type: ActionType.CITY_CREATED, payload: data });
    } catch {
      dispatch({
        type: ActionType.REJECT,
        payload: 'There was an error loading data...',
      });
    }
  }

  async function deleteCity(id: string) {
    try {
      dispatch({ type: ActionType.LOADING });
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });
      dispatch({ type: ActionType.CITY_DELETED, payload: id });
    } catch {
      dispatch({
        type: ActionType.REJECT,
        payload: 'There was an error loading data',
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities: cities!,
        isLoading: isLoading!,
        currentCity: currentCity!,
        error,
        getCity,
        createCity,
        deleteCity,
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
