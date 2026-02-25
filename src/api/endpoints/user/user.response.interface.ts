import { TResponseAPI } from 'interfaces/general.interface';

export interface IUserResponse {
  _id: string;
  email: string;
  role: 'admin' | 'editor' | 'reviewer';
  active: boolean;
  lastname: string;
  name: string;
  avatar?: string;
}

// signUpApi ///////////////////////////////////////////////
export interface IsignUpAPIBody {
  name: string;
  lastname: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export interface IsignUpAPIResponse extends TResponseAPI {
  data: {
    message: string;
    user: IUserResponse;
  };
}
////////////////////////////////////////////////////////////

// signInAPI ///////////////////////////////////////////////
export interface IsignInAPIBody {
  email: string;
  password: string;
}

export interface IsignInAPIResponse extends TResponseAPI {
  data: {
    message?: string;
    accessToken: string;
    refreshToken: string;
  };
}
////////////////////////////////////////////////////////////

// getUsersApi /////////////////////////////////////////////
export interface IgetUsersAPIResponse extends TResponseAPI {
  data: {
    users: Array<IUserResponse>;
  };
}
////////////////////////////////////////////////////////////

// uploadAvatarAPI /////////////////////////////////////////
export interface IuploadAvatarAPIResponse extends TResponseAPI {
  data: {
    avatarName: string;
  };
}
////////////////////////////////////////////////////////////

// getAvatarAPI ////////////////////////////////////////////
export interface IgetAvatarAPIResponse {
  response?: Response & { url?: string };
  data?: {
    message: string;
  };
}
////////////////////////////////////////////////////////////

// updateUserApi //////////////////////////////////////////
// export interface IupdateUserAPIUserBody {
//   name: Pick<IUserResponse, 'name'>;
//   lastname: Pick<IUserResponse, 'lastname'>;
//   email: Pick<IUserResponse, 'email'>;
//   password: string;
//   repeatPassword: string;
//   role: Pick<IUserResponse, 'role'>;
//   active: Pick<IUserResponse, 'active'>;
//   avatar: Pick<IUserResponse, 'avatar'>;
// }

export interface IupdateUserAPIResponse extends TResponseAPI {
  data: {
    message: string;
  };
}
///////////////////////////////////////////////////////////
