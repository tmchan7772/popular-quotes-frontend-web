import { ReactNode, useReducer } from 'react';
import { getAuthorCancelable, getAuthorQuoteCancelable } from '../../services/author';
import { getCurrentProfile } from '../../services/profile';
import { ProfileContext } from './ProfileContext';
import { initialState, reducer } from './profileReducer';

type Props = {
  children: ReactNode;
};

export default function ProfileContextProvider ({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadAuthorWithQuote = () => {
    const authorRequest = getAuthorCancelable();
    const authorQuoteRequest = getAuthorQuoteCancelable(authorRequest);

    dispatch({ type: 'loadingAuthorWithQuote', payload: { 
      authorPromise: authorRequest, quotesPromise: authorQuoteRequest
    } });

    authorRequest.then(() => {
      dispatch({ type: 'doneAuthorLoad' });
    });

    authorQuoteRequest.then(response => {
      const authorName = response ? response.authorName : state.authorName;
      const authorQuote = response ? response.quote : state.authorQuote;

      dispatch({
        type: 'doneAuthorWithQuoteLoad',
        payload: { authorName, authorQuote }
      });
    });
  };

  const cancelAuthorWithQuoteLoad = () => {
    state.authorPromise?.cancel();
    state.quotesPromise?.cancel();
    dispatch({ type: 'cancelAuthorQuoteUpdate' });
  };

  const loadFullName = () => {
    dispatch({ type: 'loadingFullname' });
    getCurrentProfile().then((response) => {
      dispatch({
        type: 'updateFullname',
        payload: { fullname: response.data.fullname }
      });
    });
  };
  
  return (
    <ProfileContext.Provider value={{
      ...state,
      loadAuthorWithQuote,
      cancelAuthorWithQuoteLoad,
      loadFullName,
    }}>
    {children}
    </ProfileContext.Provider>
  );
}