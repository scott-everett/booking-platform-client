import { AuthenticateAccountResponse } from './authenticate-account-response';

export class Account {
  public accountId: number;
  public userFullName: string;
  public emailAddress: string;
  public accessToken: string;

  constructor(account: Account) {
    this.accountId = account.accountId;
    this.userFullName = account.userFullName;
    this.emailAddress = account.emailAddress;
    this.accessToken = account.accessToken;
  }
}
