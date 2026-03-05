import { IInitialContactState } from 'interfaces/contact.interface';

const initialContactState: IInitialContactState = {
  unreadMessages: [],
  readMessages: [],
  isLoading: false,

  loadMessages: () => Promise.resolve(false),
  submitContact: () => Promise.resolve(false),
  checkMessage: () => Promise.resolve(false),
  deleteMessage: () => Promise.resolve(false),
};

export default initialContactState;
