import { TResponseAPI } from 'interfaces/general.interface';

export interface IAboutMeInfo {
  title: string;
  content1: string;
  content2: string | null;
  content3: string | null;
  content4: string | null;
  content5: string | null;
  content6: string | null;
}

export interface IGetAboutMeInfoResponse extends TResponseAPI {
  data: {
    info: IAboutMeInfo;
  };
}

export interface IUpdateAboutMeInfoResponse extends TResponseAPI {
  data: {
    message: string;
  };
}
