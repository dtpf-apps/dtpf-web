import { TResponseAPI } from 'interfaces/general.interface';

// getAboutMeInfoAPI ////////////////////////////////////////////////
export interface IgetAboutMeInfoAPIResponseInfo {
  title: string;
  content1: string;
  content2: string | null;
  content3: string | null;
  content4: string | null;
  content5: string | null;
  content6: string | null;
}

export interface IgetAboutMeInfoAPIResponse extends TResponseAPI {
  data: {
    info: IgetAboutMeInfoAPIResponseInfo;
  };
}
////////////////////////////////////////////////////////////////////

// updateAboutMeInfoAPI //////////////////////////////////////////
export interface IupdateAboutMeInfoAPIResponse extends TResponseAPI {
  data: {
    message: string;
  };
}
//////////////////////////////////////////////////////////////////
