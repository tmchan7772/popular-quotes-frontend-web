/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { initialState, UserState } from './userReducer';

export interface UserContextState extends UserState {
  logginginUser: (token: string) => void;
  loggingOutUser: () => void;
};

export const initialContextState: UserContextState = {
  ...initialState,
  userToken: localStorage.getItem('token') || undefined,
  logginginUser: () => { },
  loggingOutUser: () => { },
};

export const UserContext = createContext<UserContextState>(initialContextState);
