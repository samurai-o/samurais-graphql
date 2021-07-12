export interface IAccount {
  id?: string;
  email: string;
  password?: string;
}

export interface IToken {
  accountID: string;
  userID: string;
  email: string;
}
