import { useReducer, ReactNode } from 'react';
import { UserContext } from './UserContext';
import { initialState, reducer } from './userReducer';

type Props = {
  children: ReactNode;
};

export default function UserContextProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function logginginUser(token: string) {
    localStorage.setItem('token', token);
    dispatch({
      type: 'loginSucceded',
      payload: { token }
    });
  }

  function loggingOutUser() {
    localStorage.removeItem('token');
    dispatch({
      type: 'logoutSucceded'
    });
  }

  return (
    <UserContext.Provider value={{
      userToken: state.userToken,
      logginginUser,
      loggingOutUser,
    }}>
    {children}
    </UserContext.Provider>
  );
}