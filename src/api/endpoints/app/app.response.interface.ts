import { TResponseAPI } from 'interfaces/general.interface';

export interface IGetIndexedDBVersionResponse extends TResponseAPI {
  data: {
    indexedDBVersion: number;
  };
}

export interface IUpdateIndexedDBVersionResponse extends TResponseAPI {
  data: {
    status: number;
    message: string;
    indexedDBVersion: number;
  };
}
