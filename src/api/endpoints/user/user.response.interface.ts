import { TResponseAPI } from 'interfaces/general.interface';

export interface IUserResponse {
  _id: string;
  email: string;
  role: string;
  lastname: string;
  name: string;
}

// getUsersApi /////////////////////////////////////////////
export interface IgetUsersAPIResponse extends TResponseAPI {
  data: {
    users: Array<IUserResponse>;
  };
}

// updateUserApi //////////////////////////////////////////
export interface IupdateUserAPIResponse extends TResponseAPI {
  data: {
    message: string;
  };
}
