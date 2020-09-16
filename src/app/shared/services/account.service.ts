import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Account } from '../models/account';
import { AuthenticateAccountResponse } from '../models/authenticate-account-response';
import { RegisterAccountRequest } from '../models/register-account-request';
import { ConfigService } from './config.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { AuthenticateAccountRequest } from '../models/authenticate-account-request';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private storage: StorageMap
  ) {
    // Retrives account details from local storage if they are there
    this.getAccountFromLocalStorage();
  }

  // The account of the currently logged in user
  private _currentAccount: Account = null;

  public get currentAccount(): Account {
    return this._currentAccount;
  }

  // Asynchronous method for getting the current account
  public get currentAccountAsync(): Observable<Account> {
    // Is the current account in memory?
    if (this._currentAccount) {
      return of(this._currentAccount);
    } else {
      return this.storage
        .get('account')
        .pipe(
          map((account) => (account ? JSON.parse(account as string) : account))
        );
    }
  }

  // This is set to true once an attempt has been made to load the account
  // from local storage
  private _accountLoadAttempted = false;

  public get accountLoadAttempted() {
    return this._accountLoadAttempted;
  }

  // Register a new account
  public register(
    request: RegisterAccountRequest
  ): Observable<AuthenticateAccountResponse> {
    return this.http
      .post<AuthenticateAccountResponse>(
        `${this.configService.apiBaseUrl}/account/register`,
        request
      )
      .pipe(
        tap((result) => {
          const account = new Account(result);
          this.setAccount(account);
        })
      );
  }

  // Sign in to existing account
  public signIn(
    request: AuthenticateAccountRequest
  ): Observable<AuthenticateAccountResponse> {
    return this.http
      .post<AuthenticateAccountResponse>(
        `${this.configService.apiBaseUrl}/account/login`,
        request
      )
      .pipe(
        tap((result) => {
          const account = new Account(result);
          this.setAccount(account);
        })
      );
  }

  // Log the current user out
  signOut() {
    this._currentAccount = null;
    this.storage.delete('account').subscribe();
  }

  // Set the current account in local store and memory
  public setAccount(account: Account) {
    this._currentAccount = account;
    this.storage.set('account', JSON.stringify(account)).subscribe(
      () => {},
      (error) => {
        // I would put logging in here
      }
    );
  }

  // Retrives account details from local storage if they are there
  public getAccountFromLocalStorage() {
    this.currentAccountAsync.subscribe(
      (account) => {
        this._currentAccount = account;
        this._accountLoadAttempted = true;
      },
      (error) => {
        // Put logging here...

        this._accountLoadAttempted = true;
      }
    );
  }
}
