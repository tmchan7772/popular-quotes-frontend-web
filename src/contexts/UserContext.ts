import { createContext } from 'react';

export type UserState = {
  userToken?: string,
  logginginUser?: (token: string) => void,
  loggingOutUser?: () => void
};
  
export const initialState = {
  userToken: localStorage.getItem('token') || undefined
};
export const UserContext = createContext<UserState>(initialState);
