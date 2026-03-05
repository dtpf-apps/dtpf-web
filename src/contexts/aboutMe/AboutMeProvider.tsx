/* eslint-disable react-hooks/exhaustive-deps */
import { useReducer, useMemo, useCallback, useEffect, memo } from 'react';
import AboutMeContext from './AboutMeContext';
import initialAboutMeState from './initialAboutMeState';
import aboutMeReducer from './reducer/aboutMe.reducer';
import * as AboutMeTypes from './reducer/aboutMe.types';
import * as action from './reducer/aboutMe.actions';
import { IAboutMeInfo } from 'api/endpoints/aboutMe/aboutMe.response.interface';
import { ChildrenProps } from 'interfaces/general.interface';
import useConnection from 'hooks/useConnection';

function AboutMeProvider({ children }: ChildrenProps) {
  const [state, dispatch] = useReducer(aboutMeReducer, initialAboutMeState);
  const { connectionStatus } = useConnection();

  useEffect(() => {
    if (!connectionStatus) return;
    (async () => {
      dispatch({ type: AboutMeTypes.SET_IS_LOADING, payload: true });
      await Promise.all([action.getCubeInfoAction({ dispatch }), action.getMainInfoAction({ dispatch })]);
      dispatch({ type: AboutMeTypes.SET_IS_LOADING, payload: false });
    })();
  }, [connectionStatus]);

  const getCubeInfo = useCallback(async () => {
    return action.getCubeInfoAction({ dispatch });
  }, []);

  const getMainInfo = useCallback(async () => {
    return action.getMainInfoAction({ dispatch });
  }, []);

  const updateCubeInfo = useCallback(async (data: IAboutMeInfo) => {
    return action.updateCubeInfoAction({ dispatch, data });
  }, []);

  const updateMainInfo = useCallback(async (data: IAboutMeInfo) => {
    return action.updateMainInfoAction({ dispatch, data });
  }, []);

  const memoProvider = useMemo(
    () => ({
      ...state,
      getCubeInfo,
      getMainInfo,
      updateCubeInfo,
      updateMainInfo,
    }),
    [state, getCubeInfo, getMainInfo, updateCubeInfo, updateMainInfo]
  );

  return <AboutMeContext.Provider value={memoProvider}>{children}</AboutMeContext.Provider>;
}

export default memo(AboutMeProvider);
