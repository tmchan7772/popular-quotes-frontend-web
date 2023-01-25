import { PromiseCancelable } from '../../utils/httpClient';

export interface ProfileState {
  isLoadingFullName: boolean;
  fullname: string;
  isLoadingAuthor: boolean;
  authorPromise: PromiseCancelable<unknown> | undefined;
  isLoadingQuotes: boolean;
  quotesPromise: PromiseCancelable<unknown> | undefined;
  authorName: string;
  authorQuote: string;
}

export const initialState: ProfileState = {
  isLoadingFullName: false,
  fullname: '',
  isLoadingAuthor: false,
  authorPromise: undefined,
  isLoadingQuotes: false,
  quotesPromise: undefined,
  authorName: '',
  authorQuote: '',
};

type UpdateFullnamePayload = { fullname: string };
type DoneAuthorQuoteLoadPayload = { authorName: string, authorQuote: string };
type LoadingAuthorWithQuotePayload = { authorPromise: PromiseCancelable<unknown>, quotesPromise: PromiseCancelable<unknown>  };

type ProfileAction =
 | { type: 'loadingFullname' }
 | { type: 'updateFullname', payload: UpdateFullnamePayload }
 | { type: 'loadingAuthorWithQuote', payload: LoadingAuthorWithQuotePayload }
 | { type: 'cancelAuthorQuoteUpdate' }
 | { type: 'doneAuthorLoad' }
 | { type: 'doneAuthorWithQuoteLoad', payload: DoneAuthorQuoteLoadPayload };

export function reducer(state: ProfileState, action: ProfileAction) {
  switch (action.type) {
    case 'loadingFullname':
      return { ...state, isLoadingFullName: true };
    case 'updateFullname':
      return { ...state, isLoadingFullName:false, ...action.payload };
    case 'loadingAuthorWithQuote':
      return { ...state, isLoadingAuthor: true, isLoadingQuotes: true, ...action.payload };
    case 'doneAuthorLoad':
      return { ...state, isLoadingAuthor: false };
    case 'doneAuthorWithQuoteLoad':
      return { ...state, isLoadingAuthor: false, isLoadingQuotes: false, ...action.payload };
    case 'cancelAuthorQuoteUpdate':
      return { ...state, isLoadingAuthor: false, isLoadingQuotes: false };
    default:
      throw new Error();
  }
}