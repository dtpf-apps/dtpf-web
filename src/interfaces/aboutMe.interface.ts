import { IAboutMeInfo } from 'api/endpoints/aboutMe/aboutMe.response.interface';

export interface IInitialAboutMeState {
  cubeInfo: IAboutMeInfo | null;
  mainInfo: IAboutMeInfo | null;
  isLoading: boolean;

  getCubeInfo: () => Promise<boolean>;
  getMainInfo: () => Promise<boolean>;
  updateCubeInfo: (data: IAboutMeInfo) => Promise<boolean>;
  updateMainInfo: (data: IAboutMeInfo) => Promise<boolean>;
}
