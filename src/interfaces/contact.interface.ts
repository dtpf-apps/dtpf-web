import { IContactMessage, ISubmitContactBody } from 'api/endpoints/contact/contact.response.interface';

export interface IInitialContactState {
  unreadMessages: IContactMessage[];
  readMessages: IContactMessage[];
  isLoading: boolean;

  loadMessages: () => Promise<boolean>;
  submitContact: (body: ISubmitContactBody) => Promise<boolean>;
  checkMessage: (messageId: string, readed: boolean) => Promise<boolean>;
  deleteMessage: (messageId: string) => Promise<boolean>;
}
