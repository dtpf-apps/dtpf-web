import { IInitialAboutMeState } from 'interfaces/aboutMe.interface';
import { IAboutMeInfo } from 'api/endpoints/aboutMe/aboutMe.response.interface';
import * as AboutMeTypes from './aboutMe.types';

export type TAboutMeDispatchReducer =
  | {
      type: typeof AboutMeTypes.SET_CUBE_INFO;
      payload: IAboutMeInfo;
    }
  | {
      type: typeof AboutMeTypes.SET_MAIN_INFO;
      payload: IAboutMeInfo;
    }
  | {
      type: typeof AboutMeTypes.SET_IS_LOADING;
      payload: boolean;
    };

export default function aboutMeReducer(
  state: IInitialAboutMeState,
  action: TAboutMeDispatchReducer
): IInitialAboutMeState {
  const { type, payload } = action;

  switch (type) {
    case AboutMeTypes.SET_CUBE_INFO: {
      return { ...state, cubeInfo: payload };
    }
    case AboutMeTypes.SET_MAIN_INFO: {
      return { ...state, mainInfo: payload };
    }
    case AboutMeTypes.SET_IS_LOADING: {
      return { ...state, isLoading: payload };
    }
    default:
      return state;
  }
}
