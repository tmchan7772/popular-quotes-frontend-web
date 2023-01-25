/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { initialState, ProfileState } from './profileReducer';

export interface ProfileContextState extends ProfileState {
  loadAuthorWithQuote: () => void;
  cancelAuthorWithQuoteLoad: () => void;
  loadFullName: () => void;
}

export const initialContextState = {
  ...initialState,
  loadAuthorWithQuote: () => { },
  cancelAuthorWithQuoteLoad: () => { },
  loadFullName: () => { }
};

export const ProfileContext = createContext<ProfileContextState>(initialContextState);