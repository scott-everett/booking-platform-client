export class AuthenticateAccountRequest {
  public emailAddress: string;
  public password: string;

  public constructor(init?: Partial<AuthenticateAccountRequest>) {
    Object.assign(this, init);
  }
}
