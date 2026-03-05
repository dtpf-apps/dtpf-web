import { TResponseAPI } from 'interfaces/general.interface';

export interface IMenuItem {
  _id: string;
  title: string;
  url: string;
  active: boolean;
  order: number;
}

export interface IGetMenusResponse extends TResponseAPI {
  data: {
    menu: IMenuItem[];
  };
}

export interface IAddMenuBody {
  title: string;
  url: string;
  active: boolean;
  order: number;
}

export interface IMenuMutationResponse extends TResponseAPI {
  data: {
    message: string;
  };
}
