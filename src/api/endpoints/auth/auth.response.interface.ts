import { TResponseAPI } from 'interfaces/general.interface';

// getAboutMeInfoAPI ////////////////////////////////////////////////
export interface IrefreshAccessTokenApiResponse extends TResponseAPI {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}
////////////////////////////////////////////////////////////////////
