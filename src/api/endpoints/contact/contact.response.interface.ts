import { TResponseAPI } from 'interfaces/general.interface';

export interface IContactMessage {
  _id: string;
  name: string;
  email: string;
  phone_number: string;
  subject: string;
  message: string;
  readed: boolean;
  date: string;
}

export interface ISubmitContactBody {
  name: string;
  email: string;
  phone_number: string;
  subject: string;
  message: string;
}

export interface IGetMessagesResponse extends TResponseAPI {
  data: {
    messages: IContactMessage[];
  };
}

export interface IContactMutationResponse extends TResponseAPI {
  data: {
    status?: number;
    message: string;
  };
}

export interface IMessagesStatusResponse extends TResponseAPI {
  data: {
    messagesStatus: boolean;
  };
}
