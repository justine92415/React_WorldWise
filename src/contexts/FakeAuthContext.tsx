import React, { createContext, useContext, useReducer } from 'react';
import {
  ActionType,
  AuthContextReducerState,
  AuthContextType,
  ReducerAction,
} from '../types';

const AuthContext = createContext<AuthContextType | null>(null);

const initialState: AuthContextReducerState = {
  user: null,
  isAuthenticated: false,
};

function reducer(
  state: AuthContextReducerState,
  action: ReducerAction
): AuthContextReducerState {
  switch (action.type) {
    case ActionType.LOGIN:
      return { ...state, isAuthenticated: true, user: action.payload };
    case ActionType.LOGOUT:
      return { ...state, isAuthenticated: false, user: null };
    default:
      throw new Error('Unknown action type');
  }
}

const FAKE_USER = {
  name: 'Jack',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz',
};

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  console.log(user, isAuthenticated);

  function login(email: string, password: string) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: ActionType.LOGIN, payload: FAKE_USER });
    }
  }
  function logout() {
    dispatch({ type: ActionType.LOGOUT });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
}

export { AuthProvider, useAuth };
