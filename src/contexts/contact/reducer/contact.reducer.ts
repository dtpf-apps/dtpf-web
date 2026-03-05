import { IInitialContactState } from 'interfaces/contact.interface';
import { IContactMessage } from 'api/endpoints/contact/contact.response.interface';
import * as ContactTypes from './contact.types';

export type TContactDispatchReducer =
  | {
      type: typeof ContactTypes.SET_UNREAD_MESSAGES;
      payload: IContactMessage[];
    }
  | {
      type: typeof ContactTypes.SET_READ_MESSAGES;
      payload: IContactMessage[];
    }
  | {
      type: typeof ContactTypes.SET_IS_LOADING;
      payload: boolean;
    };

export default function contactReducer(
  state: IInitialContactState,
  action: TContactDispatchReducer
): IInitialContactState {
  const { type, payload } = action;

  switch (type) {
    case ContactTypes.SET_UNREAD_MESSAGES: {
      return { ...state, unreadMessages: payload };
    }
    case ContactTypes.SET_READ_MESSAGES: {
      return { ...state, readMessages: payload };
    }
    case ContactTypes.SET_IS_LOADING: {
      return { ...state, isLoading: payload };
    }
    default:
      return state;
  }
}
