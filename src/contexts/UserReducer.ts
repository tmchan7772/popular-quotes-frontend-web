import { UserState } from './UserContext';

type LoginSuccededPayload = { token: string };

type UserAction =
 | { type: 'loginSucceded', payload: LoginSuccededPayload }
 | { type: 'logoutSucceded' };

export function reducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
  case 'loginSucceded':
    return { ...state, userToken: action.payload.token };
  case 'logoutSucceded':
    return { ...state, userToken: undefined };
  }
}