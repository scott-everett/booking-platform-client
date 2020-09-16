export class RegisterAccountRequest {
  public userFullName: string;
  public emailAddress: string;
  public password: string;

  public constructor(init?: Partial<RegisterAccountRequest>) {
    Object.assign(this, init);
  }
}
