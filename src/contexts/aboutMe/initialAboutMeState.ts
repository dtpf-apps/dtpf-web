import { IInitialAboutMeState } from 'interfaces/aboutMe.interface';

const initialAboutMeState: IInitialAboutMeState = {
  cubeInfo: null,
  mainInfo: null,
  isLoading: true,

  getCubeInfo: () => Promise.resolve(false),
  getMainInfo: () => Promise.resolve(false),
  updateCubeInfo: () => Promise.resolve(false),
  updateMainInfo: () => Promise.resolve(false),
};

export default initialAboutMeState;
